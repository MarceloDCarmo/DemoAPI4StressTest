FROM node:18.14.0-alpine

WORKDIR /usr/DemoAleloAPI

COPY . .

COPY ./.env .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]