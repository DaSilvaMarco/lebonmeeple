# Base pour tous les stages
FROM node:20-alpine AS base
WORKDIR /app
RUN chown -R node:node /app
USER node

FROM base AS base-prod
COPY --chown=node:node ./package*.json ./
RUN npm ci --ignore-scripts

FROM base-prod AS backend-prod
COPY --chown=node:node ./apps/back-end ./apps/back-end
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./tsconfig.build.json ./
COPY --chown=node:node ./apps/back-end/prisma ./apps/back-end/prisma
COPY --chown=node:node ./.env ./.env
RUN npm run prisma:generate
RUN npm run api:build
CMD ["npm", "run", "api:start:prod"]


FROM base-prod AS frontend-prod
COPY --chown=node:node ./apps/front-end ./apps/front-end
COPY --chown=node:node ./tsconfig.json ./
RUN npm run front:build
CMD ["npm", "run", "front:start"]
