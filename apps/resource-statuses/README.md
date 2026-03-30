# Resource Statuses

## What is this?

A small project to try out **htmx** and **go** (using hapi fhir as api)

## Docker

Build from repo root:

> docker build -f apps/resource-statuses/Dockerfile -t resource-statuses:local apps/resource-statuses

Run:

> docker run --rm -p 4001:4001 resource-statuses:local
