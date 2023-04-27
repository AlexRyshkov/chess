import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { createGame } from "src/features/game/GameManager";
import { socketService } from "src/index";
import GameState from "src/models/GameState";
import Session, { SessionStatus } from "src/models/Session";

const router = express.Router();

router.get("/game/new", async (req, res) => {
  const session = await Session.query().insert({
    id: nanoid(),
  });

  const gameState = createGame();
  await GameState.query().insert({ session_id: session.id, data: gameState });
  socketService.createGameSessionSocket(session);
  const accessToken = jwt.sign(
    { sessionId: session.id },
    process.env.SECRET_KEY,
    { algorithm: "RS256" }
  );

  res.status(200).send({
    id: session.id,
    accessToken,
  });
});

router.get("/game/:id/join", async (req, res) => {
  try {
    const session = await Session.query().findById(req.params.id);
    if (!session) {
      return res.sendStatus(404);
    }

    if (session.status === SessionStatus.waitingForPlayer) {
      await session.$query().insert({ status: SessionStatus.inGame });
      const accessToken = jwt.sign(
        { sessionId: session.id },
        process.env.SECRET_KEY,
        { algorithm: "RS256" }
      );
      return res.status(200).send(accessToken);
    } else {
      return res.status(409).send("Game session is not available for join");
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;
