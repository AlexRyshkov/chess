import {Model} from "objection";

export enum SessionStatus {
    waitingForPlayer = "waitingForPlayer",
    inGame = "inGame",
    finished = "finished",
}

class Session extends Model {
    id: string;
    access_token: string;
    status: SessionStatus;

    static get tableName(): string {
        return "sessions";
    }

    static get idColumn(): string {
        return "id";
    }
}

export default Session
