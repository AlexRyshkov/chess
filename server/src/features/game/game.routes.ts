import crypto from "crypto";
import express from "express";
import { nanoid } from "nanoid";
import { createGame } from "src/features/game/GameManager";
import { socketService } from "src/index";
import GameState from "src/models/GameState";
import Session, { SessionStatus } from "src/models/Session";

const router = express.Router();

router.get("/game/new", async (req, res) => {
  const session = await Session.query().insert({
    id: nanoid(),
    accessToken: crypto.randomBytes(16).toString("base64"),
  });

  const gameState = createGame();
  await GameState.query().insert({ session_id: session.id, data: gameState });
  socketService.createGameSessionSocket(session);

  res.status(200).send({
    id: session.id,
    accessToken: session.accessToken,
  });
});

router.get("/game/:id/join", async (req, res, next) => {
  try {
    const session = await Session.query().findById(req.params.id);
    if (!session) {
      return res.sendStatus(404);
    }

    if (session.status === SessionStatus.waitingForPlayer) {
      await session.$query().update({ status: SessionStatus.inGame });

      return res.status(200).send(session.accessToken);
    } else {
      return res.status(200).send();
    }
  } catch (error) {
    next(error);
  }
});

export default router;
