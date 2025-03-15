import express from "express";
import {
  createSearchHistory,
  deleteAllSearchHistory,
  deleteSearchHistory,
  getUserInfo,
  getUserSearchHistory,
} from "../controllers/userController";

const router = express.Router();

router.get("/info", getUserInfo);

// search history
router.get("/search-history", getUserSearchHistory);
router.post("/search-history", createSearchHistory);
router.delete("/search-history", deleteSearchHistory);
router.delete("/search-history/all", deleteAllSearchHistory);

export default router;
