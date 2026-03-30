# Fhir Placeholder Api

## 🤔 What is this?

WIP

A collection of tools centered around Fhir R5 dummy data.

## Apps

- [fhir-client](apps/fhir-client)
- [fhir-data](apps/fhir-data)
- [fhir-server](apps/fhir-server)
- [fhir-to-tables](apps/fhir-to-tables)
- [gp-search](apps/gp-search/)
- [organization-reviews](apps/organization-reviews/)
- [questionnaire-client](apps/questionnaire-client/)
- [questionnaire-server](apps/questionnaire-server/)
- [resource-statuses](apps/resource-statuses/)
- [user-management](apps/user-management/)

## Cli

- [config-cli](cli/config-cli)
- [fhir-to-spreadsheet](services/fhir-to-spreadsheet)
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
    FNS[fhir-name-service]
    FS@{shape: circle, label: fhir-server}
    PT@{shape: rect, label: patient-timeline}
    A[auth]
    U[users]
    G[gateway]
  
    UDB@{shape: cyl, label: user-data}
    DB@{shape: cyl, label: fhir-data}
    RDB@{shape: cyl, label: review-data}
    PDB@{shape: cyl, label: practitioner-data}
  
    FTS@{shape: sl-rect, label: fhir-to-spreadsheet}
    GPS@{shape: rect, label: gp-search}
    RS@{shape: rect, label: resource-statuses}
    OR@{shape: rect, label: organization-reviews}
    FC@{shape: rect, label: fhir-client}
    FTT@{shape: rect, label: fhir-to-tables}
    UM@{shape: rect, label: user-management}
    
    ML@{shape: sl-rect, label: monorepo-launcher}
    FDC@{shape: sl-rect, label: fhir-db-cli}
    CS@{shape: sl-rect,label: config-cli}
    C@{shape: doc, label: config}
  
  
  GPS --> PDB
  FS --> DB
  CS --> C
  FDC --> DB
  FDC --> C
  FC --> G
  FTT --> G
  PT --> G
  UM --> G
  G --> U
  G --> A
  G --> FS
  A --> UDB
  U --> UDB
  OR --> RDB
  G --> FNS
  FTS -->FS
  
```

## Packages

- [config-scripts](packages/config-scripts)
- [database-helpers](packages/database-helpers)
- [dummy-data](packages/dummy-data)
- [fhir-terminology](packages/fhir-terminology)
- [normalizer](packages/normalizer)
- [utils](packages/utils)
