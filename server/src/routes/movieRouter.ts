import express from "express";
import {
  addFeedback,
  addReplyFeedback,
  deleteFeedback,
  getFeedbacks,
  getReplyList,
  getStatsByMovie,
} from "../controllers/feedbackController";

const router = express.Router();

router.get("/feedbacks", getFeedbacks);
router.get("/feedback/reply-list", getReplyList);
router.post("/feedback", addFeedback);
router.delete("/feedback", deleteFeedback);
router.post("/feedback/reply", addReplyFeedback);
router.get("/statsByMovie", getStatsByMovie);

export default router;
