import { Request, Response, NextFunction } from "express";
import { decryptData, verifyGoogleToken } from "../lib/utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message:
        "Quyền truy cập bị từ chối. Vui lòng kiểm tra token xác thực của bạn.",
      result: null,
    });
  }

  try {
    let decoded = null;

    // giải mã bằng jwt
    decoded = decryptData(token);

    if (!decoded) {
      // giải mã bằng google token
      decoded = await verifyGoogleToken(token);

      if (!decoded) throw new Error();
    }

    console.log("Xác thực token thành công!");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: "Token không hợp lệ hoặc đã hết hạn!",
      result: null,
    });
  }
};
