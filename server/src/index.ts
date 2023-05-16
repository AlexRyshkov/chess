import cors from "cors";
import express from "express";
import Knex from "knex";
import { Model } from "objection";
import router from "src/routes";
import { initSocket } from "src/services/socketService";
import config from "../knexfile";

const app = express();
const port = 3002;

const knex = Knex(config.development);
Model.knex(knex);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(router);

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

initSocket(server);
