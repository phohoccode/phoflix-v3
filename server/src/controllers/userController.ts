import { Request, Response } from "express";
import { handleGetUserInfo } from "../services/userService";

export const getUserInfo = async (req: Request, res: Response):Promise<any> => {
  try {
    const { email, typeAccount } = req.query;

    console.log(req.query)

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
