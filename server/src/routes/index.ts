import express from "express";
import gameRouter from "src/features/game/gameRoutes";

const router = express.Router();

router.use("/api", [gameRouter]);

export default router;
