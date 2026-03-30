package main

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strings"
	"time"
)

const appName = "fhir-name-service"

var logger *slog.Logger

func init() {
	opts := &slog.HandlerOptions{
		Level: slog.LevelInfo,
		ReplaceAttr: func(_ []string, a slog.Attr) slog.Attr {
			if a.Key == slog.TimeKey {
				return slog.Attr{Key: "timestamp", Value: a.Value}
			}
			return a
		},
	}
	h := slog.NewJSONHandler(os.Stdout, opts)
	logger = slog.New(h).With(slog.String("application", appName))
}

type HumanName struct {
	Family *string  `json:"family,omitempty" fhir:"cardinality=0..1"`
	Given  []string `json:"given,omitempty" fhir:"cardinality=0..*"`
}

func formatHumanName(name HumanName) string {
	given := strings.Join(name.Given, " ")
	family := ""
	if name.Family != nil {
		family = *name.Family
	}

	if given == "" {
		return family
	}
	if family == "" {
		return given
	}
	return fmt.Sprintf("%s %s", given, family)
}

func formatName(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var names []HumanName
	err := json.NewDecoder(r.Body).Decode(&names)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	var result string
	if len(names) > 0 {
		result = formatHumanName(names[0])
	}

	for i := 1; i < len(names); i++ {
		result += ", " + formatHumanName(names[i])
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"result": result,
	})
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (sr *statusRecorder) WriteHeader(statusCode int) {
	sr.status = statusCode
	sr.ResponseWriter.WriteHeader(statusCode)
}

func requestLogger(l *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		recorder := &statusRecorder{
			ResponseWriter: w,
			status:         http.StatusOK,
		}

		next.ServeHTTP(recorder, r)

		l.Info("request",
			slog.String("method", r.Method),
			slog.String("path", r.URL.Path),
			slog.Int("status", recorder.status),
			slog.String("ip", r.RemoteAddr),
			slog.Duration("latency", time.Since(start)),
		)
	})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/format-name", formatName)

	handler := requestLogger(logger, mux)

	logger.Info("server listening", slog.String("addr", ":4000"))
	if err := http.ListenAndServe(":4000", handler); err != nil {
		logger.Error("server failed", slog.Any("err", err))
		os.Exit(1)
	}
}
