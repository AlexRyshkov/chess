import express from "express";
import Session from "src/models/Session"

const router = express.Router()

router.get('/game/new', async (req, res) => {
   const session = await Session.query().insert({
      id: crypto.randomUUID(),
      access_token: crypto.randomUUID()
   });
   res.status(200).send(session.id);
});

export default router;
