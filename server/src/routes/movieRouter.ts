import express from "express";
import { addFeedback, getFeedbacks, getReplyList } from "../controllers/feedbackController";

const router = express.Router();

router.get("/feedbacks", getFeedbacks);
router.get("/feedback/reply-list", getReplyList); 
router.post("/feedback", addFeedback);

export default router;