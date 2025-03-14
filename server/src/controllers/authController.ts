import { Request, Response } from "express";
import {
  handleForgotPassword,
  handleResetPassword,
  handleUserLogin,
  handleUserRegister,
  handleVerifyToken,
} from "../services/authService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

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

    if (!email || !password || !typeAccount || !name || !avatar) {
      return res.status(400).json({
        status: false,
        message:
          "Email, password, typeAccount, name và avatar không được để trống!",
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

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email không được để trống!",
        result: null,
      });
    }

    const response = await handleForgotPassword(email);

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
    const token = req.query.token;

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
    const { email, password, token } = req.body;

    if (!email || !password || !token) {
      return res.status(400).json({
        status: false,
        message: "Email, password và token không được để trống!",
        result: null,
      });
    }

    const response = await handleResetPassword({
      email,
      password,
      token,
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
