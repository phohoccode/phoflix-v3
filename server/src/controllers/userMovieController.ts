import { Response, Request } from "express";
import {
  handleAddMovie,
  handleCheckMovieExists,
  handleDeleteMovie,
  handleGetUserMovies,
} from "../services/userMovieService";

export const getUserMovies = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, type, page, limit } = req.query;

    if (!userId || !type || !page || !limit) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "history" && type !== "favorite" && type !== "playlist") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleGetUserMovies({
      userId: userId as string,
      type: type as string,
      limit: parseInt(limit as string),
      page: parseInt(page as string),
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching user movies",
      result: null,
    });
  }
};

// ===================== ADD MOVIE =====================

export const addMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, movieData, type, playlistId } = req.body;

    if (!userId || !movieData || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "history" && type !== "favorite" && type !== "playlist") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    if (type === "playlist" && !playlistId) {
      return res.status(400).json({
        status: false,
        message: "Missing playlistId parameter because type is playlist",
        result: null,
      });
    }

    const response = await handleAddMovie({
      userId,
      movieData,
      type,
      playlistId: type === "playlist" ? playlistId : null,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating user movie",
      result: null,
    });
  }
};

// ===================== CHECK MOVIE EXISTS =====================

export const checkMovieExists = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, movieSlug, type } = req.body;

    if (!userId || !movieSlug || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "history" && type !== "favorite" && type !== "playlist") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleCheckMovieExists({
      userId,
      movieSlug,
      type,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error checking movie exists",
      result: null,
    });
  }
};

// ===================== DELETE MOVIE =====================
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, movieSlug, type } = req.query;

    if (!userId || !movieSlug || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "history" && type !== "favorite" && type !== "playlist") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleDeleteMovie({
      userId: userId as string,
      movieSlug: movieSlug as string,
      type,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting movie",
      result: null,
    });
  }
};
