import express from "express";
import { getVoteList, voteFeedback } from "../controllers/feedbackController";

const router = express.Router();

router.post("/vote", voteFeedback)
router.get("/voteList", getVoteList)

export default router;