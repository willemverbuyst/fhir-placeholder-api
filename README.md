# Fhir Placeholder Api

## 🤔 What is this?

WIP

A collection of tools centered around Fhir R5 dummy data.

## Apps

- [fhir-client](apps/fhir-client)
- [fhir-server](apps/fhir-server)
- [gp-search](apps/gp-search/)
- [organization-reviews](apps/organization-reviews/)
- [questionnaire-client](apps/questionnaire-client/)
- [questionnaire-server](apps/questionnaire-server/)
- [resource-statuses](apps/resource-statuses/)
- [user-management](apps/user-management/)

## Cli

- [config-cli](cli/config-cli)
- [fhir-data-db-cli](config/fhir-data-db-cli)
- [fhir-to-spreadsheet](config/fhir-to-spreadsheet)
- [monorepo-launcher](cli/monorepo-launcher/)

## Services

- [auth](services/auth)
- [fhir-name-service](services/fhir-name-service)
- [gateway](services/gateway)
- [patient-timeline](apps/patient-timeline)
- [users](services/users)

## App Interactions

```mermaid
flowchart LR
    FNS@{shape: stadium, label: fhir-name-service}
    FS@{shape: circle, label: fhir-server}
    PT@{shape: rect, label: patient-timeline}
    A@{shape: stadium, label: auth}
    U@{shape: stadium, label: users}
    G@{shape: stadium, label: gateway}
  
    C@{shape: doc, label: config}
    FDB@{shape: cyl, label: fhir-data}
    RDB@{shape: cyl, label: review-data}
  
    GPS@{shape: rect, label: gp-search}
    OR@{shape: rect, label: organization-reviews}
    FC@{shape: rect, label: fhir-client}
    UM@{shape: rect, label: user-management}
    RS@{shape: rect, label: resource-statuses}

    ML@{shape: sl-rect, label: monorepo-launcher}
    FTS@{shape: sl-rect, label: fhir-to-spreadsheet}
    FDC@{shape: sl-rect, label: fhir-data-db-cli}
    CS@{shape: sl-rect,label: config-cli}

  
  FDC --> C
  CS --> C
  FC --> G
  UM --> G
  OR --> G
  G --> PT
  G --> U
  G --> A
  G --> FNS
  G --> FS
  GPS --> FDB
  FS --> FDB
  FDC --> FDB
  A --> FDB
  U --> FDB
  OR --> RDB
  FTS -->FS
  
```

## Packages

- [config-scripts](packages/config-scripts)
- [database-helpers](packages/database-helpers)
- [dummy-data](packages/dummy-data)
- [fhir-terminology](packages/fhir-terminology)
- [normalizer](packages/normalizer)
- [utils](packages/utils)
