import express from "express";
import {
  addFeedback,
  addReplyFeedback,
  getFeedbacks,
  getReplyList,
  getStatsByMovie,
} from "../controllers/feedbackController";

const router = express.Router();

router.get("/feedbacks", getFeedbacks);
router.get("/feedback/reply-list", getReplyList);
router.post("/feedback", addFeedback);
router.post("/feedback/reply", addReplyFeedback);
router.get("/statsByMovie", getStatsByMovie);

export default router;
