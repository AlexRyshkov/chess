import {Figure} from "src/features/game/figures/Figure";

export type MoveHistory = { figure: Figure; from: [number, number]; to: [number, number] }[];
