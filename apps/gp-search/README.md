# GP Search

## What is this?

An app where a logged in user can search for a practitioners email.

## 🐳 Docker

This PHP service runs entirely inside Docker. No local PHP or Composer installation is required.

### Prerequisites

* Docker
* Docker Compose

### 🚀 Getting Started

From this directory, start the container:

```bash
docker compose up --build
```

or:

```bash
docker compose up -d --build
```

### Commands

Get container name

> docker ps

Open bash session

> docker exec -it \<mysql-container\> bash

Start sql session

> mysql -u root -p

In sql session

> USE your_database_name

## 🎨 Code Formatting

### 📦 Install Dependencies

Run Composer inside the container:

```bash
docker compose exec gp-search composer install
```

or:

```bash
docker compose exec overview composer init --no-interaction
```

We use Laravel Pint for PHP formatting.

```bash
docker compose exec gp-search composer require laravel/pint --dev
```

### Format code

```bash
docker compose exec gp-search vendor/bin/pint
```

### Check formatting (CI mode)

```bash
docker compose exec gp-search vendor/bin/pint --test
```

---

## ➕ Adding Dependencies

To add a new PHP dependency:

```bash
docker compose exec gp-search composer require <package>
```

For dev dependencies:

```bash
docker compose exec gp-search composer require <package> --dev
```

---

## 🛠️ Notes

* All commands run inside Docker to ensure consistency across environments
* The project files are mounted into `/var/www/html`
* No local PHP or Composer setup is needed

---

## 🧩 Troubleshooting

### Container not running

```bash
docker compose ps
docker compose logs gp-search
```

### Missing dependencies

```bash
docker compose exec gp-search composer install
```

### Formatting issues

```bash
docker compose exec gp-search vendor/bin/pint
```
