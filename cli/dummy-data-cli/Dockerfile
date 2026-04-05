FROM node:22-slim

WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY cli ./cli

RUN pnpm install --frozen-lockfile
RUN pnpm --filter "dummy-data-cli..." --if-present run build

CMD ["pnpm", "--filter", "dummy-data-cli", "run", "seed:db"]