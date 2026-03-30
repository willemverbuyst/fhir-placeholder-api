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

func GetStatuses(valueSet string) ExpandedConcepts {
	resp, err := http.Get(fhirApi + "/$expand?url=http://hl7.org/fhir/ValueSet/" + valueSet)

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
		values := GetStatuses("encounter-status")

		return c.Render("resource-statuses", fiber.Map{
			"ResourceType": "Encounter",
			"Results":      values,
		})
	})

	app.Get("/observation", func(c *fiber.Ctx) error {
		values := GetStatuses("observation-status")

		return c.Render("resource-statuses", fiber.Map{
			"ResourceType": "Observation",
			"Results":      values,
		})
	})

	app.Get("/episode-of-care", func(c *fiber.Ctx) error {
		values := GetStatuses("episode-of-care-status")

		return c.Render("resource-statuses", fiber.Map{
			"ResourceType": "Episode of Care",
			"Results":      values,
		})
	})

	app.Get("/appointment", func(c *fiber.Ctx) error {
		values := GetStatuses("appointmentstatus")

		return c.Render("resource-statuses", fiber.Map{
			"ResourceType": "Appointment",
			"Results":      values,
		})
	})

	app.Get("/flag", func(c *fiber.Ctx) error {
		values := GetStatuses("flag-status")

		return c.Render("resource-statuses", fiber.Map{
			"ResourceType": "Flag",
			"Results":      values,
		})
	})

	app.Listen(":3000")
}
