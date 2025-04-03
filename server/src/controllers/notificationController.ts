import { Request, Response } from "express";
import {
  handleCreateNotification,
  handleGetNotifications,
} from "../services/notificationService";

export const getNotifications = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { limit, userId, type, afterTime } = req.query;

    if (!limit || !type) {
      return res.status(400).json({
        status: false,
        message: "Thiếu tham số bắt buộc",
        result: null,
      });
    }

    if (type !== "community" && type !== "individual") {
      return res.status(400).json({
        status: false,
        message: "Tham số type không hợp lệ",
        result: null,
      });
    }

    if (type === "individual" && !userId) {
      return res.status(400).json({
        status: false,
        message: "UserId là tham số bắt buộc khi type là individual",
        result: null,
      });
    }

    const response = await handleGetNotifications({
      limit: parseInt(limit as string),
      type: type as "community" | "individual",
      userId: userId ? (userId as string) : undefined,
      afterTime: afterTime ? parseInt(afterTime as string) : undefined,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: null,
    });
  }
};

export const createNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, senderId, type, content, href, image } = req.body;

    if (!type || !content || !senderId) {
      return res.status(400).json({
        status: false,
        message: "Thiếu tham số bắt buộc",
        result: null,
      });
    }

    if (type !== "community" && type !== "individual") {
      return res.status(400).json({
        status: false,
        message: "Tham số type không hợp lệ",
        result: null,
      });
    }

    if (type === "individual" && (!userId || !senderId)) {
      return res.status(400).json({
        status: false,
        message:
          "userId và senderId là tham số bắt buộc khi type là individual",
        result: null,
      });
    }

    const response = await handleCreateNotification({
      userId: userId ? (userId as string) : null,
      senderId: senderId as string,
      type: type as "community" | "individual",
      content: content as string,
      href: href ? (href as string) : null,
      image: image ? (image as string) : null,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Lỗi server. Vui lòng thử lại sau!",
      result: null,
    });
  }
};
