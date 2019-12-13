FROM node:current-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN yarn install
EXPOSE 5000

CMD ["npm", "run", "start"]