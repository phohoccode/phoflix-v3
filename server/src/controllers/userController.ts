import { Request, Response } from "express";
import {
  handleCreateSearchHistory,
  handleDeleteAllSearchHistory,
  handleDeleteSearchHistory,
  handleGetUserInfo,
  handleGetUserSearchHistory,
} from "../services/userService";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, typeAccount } = req.query;

    console.log(req.query);

    if (!email || !typeAccount) {
      return res.status(400).json({
        status: false,
        message: "Email và typeAccount không được để trống!",
        result: null,
      });
    }

    const response = await handleGetUserInfo(
      email as string,
      typeAccount as "credentials" | "google"
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const getUserSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "User id không được để trống!",
        result: null,
      });
    }

    const response = await handleGetUserSearchHistory(id as string);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const createSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, keyword } = req.body;

    if (!userId || !keyword) {
      return res.status(400).json({
        status: false,
        message: "User id và keyword không được để trống!",
        result: null,
      });
    }

    const response = await handleCreateSearchHistory(userId, keyword);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const deleteSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id, userId } = req.query;

    if (!id || !userId) {
      return res.status(400).json({
        status: false,
        message: "Id và user id không được để trống!",
        result: null,
      });
    }

    const response = await handleDeleteSearchHistory(
      id as string,
      userId as string
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const deleteAllSearchHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User id không được để trống!",
        result: null,
      });
    }

    const response = await handleDeleteAllSearchHistory(userId as string);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};
