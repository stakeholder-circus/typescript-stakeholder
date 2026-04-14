FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN corepack enable
RUN pnpm install --frozen-lockfile
COPY src ./src
COPY test ./test
RUN pnpm run format
RUN pnpm run build
RUN pnpm run test

FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY --from=build /app/dist ./dist
ENTRYPOINT ["node", "dist/src/index.js"]
