# 🏥 Patient Timeline Service (Effect.ts)

## 📌 Overview

Build a backend service using **Effect.ts** that aggregates FHIR R5 resources into a structured, encounter-based patient timeline.

The service connects to a local FHIR server:

```bash
http://localhost:8080/api/v2/r5
```

It fetches:

* Observations
* Encounters
* Episodes of Care

Then:

1. Resolves references between resources
2. Groups observations under encounters
3. Associates encounters with episodes
4. Produces a chronological timeline

---

## 🌐 Data Source (FHIR API)

Base URL:

```bash
http://localhost:8080/api/v2/r5
```

### Fetch resources for a patient

Given a patient ID:

```bash
GET /Encounter?patient=<id>
GET /EpisodeOfCare?patient=<id>
GET /Observation?patient=<id>
```

Example:

```bash
GET http://localhost:8080/api/v2/r5/Observation?patient=123
```

---

## 🎯 Goal

Expose an endpoint:

Use `http://localhost:4000`

```http
GET /patient/:id/timeline
```

Return a structured timeline grouped by **encounter**, not raw events.

---

## 🧠 Core Concept

FHIR relationships:

```text
Observation → Encounter → EpisodeOfCare
```

Timeline structure:

```text
Episode
  └── Encounter (date = timeline axis)
        └── Observations
```

---

## 📊 Example Output

```json
{
  "timeline": [
    {
      "encounterId": "enc-1",
      "date": "2025-02-01",
      "type": "GP Visit",
      "episode": {
        "id": "ep-1",
        "title": "Hypertension treatment"
      },
      "observations": [
        {
          "type": "blood_pressure",
          "value": "140/90"
        },
        {
          "type": "heart_rate",
          "value": 85
        }
      ]
    },
    {
      "encounterId": "enc-2",
      "date": "2025-02-10",
      "type": "Follow-up",
      "episode": {
        "id": "ep-1",
        "title": "Hypertension treatment"
      },
      "observations": [
        {
          "type": "blood_pressure",
          "value": "130/85"
        },
        {
          "type": "weight",
          "value": "82kg"
        }
      ]
    }
  ]
}
```

---

## 🏗️ Architecture

There is already a src folder, with a placeholder server in index.ts, you can leave that. Add a fhir folder and start from there.

```text
src/
  fhir/
    client.ts            # HTTP client for FHIR API
  domain/
    models.ts            # Domain types
    transformers.ts      # FHIR → domain mapping
  services/
    timelineService.ts   # Main Effect pipeline
  utils/
    grouping.ts          # grouping + sorting logic
    fhirRefs.ts          # reference parsing helpers
  errors/
    errors.ts            # Typed errors
  main.ts                # HTTP server
```

---

## ⚙️ Functional Requirements

### 1. Fetch FHIR Resources

For a given patient ID:

* Fetch Observations
* Fetch Encounters
* Fetch EpisodesOfCare

All requests must:

* Run in parallel
* Use Effect
* Retry (2–3 times)
* Timeout (configurable)

---

### 2. Handle FHIR Bundles

FHIR responses are Bundles:

```json
{
  "entry": [
    { "resource": { ... } }
  ]
}
```

You must:

* Extract `entry[].resource`
* Handle empty bundles
* Validate resource types

---

### 3. Resolve References

FHIR references look like:

```json
{
  "encounter": {
    "reference": "Encounter/123"
  }
}
```

You must:

* Extract IDs (`123`)
* Build lookup maps:

```ts
Map<EncounterId, Encounter>
Map<EpisodeId, EpisodeOfCare>
```

---

### 4. Transform to Domain Model

Define a clean domain model:

```ts
type TimelineEntry = {
  encounterId: string
  date: string
  type: string
  episode?: {
    id: string
    title: string
  }
  observations: ObservationSummary[]
}
```

---

### 5. Grouping Logic

* Group observations by encounter ID
* Attach observations to encounters
* Attach episode to encounter
* Handle missing references

---

### 6. Sorting

Sort timeline entries:

```ts
encounter.date ASC
```

---

### 7. Partial Failure Handling

If one resource fails:

* Do NOT fail the whole request
* Return partial timeline
* Include warnings

Example:

```json
{
  "timeline": [...],
  "warnings": ["Observations unavailable"]
}
```

---

### 8. Logging

Log:

* Retries
* Failed requests
* Missing references
* Empty datasets

---

## 🧪 Edge Cases

* Observation without encounter reference
* Encounter without episode
* Missing `entry` in bundle
* Invalid reference strings
* Duplicate resources
* Missing dates (`period.start`)

---

## 🔧 Technical Requirements

* Language: TypeScript
* Library: Effect.ts
* Use `Effect.gen` for orchestration
* Avoid raw async/await in core logic
* Strong typing required
* Pure transformation functions (no side effects)

---

## 🧱 Suggested Implementation Steps

### Phase 1

* Implement FHIR client
* Fetch encounters only
* Return basic timeline

### Phase 2

* Add observations
* Group by encounter

### Phase 3

* Add episode linking

### Phase 4

* Add retry + timeout (Effect policies)

### Phase 5

* Add error handling + warnings

---

## ⭐ Stretch Goals

* Group timeline by episode
* Add derived insights (e.g. trends)
* Cache responses
* Add filtering (date range)
* Pagination
* Deduplicate observations

---

## 🧠 Design Principles

* Composition over mutation
* Explicit error modeling
* Separate IO from transformation
* Prefer small pure functions
* Treat FHIR as unreliable input

---

## ✅ Success Criteria

* Timeline grouped by encounter
* Correct reference resolution
* Partial failures handled gracefully
* Clean separation of concerns
* Strong typing across layers
* Proper use of Effect abstractions

---
