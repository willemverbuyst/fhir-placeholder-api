# Monorepo Launcher (Python)

## What is this?

Interactive launcher that lets you pick apps/services and run them together.

## Run

From repo root:

```bash
python3 cli/monorepo-launcher/launcher.py --manifest cli/monorepo-launcher/targets.json
```

Or use:

```bash
pnpm dev:select
```

## Manifest

Edit `cli/monorepo-launcher/targets.json`.

Top-level shape:

```json
{
  "targets": []
}
```

Each target supports:

- `id`: stable unique key
- `name`: display label
- `kind`: free-form type (`pnpm-dev`, `command`, `exec`, ...)
- `cwd`: working directory, relative to repo root
- `command`: executable or command path
- `args`: optional command args list
- `env`: optional environment variable map
- `shell`: optional boolean for shell execution

## Executable services

To run services started by executables, point `command` to that binary:

```json
{
  "id": "my-binary-service",
  "name": "My Binary Service",
  "kind": "exec",
  "cwd": "services/my-service",
  "command": "./bin/my-service",
  "args": ["--port", "8081"]
}
```

If `command` contains a path (for example `./bin/my-service`), the launcher validates it relative to `cwd`.

## Optional richer prompt

The launcher works without dependencies. If you want a checkbox UI, install:

```bash
python3 -m pip install questionary
```

Without `questionary`, it falls back to a numbered comma-separated prompt.
