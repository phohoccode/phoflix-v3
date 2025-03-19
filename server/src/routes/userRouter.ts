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
import {
  addMovie,
  checkMovieExists,
  deleteMovie,
  getUserMovies,
} from "../controllers/userMovieController";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../controllers/playlistController";

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
router.post("/movie", addMovie);
router.post("/check-movie", checkMovieExists);
router.delete("/movie", deleteMovie);

// playlist
router.get("/playlists", getPlaylists);
router.post("/playlist", createPlaylist);
router.delete("/playlist", deletePlaylist);
router.put("/playlist", updatePlaylist);

export default router;
