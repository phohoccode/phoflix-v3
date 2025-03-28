import { Request, Response } from "express";
import {
  createFeedbackVote,
  handleAddFeedback,
  handleAddReplyFeedback,
  handleDeleteFeedback,
  handleGetFeedbacks,
  handleGetReplyListFeedbacks,
  handleGetStatsByMovie,
  handleGetVoteList,
  handleUpdateFeedbackContent,
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
        message: "Thiếu tham số bắt buộc.",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Tham số type không hợp lệ.",
        result: null,
      });
    }

    const response = await handleGetFeedbacks({
      movieSlug: movieSlug as string,
      limit: parseInt(limit as string),
      type: type as "review" | "comment",
      afterTime: afterTime ? parseInt(afterTime as string) : undefined,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi khi lấy danh sách phản hồi.",
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
        message: "Thiếu tham số bắt buộc.",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Tham số loại không hợp lệ.",
        result: null,
      });
    }

    const response = await handleGetReplyListFeedbacks({
      parentId: parentId as string,
      limit: parseInt(limit as string),
      type: type as "review" | "comment",
      afterTime: afterTime ? parseInt(afterTime as string) : undefined,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi khi lấy danh sách phản hồi.",
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
        message: "Thiếu tham số bắt buộc.",
        result: null,
      });
    }

    if (type !== "review" && type !== "comment") {
      return res.status(400).json({
        status: false,
        message: "Tham số loại không hợp lệ.",
        result: null,
      });
    }

    if (type === "review" && !point) {
      return res.status(400).json({
        status: false,
        message: "Thiếu tham số point số khi loại là đánh giá",
        result: null,
      });
    }

    if (type === "comment" && !content) {
      return res.status(400).json({
        status: false,
        message: "Thiếu tham số content khi loại là bình luận",
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

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi khi thêm phản hồi",
      result: null,
    });
  }
};

// ===================== EDIT FEEDBACK =====================
export const updateContentFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { feedbackId, content, userId } = req.body;

    if (!feedbackId || !content || !userId) {
      return res.status(400).json({
        status: false,
        message: "Thiếu tham số bắt buộc.",
        result: null,
      });
    }

    const response = await handleUpdateFeedbackContent({
      feedbackId,
      content,
      userId,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error editing feedback",
      result: null,
    });
  }
};

// ========================= DELETE FEEDBACK =====================
export const deleteFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { feedbackId, userId } = req.query;

    if (!feedbackId || !userId) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleDeleteFeedback({
      feedbackId: feedbackId as string,
      userId: userId as string,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting feedback",
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

    return res.status(response?.statusCode ?? 200).json(response);
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

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching user movies",
      result: null,
    });
  }
};

// ===================== VOTE =====================
export const voteFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, feedbackId, voteType, movieSlug } = req.body;

    if (!userId || !feedbackId || !voteType || !movieSlug) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    if (voteType !== "like" && voteType !== "dislike") {
      return res.status(400).json({
        status: false,
        message: "Invalid vote type",
        result: null,
      });
    }

    const response = await createFeedbackVote({
      userId,
      feedbackId,
      voteType,
      movieSlug,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error voting feedback",
      result: null,
    });
  }
};

// ===================== VOTE LIST =====================
export const getVoteList = async (
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

    const response = await handleGetVoteList(movieSlug as string);

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching user movies",
      result: null,
    });
  }
};
