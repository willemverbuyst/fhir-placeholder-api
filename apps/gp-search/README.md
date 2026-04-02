# GP Search

## What is this?

An app where a logged in user can search for a practitioners email.

## 🐳 Docker

This PHP service runs entirely inside Docker. No local PHP or Composer installation is required.

### Prerequisites

* Docker
* Docker Compose

### 🚀 Getting Started

From the repository root, start the stack (db, cli & app use profile `search`):

```bash
docker compose -f docker-compose.database.yml -f docker-compose.cli.yml -f docker-compose.client.yml --profile search up
```

## 🎨 Code Formatting

### 📦 Install Dependencies

Run Composer inside the container:

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer install
```

or:

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer init --no-interaction
```

We use Laravel Pint for PHP formatting.

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer require laravel/pint --dev
```

### Format code

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search vendor/bin/pint
```

### Check formatting (CI mode)

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search vendor/bin/pint --test
```

---

## ➕ Adding Dependencies

To add a new PHP dependency:

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer require <package>
```

For dev dependencies:

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer require <package> --dev
```

---

## 🛠️ Notes

* All commands run inside Docker to ensure consistency across environments
* The project files are mounted into `/var/www/html`
* No local PHP or Composer setup is needed

---

## 🧩 Troubleshooting

From the repository root unless noted otherwise.

### Container not running

```bash
docker compose -f docker-compose.client.yml ps
docker compose -f docker-compose.client.yml logs gp-search
```

### Missing dependencies

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search composer install
```

### Formatting issues

```bash
docker compose -f docker-compose.client.yml --profile gp-search exec gp-search vendor/bin/pint
```
