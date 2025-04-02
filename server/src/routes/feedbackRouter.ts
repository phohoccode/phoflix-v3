import express from "express";
import {
  addFeedback,
  addReplyFeedback,
  deleteFeedback,
  getFeedbacks,
  getReplyList,
  getStatsByMovie,
  getVoteList,
  updateContentFeedback,
  voteFeedback,
} from "../controllers/feedbackController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// feedback
router.get("/list", getFeedbacks);
router.get("/replyList", getReplyList);
router.get("/statsByMovie", getStatsByMovie);

// feedback protected routes
router.post("/add", authMiddleware, addFeedback);
router.delete("/delete", authMiddleware, deleteFeedback);
router.put("/update", authMiddleware, updateContentFeedback);
router.post("/reply", authMiddleware, addReplyFeedback);

// vote
router.get("/voteList", getVoteList);

// vote protected routes
router.post("/vote", authMiddleware, voteFeedback);

export default router;
