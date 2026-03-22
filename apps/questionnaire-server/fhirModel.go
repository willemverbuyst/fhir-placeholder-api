package main

type Questionnaire struct {
	ResourceType   string `json:"resourceType,omitempty"`
	Id             string `json:"id,omitempty"`
	Text           Text   `json:"text,omitempty"`
	Url            string `json:"url,omitempty"`
	Status         string `json:"status,omitempty"`
	ImplicitRules  string `json:"implicitRules,omitempty"`
	Language       string `json:"language,omitempty"`
	Version        string `json:"version,omitempty"`
	Name           string `json:"name,omitempty"`
	Title          string `json:"title,omitempty"`
	Date           string `json:"date,omitempty"`
	Publisher      string `json:"publisher,omitempty"`
	Description    string `json:"description,omitempty"`
	Purpose        string `json:"purpose,omitempty"`
	Copyright      string `json:"copyright,omitempty"`
	ApprovalDate   string `json:"approvalDate,omitempty"`
	LastReviewDate string `json:"lastReviewDate,omitempty"`
	Item           []Item `json:"item,omitempty"`
}

type Item struct {
	Id             string         `json:"id,omitempty"`
	LinkId         string         `json:"linkId,omitempty"`
	Definition     string         `json:"definition,omitempty"`
	Prefix         string         `json:"prefix,omitempty"`
	Text           string         `json:"text,omitempty"`
	Type           string         `json:"type,omitempty"`
	Required       bool           `json:"required,omitempty"`
	Repeats        bool           `json:"repeats,omitempty"`
	ReadOnly       bool           `json:"readOnly,omitempty"`
	MaxLength      int            `json:"maxLength,omitempty"`
	AnswerValueSet string         `json:"answerValueSet,omitempty"`
	AnswerOption   []AnswerOption `json:"answerOption,omitempty"`
	Item           []Item         `json:"item,omitempty"`
}

type AnswerOption struct {
	ValueCoding Code `json:"valueCoding,omitempty"`
}

type Code struct {
	Code string `json:"code,omitempty"`
}

type Text struct {
	Status string `json:"status,omitempty"`
	Div    string `json:"div,omitempty"`
}
