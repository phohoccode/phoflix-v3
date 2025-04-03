import express from "express";
import {
  createNotification,
  getNotifications,
} from "../controllers/notificationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/list", getNotifications);
router.post("/create", authMiddleware, createNotification);

export default router;
