import express from "express";
import { query } from "express-validator";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import SelectionSide from "src/features/game/enums/SelectionSide";
import Side from "src/features/game/enums/Side";
import GameState from "src/models/GameState";
import Session, { SessionStatus } from "src/models/Session";
import { createGameSessionSocket } from "./gameSockets";
import createGameState from "./utils/createGameState";

const router = express.Router();

const JoinedPlayerSide = {
  [SessionStatus.waitingForWhitePlayer]: Side.White,
  [SessionStatus.waitingForBlackPlayer]: Side.Black,
};

const newSessionStatus = {
  [Side.White]: SessionStatus.waitingForBlackPlayer,
  [Side.Black]: SessionStatus.waitingForWhitePlayer,
};

router.get(
  "/game/new",
  query("side").notEmpty().isIn(Object.values(SelectionSide)),
  async (req, res, next) => {
    try {
      let side = req.query.side;
      if (side === SelectionSide.Random) {
        side = Math.random() > 0.5 ? Side.White : Side.Black;
      }

      const status = newSessionStatus[side];
      const session = await Session.query().insert({
        id: nanoid(),
        status,
      });

      const gameState = createGameState();
      await GameState.query().insert({
        session_id: session.id,
        data: gameState,
      });
      createGameSessionSocket(session);

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
    console.log(session);
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
