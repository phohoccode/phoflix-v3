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

const router = express.Router();

// feedback
router.get("/list", getFeedbacks);
router.get("/replyList", getReplyList);
router.post("/add", addFeedback);
router.delete("/delete", deleteFeedback);
router.put("/update", updateContentFeedback);
router.post("/reply", addReplyFeedback);
router.get("/statsByMovie", getStatsByMovie);

// vote
router.post("/vote", voteFeedback);
router.get("/voteList", getVoteList);

export default router;
