FROM node:8.4

WORKDIR /usr/src/radioactive-bird

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
