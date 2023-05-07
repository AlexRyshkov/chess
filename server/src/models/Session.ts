import { Model } from "objection";

export enum SessionStatus {
  waitingForWhitePlayer = "waitingForWhitePlayer",
  waitingForBlackPlayer = "waitingForBlackPlayer",
  inGame = "inGame",
  finished = "finished",
}

class Session extends Model {
  id: string;
  status: SessionStatus;

  static get tableName(): string {
    return "sessions";
  }

  static get idColumn(): string {
    return "id";
  }
}

export default Session;
