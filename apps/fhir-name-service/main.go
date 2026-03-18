package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

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

func main() {
	http.HandleFunc("/format-name", formatName)

	fmt.Println("Server running on http://localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
