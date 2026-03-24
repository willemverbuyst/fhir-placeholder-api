# Fhir Placeholder Api

## 🤔 What is this?

WIP

A collection of tools centered around Fhir R5 dummy data.

## Apps

- [fhir-client](apps/fhir-client)
- [fhir-data](apps/fhir-data)
- [fhir-server](apps/fhir-server)
- [fhir-to-tables](apps/fhir-to-tables)
- [patient-timeline](apps/patient-timeline)

## Cli

- [config-cli](cli/config-cli)
- [monorepo-launcher](cli/monorepo-launcher/)

## Services

- [auth](services/auth)
- [fhir-name-service](services/fhir-name-service)
- [fhir-to-spreadsheet](services/fhir-to-spreadsheet)
- [gateway](services/gateway)
- [users](services/users)


## App Interactions

```mermaid
flowchart LR
  subgraph CLI
    ML@{shape: sl-rect, label: monorepo-launcher}
    CS@{shape: sl-rect,label: config-cli}
    FDC@{shape: sl-rect, label: fhir-db-cli}
  end 
  subgraph APPS
    PT[patient-timeline]
    FC@{shape: rect, label: fhir-client}
    FTT[fhir-to-tables]
    FS@{shape: circle, label: fhir-server}
  end
  subgraph SERVICES
    A[auth]
    U[users]
    G[gateway]
    FNS[fhir-name-service]
    FTS[fhir-to-spreadsheet]
  end
  subgraph Data
    C@{shape: doc, label: config}
    DB@{shape: cyl, label: fhir-data}
    UDB@{shape: cyl, label: user-data}
  end
  FS --> DB
  CS --> C
  FDC --> DB
  FDC --> C
  FC --> G
  FTT --> G
  PT --> G
  G --> U
  G --> A
  G --> FS
  A --> UDB
  G --> FNS
  
```

## Packages

- [config-scripts](packages/config-scripts)
- [database-helpers](packages/database-helpers)
- [dummy-data](packages/dummy-data)
- [fhir-terminology](packages/fhir-terminology)
- [normalizer](packages/normalizer)
- [utils](packages/utils)
