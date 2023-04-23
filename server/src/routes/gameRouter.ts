import express from "express";
import Session, {SessionStatus} from "src/models/Session"

const router = express.Router()

router.get('/game/new', async (req, res) => {
    const session = await Session.query().insert({
        id: crypto.randomUUID(),
        access_token: crypto.randomUUID()
    });
    res.status(200).send({id: session.id, access_token: session.access_token});
});

router.get('/game/:id', async (req, res) => {
    const session = await Session.query().findById(req.params.id);
    if (!session) {
        res.sendStatus(404);
    }

    await session.$query().update({status: SessionStatus.inGame});
    res.status(200).send(session.access_token)
})

export default router;
