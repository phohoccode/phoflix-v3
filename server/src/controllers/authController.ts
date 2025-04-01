import { Request, Response } from "express";
import {
  handleCompleteRegistration,
  handleForgotPassword,
  handleResetPassword,
  handleUserLogin,
  handleUserRegister,
  handleVerifyToken,
} from "../services/authService";
import dotenv from "dotenv";
import { decryptData } from "../lib/utils";

dotenv.config();

export const userLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, typeAccount } = req.body;

    if (!email || !password || !typeAccount) {
      return res.status(400).json({
        status: false,
        message: "Email, password và typeAccount không được để trống!",
        result: null,
      });
    }

    if (typeAccount !== "credentials" && typeAccount !== "google") {
      return res.status(400).json({
        status: false,
        message: "Loại tài khoản không hợp lệ!",
        result: null,
      });
    }

    const response = await handleUserLogin({
      email,
      password,
      typeAccount,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      code: "SERVER_ERROR",
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    });
  }
};

export const userRegister = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, typeAccount, name, avatar } = req.body;

    if (!email || !typeAccount || !name || !avatar) {
      return res.status(400).json({
        status: false,
        message:
          "Email, typeAccount, name và avatar không được để trống!",
        result: null,
      });
    }

    if (typeAccount === "credentials" && !password) {
      return res.status(400).json({
        status: false,
        message: "Password không được để trống!",
        result: null,
      });
    }

    if (typeAccount !== "credentials" && typeAccount !== "google") {
      return res.status(400).json({
        status: false,
        message: "Loại tài khoản không hợp lệ!",
        result: null,
      });
    }

    const response = await handleUserRegister({
      email,
      password,
      typeAccount,
      name,
      avatar,
    });

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

export const completeRegistration = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.query.token as string;

    const data = decryptData(token);

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Token không hợp lệ!",
        result: null,
      });
    }

    const { email, password, name, avatar, typeAccount } = data;

    const response = await handleCompleteRegistration({
      email,
      password,
      typeAccount,
      name,
      avatar,
    });

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

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, typeAccount } = req.body;

    if (!email || !typeAccount) {
      return res.status(400).json({
        status: false,
        message: "Email và typeAccount không được để trống!",
        result: null,
      });
    }

    if (typeAccount !== "credentials") {
      return res.status(400).json({
        status: false,
        message: "Loại tài khoản không hợp lệ!",
        result: null,
      });
    }

    const response = await handleForgotPassword(email, typeAccount);

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

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Token không được để trống!",
        result: null,
      });
    }

    const response = await handleVerifyToken(token as string);

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

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email, password và token không được để trống!",
        result: null,
      });
    }

    const response = await handleResetPassword({
      email,
      password,
    });

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
