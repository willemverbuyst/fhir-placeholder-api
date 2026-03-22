package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getFHIRQuestionnaire(context *gin.Context) {
	content, err := os.ReadFile("./example.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}

	var payload Questionnaire
	err = json.Unmarshal(content, &payload)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}

	checkResourceType(payload, "Questionnaire")

	var surveyJson SurveyJson

	surveyJson.Title = payload.Title

	html := getTextForHtml(payload)
	surveyJson.Pages = append(surveyJson.Pages, html)

	for _, i := range payload.Item {
		var es Elements

		processItems(i, &es)

		if len(i.Item) > 0 {
			for _, i := range i.Item {
				processItems(i, &es)
			}
		}

		surveyJson.Pages = append(surveyJson.Pages, es)
	}

	context.IndentedJSON(http.StatusOK, surveyJson)
}

func welcomeWorld(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, gin.H{"message": "hello world"})
}

func getGenderOptions(context *gin.Context) {
	content, err := os.ReadFile("./genderOptions.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}

	var payload []GenderOption
	err = json.Unmarshal(content, &payload)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	context.IndentedJSON(http.StatusOK, payload)
}

func getCountries(context *gin.Context) {
	content, err := os.ReadFile("./countries.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}

	var payload []Country
	err = json.Unmarshal(content, &payload)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	context.IndentedJSON(http.StatusOK, payload)
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/", welcomeWorld)
	router.GET("/countries", getCountries)
	router.GET("/gender-options", getGenderOptions)
	router.GET("/questionnaire", getFHIRQuestionnaire)
	err := router.Run(":9090")

	if err != nil {
		log.Fatal("Error when running server: ", err)
	}
}
