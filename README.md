# README

## 🤔 What is this?

A simple server where you can get some dummy [fhir R5](https://hl7.org/fhir/R5/) resources.

You can run this server locally for dev purposes. The data is in memory. On starting the server some dummy data is created. When shutting down the server all data is lost.

## :nerd_face: Technical

A server with NestJS

## :pray: Inspiration

Inspired by [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)

## :telephone_receiver: Endpoints (wip)

- GET /patients
- GET /patients/:id
- GET /episodes
- GET /episodes/:id
- GET /episodes?patient=\<id\>
- GET /conditions
- GET /conditions/:id
- GET /practitioners
- GET /practitioners/:id
- DELETE /practitioner/:id
- GET /organizations
- POST /organizations
- DELETE /organizations/:id
- PATCH /organizations/:id
- GET /organizations/:id

```typescript
fetch('http://localhost:8080/api/v2/r5/patients/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
```

or

```sh
curl http://localhost:8080/api/v2/r5/patients/1
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

## :rocket: Run Server

> npm run start

You can change the number of resources in the [config](./src/db/dataStore.config.ts)
