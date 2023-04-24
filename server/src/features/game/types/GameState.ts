import {Side} from "src/features/game/enums/Side";
import {Grid} from "src/features/game/types/Grid";
import {MoveHistory} from "src/features/game/types/MoveHistory";

export type GameState = {
    grid: Grid;
    currentSideMove: Side;
    isCheck: boolean;
    isMate: boolean;
    history: MoveHistory;
};