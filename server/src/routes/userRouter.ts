import express from "express";
import {
  getUserProfile,
  resetPassword,
  updateUserProfile,
} from "../controllers/userController";
import {
  createSearchHistory,
  deleteAllSearchHistory,
  deleteSearchHistory,
  getUserSearchHistory,
} from "../controllers/searchHistoryController";
import { createUserMovie, getUserMovies } from "../controllers/userMovieController";

const router = express.Router();

// users
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.put("/reset-password", resetPassword);

// search history
router.get("/search-history", getUserSearchHistory);
router.post("/search-history", createSearchHistory);
router.delete("/search-history", deleteSearchHistory);
router.delete("/search-history/all", deleteAllSearchHistory);

// user movies
router.get("/movies", getUserMovies);
router.post("/movie", createUserMovie);


export default router;
