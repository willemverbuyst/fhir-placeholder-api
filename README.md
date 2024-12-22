# README

## 🤔 What is this?

A simple server where you can get some dummy [fhir R5](https://hl7.org/fhir/R5/) resources.

You can run this server locally for dev purposes.

## :nerd_face: Technical

A server with

- Oak
- Deno

## :pray: Inspiration

Inspired by [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)

## :telephone_receiver: Endpoints (wip)

- GET /patients
- GET /patients/:id
- GET /patients/:id/episodes
- GET /episodes
- GET /episodes/:id
- GET /episodes?patient=1
- GET /conditions
- GET /conditions/:id
- GET /practitioners
- GET /practitioners/:id
- GET /organizations
- GET /organizations/:id

```typescript
fetch("http://localhost:8000/R5/patients/1")
  .then((response) => response.json())
  .then((json) => console.log(json));
```

or

```sh
curl http://localhost:8000/R5/patients/1
```

👇 _Output_

```json
{
  "status": "success",
  "data": {
    "id": "1",
    "name": [
      {
        "family": "Kemmer",
        "given": ["Hugh"]
      }
    ],
    "resourceType": "Patient",
    "birthDate": "1969-12-05",
    "gender": "other",
    "telecom": [
      {
        "use": "old",
        "system": "email",
        "value": "Hugh_Kemmer27@fhir-placeholder.api"
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
        "city": "Gibsonboro",
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
}
```

Check [examples](./examples.http)

## :rocket: Run Server

> deno run --allow-net server.ts
