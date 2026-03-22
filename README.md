# Fhir Placeholder Api

## 🤔 What is this?

A collection of tools centered around Fhir R5 dummy data.

## Apps

- [config-cli](apps/config-cli)
- [fhir-client](apps/fhir-client)
- [fhir-data](apps/fhir-data)
- [fhir-name-service](apps/fhir-name-service)
- [fhir-server](apps/fhir-server)
- [fhir-to-spreadsheet](apps/fhir-to-spreadsheet)
- [fhir-to-tables](apps/fhir-to-tables)
- [patient-timeline](apps/patient-timeline)

## App Interactions

```mermaid
flowchart LR
  C@{shape: doc, label: config}
  CS@{shape: sl-rect,label: config-cli}
  FS@{shape: circle, label: fhir-server}
  DB@{shape: cyl, label: fhir-data}
  FC@{shape: rect, label: fhir-client}
  FS --> C
  DB --> C
  CS --> C
  FC --> FS
  FTS[fhir-to-spreadsheet] --> FS
  FTT[fhir-to-tables] --> FS
  PT[patient-timeline] --> FS
  PT --> FNS[fhir-name-service]
```

## Packages

- [config-scripts](packages/config-scripts)
- [database-helpers](packages/database-helpers)
- [dummy-data](packages/dummy-data)
- [fhir-terminology](packages/fhir-terminology)
- [normalizer](packages/normalizer)
- [utils](packages/utils)
