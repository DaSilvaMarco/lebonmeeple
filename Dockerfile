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
COPY --chown=node:node ./package*.json ./ 
RUN npm ci --omit=dev --ignore-scripts

FROM base-prod AS backend-prod
COPY --chown=node:node apps/back-end ./apps/back-end
COPY --chown=node:node ./tsconfig.json ./
RUN ["npm", "run", "prisma:generate"]
RUN ["npm", "run", "api:build"]
CMD ["sh", "-c", "npm run prisma:migrate && npm run api:start:prod"]

FROM base-prod AS frontend-prod
COPY --chown=node:node apps/front-end ./apps/front-end
RUN ls -la apps/front-end/ && mkdir -p apps/front-end/.next
COPY --chown=node:node ./tsconfig.json ./
RUN ["npm", "run", "front:build"]
CMD ["npm", "run", "front:start"]