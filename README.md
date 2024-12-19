# README

## What is this?

A simple server where you can get some dummy [fhir](https://hl7.org/fhir/R4/) resources (Patient, Episodes and Conditions).

You can run this locally for dev purposes.

## Technical

A server with

- Oak
- Deno

## Inspiration

Inspired by [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)

## endpoints (wip)

- GET /Patients
- GET /Patients/:id
- GET /Patients/:id/episodes
- GET /Episodes
- GET /Episodes/:id
- GET /Conditions
- GET /Conditions/:id

Check [examples](./examples.http)

## Run Server

> deno run -A server.ts
