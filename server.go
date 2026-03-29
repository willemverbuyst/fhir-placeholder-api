package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

const fhirApi = "https://hapi.fhir.org/baseR4/ValueSet"

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

func GetEncounterStatuses() ExpandedConcepts {
	resp, err := http.Get(fhirApi + "/$expand?url=http://hl7.org/fhir/ValueSet/encounter-status")

	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var result ValueSet
	if err := json.Unmarshal(body, &result); err != nil {
		fmt.Println("Can not unmarshal JSON")
	}

	return result.Expansion.Contains
}

func GetObservationStatuses() ExpandedConcepts {
	resp, err := http.Get(fhirApi + "/$expand?url=http://hl7.org/fhir/ValueSet/observation-status")

	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	if err != nil {
		log.Fatalln(err)
	}

	var result ValueSet
	if err := json.Unmarshal(body, &result); err != nil {
		fmt.Println("Can not unmarshal JSON")
	}

	return result.Expansion.Contains
}

func main() {
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{Views: engine})

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{})
	})

	app.Get("/encounter", func(c *fiber.Ctx) error {
		values := GetEncounterStatuses()

		return c.Render("encounter", fiber.Map{
			"Results": values,
		})
	})

	app.Get("/observation", func(c *fiber.Ctx) error {
		values := GetObservationStatuses()

		return c.Render("observation", fiber.Map{
			"Results": values,
		})
	})

	app.Listen(":3000")
}
