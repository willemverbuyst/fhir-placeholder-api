package main

type ChoicesByUrl struct {
	Url       string `json:"url"`
	ValueName string `json:"valueName"`
}

type Country struct {
	Name         string `json:"name"`
	OfficialName string `json:"officialName"`
	Region       string `json:"region"`
	CCA2         string `json:"cca2"`
	CCN3         string `json:"ccn3"`
	CCA3         string `json:"cca3"`
	CIOC         string `json:"cioc"`
}

type Element struct {
	Name          string       `json:"name"`
	Title         string       `json:"title"`
	Type          string       `json:"type"`
	Html          string       `json:"html"`
	IsRequired    bool         `json:"isRequired"`
	Choices       []string     `json:"choices"`
	CorrectAnswer string       `json:"correctAnswer"`
	ChoicesOrder  string       `json:"choicesOrder"`
	ChoicesByUrl  ChoicesByUrl `json:"choicesByUrl"`
}

type Elements struct {
	Elements []Element `json:"elements"`
}

type GenderOption struct {
	Code    string `json:"code"`
	Display string `json:"display"`
}

type SurveyJson struct {
	Title string     `json:"title"`
	Pages []Elements `json:"pages"`
}
