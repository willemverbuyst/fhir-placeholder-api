# Tables app

The tables app is a small Next.js UI for exploring FHIR resources exposed by the `fhir-placeholder-api` project. It renders simple table views for common resources (patients, organizations, encounters, observations, and more) so you can quickly inspect placeholder data while developing or testing the backend.

The app lives in the `apps/tables` workspace package and is intended for **local development and debugging**, not production use.

## Tech stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript with React
- **Styling**: TailwindCSS
- **Monorepo tooling**: Turborepo with `pnpm` workspaces
- **Shared logic**: `@repo/normalizer` for shaping FHIR data

## Getting started

### Prerequisites

- **Node.js**: `>= 22` (see root `package.json` engines)
- **Package manager**: `pnpm` (see `packageManager` in the root `package.json`)
- A running instance of the `fhir-placeholder-api` backend (typically via the root README instructions)

### Install dependencies

From the repo root:

```bash
pnpm install
```

This installs dependencies for all workspace packages, including the tables app.

### Run the tables app

From the repo root, use the Turborepo dev script:

```bash
pnpm dev
```

This starts dev servers for any packages configured with a `dev` script, including `apps/tables`.

Alternatively, you can run the app package directly:

```bash
cd apps/tables
pnpm dev
```

Once the dev server is running, open:

- `http://localhost:3000` – main landing page

You can then navigate to specific resource tables using the sidebar or direct URLs, for example:

- `/patient`
- `/practitioner`
- `/practitioner-role`
- `/appointment`
- `/encounter`
- `/episode-of-care`
- `/organization`
- `/observation`
- `/condition`
- `/allergy-intolerance`

## Scripts

All scripts below are defined in `apps/tables/package.json`.

- **`pnpm dev`**: Start the Next.js dev server for the tables app.
- **`pnpm build`**: Build the app for production.
- **`pnpm start`**: Run the production build.

From the repo root you can also use the shared scripts:

- **`pnpm dev`**: Run `dev` in all relevant packages via Turborepo.
- **`pnpm build`**: Run `build` in all relevant packages via Turborepo.

## Project structure

Key paths under `apps/tables`:

- **`app/`**: Next.js App Router entrypoint and route tree.
  - `app/page.tsx`: Landing page for the tables UI.
  - `app/layout.tsx`: Root layout, including shared layout and providers.
  - `app/*/page.tsx`: Resource-specific table pages (e.g. `patient`, `organization`, `observation`, etc.).
  - `app/loading.tsx`: Global loading UI while routes fetch data.
  - `app/globals.css`: Global styles for the app.
- **`components/`**: Shared presentational and layout components.
  - `components/Header.tsx`: Top-level header/navigation.
  - `components/DataTable.tsx`: Generic table component used by resource pages.
  - `components/LoadingOverlay.tsx`: Overlay shown while data is loading.
- **`next.config.ts`** / **`postcss.config.mjs`** / **`tsconfig.json`**: Local configuration for Next.js, PostCSS/Tailwind, and TypeScript.

When adding new tables or views, prefer:

- Reusing `DataTable` where possible.
- Adding new routes under `app/<resource>/page.tsx`.
- Keeping layout concerns in `layout.tsx` and shared UI in `components/`.

## Environment and configuration

The tables app expects to talk to the `fhir-placeholder-api` backend. The exact configuration (e.g. base URL or proxy settings) is determined by the Next.js runtime and any fetch logic in the route components or shared libraries such as `@repo/normalizer`.
