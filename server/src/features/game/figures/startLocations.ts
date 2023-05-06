import { Side } from "../enums/Side";

export const FIGURE_START_LOCATIONS: any = {
  [Side.WHITE]: {
    Rook: [
      [0, 0],
      [0, 7],
    ],
    King: [0, 3],
  },
  [Side.BLACK]: {
    Rook: [
      [7, 0],
      [7, 7],
    ],
    King: [7, 3],
  },
};
