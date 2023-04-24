import express from "express";
import router from "src/routes";
import config from "../knexfile";
import {Model} from "objection";
import cors from 'cors';
import Knex from "knex";
import Session from "src/models/Session";
import SocketService from "src/services/socketService";

const app = express();
const port = 3002;

const knex = Knex(config.development);
Model.knex(knex);

app.use(express.json());
app.use(
    cors({
        origin: '*',
    })
);

app.use(router);


const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

export const socketService = new SocketService(server);

Session.query().then(sessions => {
    for (const session of sessions) {
        socketService.createGameSessionSocket(session);
    }
});


