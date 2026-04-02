# Auth Service

## What is this?

Handles sign up and sign in with token issuing.

## Auth

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
