import express from 'express';
import router from "src/routes";
import config from 'src/knexfile'
const app = express();
const port = 3002;


const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex(config.development);

Model.knex(knex);


app.use(router)


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});