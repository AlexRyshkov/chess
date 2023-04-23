import {Side} from "src/enums/Side";
import {Grid} from "src/types/Grid";

export type GameState = {
    grid: Grid;
    currentSideMove: Side;
    isCheck: boolean;
    isMate: boolean;
    history: History;
};