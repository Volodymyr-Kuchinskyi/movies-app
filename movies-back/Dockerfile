FROM node:12.10-alpine

EXPOSE 3001

WORKDIR /app

COPY package.json package.json

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev"]
