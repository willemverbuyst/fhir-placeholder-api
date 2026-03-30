# Auth Service

## What is this?

Handles sign up and sign in with token issuing.

## Database

### Initialize and seed auth DB

Run these commands from the project root:

```bash
docker compose -f docker-compose.backend.yml up -d auth-service-db
docker exec -i auth-service-db psql -U postgres -d auth_db < services/auth-service/db/init-auth-db.sql
```

The SQL script is at `services/auth-service/db/init-auth-db.sql`.
It creates the `users` table (if missing) and seeds:

- `username`: `jacksparrow`
- `password`: `fooBar`
- `role`: `admin`

Note: the database stores a bcrypt hash in the `password` column, not plain text.

You can verify the seeded user(s) with:

```bash
docker exec -it auth-service-db psql -U postgres -d auth_db -c "SELECT id, username, role, created_at FROM users;"
```

### Bash

#### Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "username": "foo",  
    "password": "bar",
    "role": "guest"
  }'
```

#### Sign In

```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "username": "foo",  
    "password": "bar"
  }'
```

## Help

### Stop running postgres processes

`sudo systemctl stop postgresql`
