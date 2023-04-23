import express from "express";
import router from "src/routes";
import config from "../knexfile";
import { Model } from "objection";

import Knex from "knex";

const app = express();
const port = 3002;
const knex = Knex(config.development);

Model.knex(knex);

app.use(router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
