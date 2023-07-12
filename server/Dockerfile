FROM node:latest

WORKDIR app
COPY . .
RUN npm install
EXPOSE 3002

CMD npx knex migrate:latest; npm run start;

