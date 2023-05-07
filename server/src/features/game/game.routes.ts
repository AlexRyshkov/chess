import express from "express";
import { query } from "express-validator";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { createGame } from "src/features/game/GameManager";
import { socketService } from "src/index";
import GameState from "src/models/GameState";
import Session, { SessionStatus } from "src/models/Session";
import { Side } from "./enums/Side";
import { SIDE_SELECTION } from "./enums/SideSelection";

const router = express.Router();

const JoinedPlayerSide = {
  [SessionStatus.waitingForWhitePlayer]: Side.WHITE,
  [SessionStatus.waitingForBlackPlayer]: Side.BLACK,
};

const newSessionStatus = {
  [Side.WHITE]: SessionStatus.waitingForBlackPlayer,
  [Side.BLACK]: SessionStatus.waitingForWhitePlayer,
};

router.get(
  "/game/new",
  query("side").notEmpty().isIn(Object.values(SIDE_SELECTION)),
  async (req, res, next) => {
    try {
      const sideSelection = req.query.side;

      let side = sideSelection;
      if (sideSelection === SIDE_SELECTION.RANDOM) {
        side = Math.random() > 0.5 ? Side.WHITE : Side.BLACK;
      }

      const status = newSessionStatus[side];
      const session = await Session.query().insert({
        id: nanoid(),
        status,
      });

      const gameState = createGame();
      await GameState.query().insert({
        session_id: session.id,
        data: gameState,
      });
      socketService.createGameSessionSocket(session);

      const accessToken = jwt.sign({ side }, process.env.SECRET_KEY);

      res.status(200).send({
        id: session.id,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/game/:id/join", async (req, res, next) => {
  try {
    const session = await Session.query().findById(req.params.id);
    if (!session) {
      return res.sendStatus(404);
    }
    const joinedPlayerSide = JoinedPlayerSide[session.status];
    if (joinedPlayerSide) {
      await session.$query().update({ status: SessionStatus.inGame });
      const accessToken = jwt.sign(
        { side: joinedPlayerSide },
        process.env.SECRET_KEY
      );
      return res.status(200).send({ accessToken });
    } else {
      return res.status(200).send();
    }
  } catch (error) {
    next(error);
  }
});

export default router;
