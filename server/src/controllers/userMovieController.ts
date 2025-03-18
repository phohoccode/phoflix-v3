import { Response, Request } from "express";
import {
  handleCreateUserMovie,
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

export const createUserMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    const response = await handleCreateUserMovie({
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
