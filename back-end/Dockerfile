FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]