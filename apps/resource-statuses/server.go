package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

const fhirApi = "https://hapi.fhir.org/baseR4/ValueSet"

const appName = "resource-statuses"

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

func requestLogger(l *slog.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now()
		err := c.Next()
		l.Info("request",
			slog.String("method", c.Method()),
			slog.String("path", c.Path()),
			slog.Int("status", c.Response().StatusCode()),
			slog.String("ip", c.IP()),
			slog.Duration("latency", time.Since(start)),
		)
		return err
	}
}

// ValueSet represents a FHIR R5 ValueSet resource
type ValueSet struct {
	ResourceType string            `json:"resourceType"`
	Id           string            `json:"id"`
	Expansion    ValueSetExpansion `json:"expansion"`
}

// ValueSetExpansion represents the expansion element of a ValueSet
type ValueSetExpansion struct {
	Contains []ExpandedConcept `json:"contains"`
}

// ExpandedConcept represents a single concept in a ValueSet expansion
type ExpandedConcept struct {
	System  string `json:"system"`  // Code system URI
	Code    string `json:"code"`    // Concept code
	Display string `json:"display"` // Human-readable name
}

type ExpandedConcepts []ExpandedConcept

func GetStatuses(valueSet string) (ExpandedConcepts, error) {
	url := fmt.Sprintf("%s/$expand?url=http://hl7.org/fhir/ValueSet/%s", fhirApi, valueSet)
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("http get: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status %d: %s", resp.StatusCode, string(body))
	}

	var result ValueSet
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("unmarshal: %w", err)
	}

	return result.Expansion.Contains, nil
}

func renderResourceStatuses(c *fiber.Ctx, valueSet string, resourceType string) error {
	values, err := GetStatuses(valueSet)
	if err != nil {
		logger.Error("get statuses failed", slog.String("valueSet", valueSet), slog.Any("err", err))
		return fiber.ErrInternalServerError
	}
	return c.Render("resource-statuses", fiber.Map{
		"ResourceType": resourceType,
		"Results":      values,
	})
}

func main() {
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{Views: engine})

	app.Use(requestLogger(logger))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{})
	})

	app.Get("/encounter", func(c *fiber.Ctx) error {
		return renderResourceStatuses(c, "encounter-status", "Encounter")
	})

	app.Get("/observation", func(c *fiber.Ctx) error {
		return renderResourceStatuses(c, "observation-status", "Observation")
	})

	app.Get("/episode-of-care", func(c *fiber.Ctx) error {
		return renderResourceStatuses(c, "episode-of-care-status", "Episode of Care")
	})

	app.Get("/appointment", func(c *fiber.Ctx) error {
		return renderResourceStatuses(c, "appointmentstatus", "Appointment")
	})

	app.Get("/flag", func(c *fiber.Ctx) error {
		return renderResourceStatuses(c, "flag-status", "Flag")
	})

	logger.Info("server listening", slog.String("addr", ":4001"))
	if err := app.Listen(":4001"); err != nil {
		logger.Error("server failed", slog.Any("err", err))
		os.Exit(1)
	}
}
