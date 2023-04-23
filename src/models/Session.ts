import { Model } from "objection";

class Session extends Model {
  id: string;
  access_token: string;

  static get tableName(): string {
    return "sessions";
  }

  static get idColumn(): string {
    return "id";
  }
}

export default Session
