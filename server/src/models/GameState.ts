import {Model} from "objection";
class GameState extends Model {
    session_id: string;
    data: any;

    static get tableName(): string {
        return "gameState";
    }

    static get idColumn(): string {
        return "session_id";
    }
}

export default GameState
