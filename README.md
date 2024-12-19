# README

> deno run -A --watch server.ts

## What is this?

A simple oak server in a deno runtime, serving some [fhir](https://hl7.org/fhir/R4/) resources, based on [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)

It has the following endpoints (wip)

- GET /Patients
- GET /Patients/:id
- GET /Patients/:id/episodes
- GET /Episodes
- GET /Episodes/:id
- GET /Conditions
- GET /Conditions/:id
