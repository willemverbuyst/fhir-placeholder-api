package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type HumanName struct {
	Given  []string `json:"given"`
	Family string   `json:"family"`
}

func formatName(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var name HumanName
	err := json.NewDecoder(r.Body).Decode(&name)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if len(name.Given) == 0 {
		http.Error(w, "Missing given name", http.StatusBadRequest)
		return
	}

	result := fmt.Sprintf("%s %s", name.Given[0], name.Family)

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
