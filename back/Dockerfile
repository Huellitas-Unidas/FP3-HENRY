FROM node:latest AS build

WORKDIR /app

COPY package.json ./


RUN npm install

COPY . ./
RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]