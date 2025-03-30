import { Request, Response } from "express";
import {
  handleCreateReportMovie,
  handleGetUserProfile,
  handleUpdateUserPassword,
  handleUpdateUserProfile,
} from "../services/userService";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, typeAccount } = req.query;

    if (!email || !typeAccount) {
      return res.status(400).json({
        status: false,
        message: "Email và typeAccount không được để trống!",
        result: null,
      });
    }

    const response = await handleGetUserProfile({
      email: email as string,
      typeAccount: typeAccount as "credentials" | "google",
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, username, gender, avatar, typeAccount } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message:
          "User id, username, gender, avatar và typeAccount không được để trống!",
        result: null,
      });
    }

    const response = await handleUpdateUserProfile({
      userId,
      username,
      gender,
      avatar,
      typeAccount,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, oldPassword, newPassword, typeAccount } = req.body;

    if (!email || !oldPassword || !newPassword || !typeAccount) {
      return res.status(400).json({
        status: false,
        message:
          "Email, mật khẩu cũ, mật khẩu mới và typeAccount không được để trống!",
        result: null,
      });
    }

    if (typeAccount !== "credentials") {
      return res.status(400).json({
        status: false,
        message: "Chỉ hỗ trợ tài khoản credentials!",
        result: null,
      });
    }

    const response = await handleUpdateUserPassword({
      email,
      newPassword,
      oldPassword,
      typeAccount,
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const createReportMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { movieSlug, userId, title, description, movieName } = req.body;

    if (!movieSlug || !userId || !title || !description || !movieName) {
      return res.status(400).json({
        status: false,
        message:
          "Movie slug, user id, title, description và movieName không được để trống!",
        result: null,
      });
    }

    // Call the service to create a report
    const response = await handleCreateReportMovie({
      movieSlug,
      userId,
      title,
      description,
      movieName
    });

    return res.status(response?.statusCode ?? 200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
}