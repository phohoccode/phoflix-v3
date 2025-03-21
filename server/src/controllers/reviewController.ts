import { Request, Response } from "express";
import {
  handleAddNewPreview,
  handleGetReviewsByMovie,
} from "../services/reviewService";

export const getReviewsByMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug, page, limit } = req.query;

    if (!movieSlug || !page || !limit) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleGetReviewsByMovie({
      movieSlug: movieSlug as string,
      page: Number(page),
      limit: Number(limit),
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

export const addNewPreview = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug, point, userId, content } = req.body;

    if (!movieSlug || !point || !userId) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleAddNewPreview({
      movieSlug,
      point,
      content,
      userId,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error adding new review",
      result: null,
    });
  }
};
