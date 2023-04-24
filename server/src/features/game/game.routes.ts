import express from "express";
import Session, {SessionStatus} from "src/models/Session"
// import {socketService} from "src/index";
import {createDefaultGrid, createGame} from "src/features/game/GameManager";
import GameState from "src/models/GameState";
import {socketService} from "src/index";

const router = express.Router()

router.get('/game/new', async (req, res) => {
    const session = await Session.query().insert({
        id: crypto.randomUUID(),
        access_token: crypto.randomUUID()
    });

    const gameState = createGame();
    await GameState.query().insert({session_id: session.id, data: gameState});
    socketService.createGameSessionSocket(session);
    res.status(200).send({id: session.id, access_token: session.access_token});
});

router.get('/game/:id/join', async (req, res) => {
    const session = await Session.query().findById(req.params.id);
    if (!session) {
        return res.sendStatus(404);
    }

    else {
        await session.$query().update({status: SessionStatus.inGame});
    }

    // socketService.createGameSessionSocket(session);
    return res.status(200).send(session.access_token)
})

export default router;
