import express from "express";
import router from "src/routes";
import config from "../knexfile";
import { Model } from "objection";
import cors from 'cors';

import Knex from "knex";

const app = express();
const port = 3002;
const knex = Knex(config.development);

Model.knex(knex);

app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);


app.use(router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
