import express from "express";
import gameRouter from "src/features/game/game.routes";

const router = express.Router()

router.use('/api', [gameRouter]);

export default router;
