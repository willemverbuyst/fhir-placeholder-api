## 🧠 Implementation Hints (Effect.ts)

This section guides how to structure the implementation using **Effect.ts**. Follow these patterns closely.

---

## 🔑 Core Principle

Everything async or fallible should be modeled as an **Effect**:

```ts
Effect<R, E, A>
```

* `R` = dependencies (environment)
* `E` = error type
* `A` = success value

---

## 🧵 Orchestration with `Effect.gen`

Use `Effect.gen` for the main pipeline:

```ts
const timelineEffect = Effect.gen(function* (_) {
  const encounters = yield* _(fetchEncounters(patientId))
  const observations = yield* _(fetchObservations(patientId))
  const episodes = yield* _(fetchEpisodes(patientId))

  const timeline = buildTimeline(encounters, observations, episodes)

  return timeline
})
```

👉 Keep orchestration here, keep logic elsewhere.

---

## 🌐 FHIR Client Pattern

Wrap all HTTP calls in Effects:

```ts
const fetchEncounters = (patientId: string) =>
  Effect.tryPromise({
    try: () =>
      fetch(`${BASE_URL}/Encounter?patient=${patientId}`).then(res => res.json()),
    catch: (e) => new FetchError("Encounter fetch failed", e)
  })
```

---

## 🔁 Add Retry + Timeout

Every external call should be resilient:

```ts
pipe(
  fetchEncounters(patientId),
  Effect.retry(Schedule.recurs(2)),
  Effect.timeout("2 seconds")
)
```

👉 Apply per resource, not globally.

---

## 📦 Bundle Extraction

Create a helper:

```ts
const extractResources = <T>(bundle: any): T[] =>
  bundle.entry?.map((e: any) => e.resource) ?? []
```

👉 Keep this pure (no Effect).

---

## 🔗 Reference Parsing

Create a small utility:

```ts
const extractId = (ref?: string): string | null => {
  if (!ref) return null
  return ref.split("/")[1] ?? null
}
```

Use for:

* Observation → Encounter
* Encounter → EpisodeOfCare

---

## 🗺️ Build Lookup Maps

Convert arrays into maps for efficient joins:

```ts
const encounterMap = new Map(
  encounters.map(e => [e.id, e])
)
```

Same for:

* episodes
* grouped observations

---

## 📊 Group Observations by Encounter

```ts
const observationsByEncounter = new Map<string, Observation[]>()

for (const obs of observations) {
  const encounterId = extractId(obs.encounter?.reference)
  if (!encounterId) continue

  const group = observationsByEncounter.get(encounterId) ?? []
  group.push(obs)
  observationsByEncounter.set(encounterId, group)
}
```

---

## 🧱 Build Timeline Entries

Pure function:

```ts
const buildTimeline = (
  encounters: Encounter[],
  observations: Observation[],
  episodes: EpisodeOfCare[]
): TimelineEntry[] => {
  // maps + grouping

  return encounters.map(enc => {
    const obs = observationsByEncounter.get(enc.id) ?? []
    const episodeId = extractId(enc.episodeOfCare?.[0]?.reference)

    return {
      encounterId: enc.id,
      date: enc.period?.start,
      type: enc.type?.[0]?.text ?? "Unknown",
      episode: episodeId ? episodeMap.get(episodeId) : undefined,
      observations: obs.map(transformObservation)
    }
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
```

👉 Keep this **pure and testable**

---

## ❌ Error Modeling

Define typed errors:

```ts
class FetchError {
  constructor(readonly message: string, readonly cause?: unknown) {}
}

class InvalidFHIRStructure {}
```

---

## ⚠️ Partial Failure Strategy

Wrap each fetch independently:

```ts
const safeFetchObservations = pipe(
  fetchObservations(patientId),
  Effect.map(extractResources),
  Effect.either
)
```

Then combine:

```ts
const observationsResult = yield* _(safeFetchObservations)

if (Either.isLeft(observationsResult)) {
  warnings.push("Observations unavailable")
}
```

---

## 🧾 Return Shape

Final response:

```ts
type TimelineResponse = {
  timeline: TimelineEntry[]
  warnings: string[]
}
```

---

## 🧼 Separation of Concerns

* **Effect layer** → fetching, retries, errors
* **Domain layer** → types
* **Transformation layer** → pure mapping
* **Grouping layer** → joins + sorting

---

## 🚫 Anti-Patterns (Avoid These)

* ❌ Mixing `async/await` with Effect
* ❌ Mutating shared state inside Effects
* ❌ Doing transformation inside `Effect.gen`
* ❌ Throwing raw errors instead of typed ones
* ❌ One giant function doing everything

---

## ✅ Good Patterns

* ✅ Small composable functions
* ✅ Pure transformation functions
* ✅ Effects only for side-effects
* ✅ Explicit error channels
* ✅ Use `pipe` for readability

---

## 🧪 Suggested First Target

Implement only this:

```ts
fetchEncounters → extractResources → map to TimelineEntry → sort
```

Then incrementally add:

* observations
* grouping
* episodes
* error handling

---
