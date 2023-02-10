FROM node:18.14.0-alpine

WORKDIR /usr/DemoAleloAPI

COPY . .

RUN npm install yarn

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]