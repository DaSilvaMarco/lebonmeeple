# Base pour tous les stages
FROM node:20-alpine AS base
WORKDIR /app
RUN chown -R node:node /app
USER node

# Stage de production de base (installe uniquement les dépendances prod)
FROM base AS base-prod
COPY --chown=node:node ./package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Backend prod
FROM base-prod AS backend-prod
COPY --chown=node:node ./apps/back-end ./apps/back-end
COPY --chown=node:node ./tsconfig.json ./
COPY --chown=node:node ./prisma ./prisma
RUN npm run prisma:generate
RUN npm run api:build
CMD ["npm", "run", "api:start:prod"]

# Frontend prod
FROM base-prod AS frontend-prod
COPY --chown=node:node ./apps/front-end ./apps/front-end
COPY --chown=node:node ./tsconfig.json ./
RUN npm run front:build
CMD ["npm", "run", "front:start"]
