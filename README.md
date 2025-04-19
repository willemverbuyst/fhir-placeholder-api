# README

## 🤔 What is this?

A simple server where you can get some dummy [fhir R5](https://hl7.org/fhir/R5/) resources.

You can run this server locally for development purposes. The data is in memory. On starting the server some dummy data is created. When shutting down the server all data is lost.

## :nerd_face: Technical

A server with NestJS

## :pray: Inspiration

Inspired by [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)

## :telephone_receiver: Endpoints (wip)

- `GET /metadata`
- `GET /Patient`
- `GET /Patient?organization=<id>`
- `GET /Patient?general-practitioner=<id>`
- `GET /Patient/:id`
- `GET /EpisodeOfCare`
- `GET /EpisodeOfCare?patient=<id>`
- `GET /EpisodeOfCare/:id`
- `GET /Condition`
- `GET /Condition?patient=<id>`
- `GET /Condition/:id`
- `GET /Practitioner`
- `GET /Practitioner/:id`
- `GET /PractitionerRole`
- `GET /Practitioner?practitioner=<id>`
- `GET /Practitioner?organization=<id>`
- `GET /Encounter`
- `GET /Encounter?patient=<id>`
- `GET /Encounter?episode-of-care=<id>`
- `GET /Observation`
- `GET /Observation?patient=<id>`
- `GET /Observation?encounter=<id>`
- `GET /Organization`
- `GET /Organization/:id`
- `POST /Organization`
- `PATCH /Organization/:id`

```typescript
fetch('http://localhost:8080/api/v2/r5/Patient/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
```

or

```sh
curl http://localhost:8080/api/v2/r5/Patient/1
```

👇 _Output_

```json
{
  "id": "1",
  "name": [
    {
      "family": "Doe",
      "given": ["John"]
    }
  ],
  "resourceType": "Patient",
  "birthDate": "1969-12-05",
  "gender": "other",
  "telecom": [
    {
      "use": "old",
      "system": "email",
      "value": "John_Doe27@fhir-placeholder.api"
    },
    {
      "use": "temp",
      "system": "phone",
      "value": "(239) 778-3678"
    }
  ],
  "address": [
    {
      "use": "old",
      "type": "physical",
      "line": ["96298 Long Lane"],
      "city": "Gibson",
      "state": "Washington",
      "postalCode": "09207",
      "country": "Brunei Darussalam"
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1"
  },
  "generalPractitioner": [
    {
      "reference": "Practitioner/2"
    }
  ]
}
```

## :open_book: Swagger Docs

Go to [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## :rocket: Run Server

> npm run start

You can change the number of resources in the [config](./src/db/dataStore.config.ts)
