import { Request, Response } from "express";
import {
  handleAddFeedback,
  handleAddReplyFeedback,
  handleGetFeedbacks,
  handleGetReplyListFeedbacks,
  handleGetStatsByMovie,
} from "../services/feedbackService";

export const getFeedbacks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug, limit, type, afterTime } = req.query;

    if (!movieSlug || !limit || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleGetFeedbacks({
      movieSlug: movieSlug as string,
      limit: parseInt(limit as string),
      type: type as "review" | "comment",
      afterTime: afterTime ? parseInt(afterTime as string) : undefined,
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

// ===================== GET REPLY LIST =====================

export const getReplyList = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { parentId, afterTime, limit, type } = req.query;

    if (!parentId || !limit || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleGetReplyListFeedbacks({
      parentId: parentId as string,
      limit: parseInt(limit as string),
      type: type as "review" | "comment",
      afterTime: afterTime ? parseInt(afterTime as string) : undefined,
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

// ===================== ADD NEW FEEDBACK =====================

export const addFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug, userId, content, type, point } = req.body;

    if (!movieSlug || !userId || !type) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    if (type === "review" && !point) {
      return res.status(400).json({
        status: false,
        message: "Missing point parameters why type is review",
        result: null,
      });
    }

    if (type === "comment" && !content) {
      return res.status(400).json({
        status: false,
        message: "Missing content parameters why type is comment",
        result: null,
      });
    }

    const response = await handleAddFeedback({
      movieSlug,
      point,
      content,
      userId,
      type,
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

// ===================== ADD NEW REPLY =====================
export const addReplyFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { parentId, userId, content, type, movieSlug } = req.body;

    if (!parentId || !userId || !content || !type || !movieSlug) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Invalid type parameter",
        result: null,
      });
    }

    const response = await handleAddReplyFeedback({
      movieSlug,
      parentId,
      content,
      userId,
      type,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error adding new reply",
      result: null,
    });
  }
};

export const getStatsByMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug } = req.query;

    if (!movieSlug) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleGetStatsByMovie(movieSlug as string);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching user movies",
      result: null,
    });
  }
};
