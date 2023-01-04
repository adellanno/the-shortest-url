FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install typescript

COPY . .

RUN npx tsc

EXPOSE 8000

CMD [ "npm", "run", "start" ]