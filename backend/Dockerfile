FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

ENV NODE_ENV=docker

CMD ["npm", "start"]