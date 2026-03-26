# Organization Reviews

## phpMyAdmin

Login with root, rootsecret

## Run Unit Tests

PHP runs in Docker for this app, so execute tests in containers.

### 1) Install test dependencies

```bash
docker run --rm -v "$(pwd)/apps/organization-reviews:/app" -w /app composer:2 install
```

- `docker run --rm`: starts a temporary container and removes it after completion.
- `-v "$(pwd)/apps/organization-reviews:/app"`: mounts your app directory into the container so installed files are written to your project.
- `-w /app`: sets the working directory inside the container.
- `composer:2 install`: runs Composer using the official image to install dependencies from `composer.lock`.

### 2) Run PHPUnit

```bash
docker compose run --rm organization-reviews sh -lc "cd /var/www/html && ./vendor/bin/phpunit --configuration phpunit.xml"
```

- `docker compose run --rm organization-reviews`: starts a one-off container for the existing `organization-reviews` service from `docker-compose.yml`.
- `sh -lc "..."`
  runs the given command through a shell in that container.
- `cd /var/www/html`: moves to the app path configured in the PHP image.
- `./vendor/bin/phpunit --configuration phpunit.xml`: executes the project-local PHPUnit binary with this app's test config.

Expected result: `OK (7 tests, 7 assertions)` (or higher as tests are added).
