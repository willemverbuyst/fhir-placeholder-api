FROM node:22-slim

WORKDIR /workspace

RUN corepack enable

# Install workspace dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps ./apps

RUN pnpm install --frozen-lockfile

# Build only the FHIR server (plus its build dependencies)
RUN pnpm exec turbo run build --filter=fhir-server...

# Ensure the Nest ConfigModule envFilePath exists.
# `apps/fhir-server/src/app.module.ts` loads `.env.${NODE_ENV}`.
RUN printf "NODE_ENV=development\nPORT=8080\n" > .env.development \
  && printf "NODE_ENV=development\nPORT=8080\n" > apps/fhir-server/.env.development

EXPOSE 8080

CMD ["pnpm", "--filter", "fhir-server", "start"]

