FROM node:18.16.0-alpine3.17

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "dev" ]