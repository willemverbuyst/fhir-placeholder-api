# Fhir Name Service

## What is this?

A small service that will convert a Fhir `HumanName` object to a readable one-liner.

## Docker

Build from repo root:

> docker build -f services/fhir-name-service/Dockerfile -t fhir-name-service:local services/fhir-name-service

Run:

> docker run --rm -p 4000:4000 fhir-name-service:local
