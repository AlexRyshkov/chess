import express from "express";
import gameRouter from "src/routes/gameRouter";

const router = express.Router()

router.use('/api', [gameRouter]);

export default router;
