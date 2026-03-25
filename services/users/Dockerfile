FROM node:22-slim

WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo run build --filter=user-service...

EXPOSE 3002

CMD ["pnpm", "--filter", "user-service", "start"]
