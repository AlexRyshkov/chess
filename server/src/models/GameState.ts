import { Model } from "objection";
import GameStateData from "src/features/game/types/GameStateData";

class GameState extends Model {
  session_id: string;
  data: GameStateData;

  static get tableName(): string {
    return "gameState";
  }

  static get idColumn(): string {
    return "session_id";
  }
}

export default GameState;
