# User Data

## Commands

### Build

From the repository root:

`docker compose up -d`

### Create user table

> docker exec -it auth_postgres psql -U postgres -d auth_db

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Exit

`\q`

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
