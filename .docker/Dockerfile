FROM node:20-alpine AS base
WORKDIR /app
RUN chown -R node:node /app
USER node

FROM base AS backend
# COPY apps/back-end ./apps/back-end
# EXPOSE 3000
# # COPY apps/back-end/start.sh ./apps/back-end/start.sh
# CMD ["sh", "./apps/back-end/start.sh"]

FROM base AS frontend
# # COPY apps/front-end ./apps/front-end
# EXPOSE 3001
# CMD ["npm", "run", "front:dev"]

FROM base AS base-prod
COPY ./package*.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM base-prod AS backend-prod
COPY apps/back-end ./apps/back-end
COPY ./tsconfig.json ./
RUN ["npm", "run", "build"]
CMD ["sh", "-c", "npm run prisma:migrate && npm run api:start:prod"]

FROM base-prod AS frontend-prod
COPY apps/front-end ./apps/front-end
# COPY ./tsconfig.json ./
RUN ["npm", "run", "front:build"]
CMD ["npm", "run", "front:start"]