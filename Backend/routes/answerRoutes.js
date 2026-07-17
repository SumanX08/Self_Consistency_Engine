import express from "express";
import { generateAnswer } from "../controllers/answerController.js";
import { streamAnswers } from "../controllers/streamController.js";

const router = express.Router();

router.post("/", generateAnswer);
router.get("/stream", streamAnswers);

export default router;