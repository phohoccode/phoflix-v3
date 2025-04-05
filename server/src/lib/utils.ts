import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
// Khởi tạo client của Google OAuth2
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const getVietnamTime = () => {
  const date = new Date();
  const vietnamOffset = 7 * 60 * 60 * 1000; // GMT+7
  const vietnamTime = new Date(date.getTime() + vietnamOffset);
  return vietnamTime.toISOString().slice(0, 19).replace("T", " ");
};

// Hàm mã hóa (tạo JWT)
export const encryptData = (
  data: Record<string, any>,
  expiresInSeconds: number = 60 * 3 // 5 minutes
): string => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: expiresInSeconds });
};

// Hàm giải mã (giải mã JWT)
export const decryptData = (token: string): any => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Lỗi khi giải mã JWT:", error);
    return null;
  }
};

export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

export const generateHtmlSendMail = ({
  title,
  content,
  conntentLink,
  link,
}: {
  title: string;
  content: string;
  conntentLink: string;
  link: string;
}) => {
  return `
        <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2>${title}</h2>
            <p>${content}</p>
            <a href="${link}" style="
                display: inline-block; 
                padding: 10px 20px; 
                background-color: #13c2c2; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px;
            ">${conntentLink}</a>
        </div>
    `;
};

export const convertStringToObject = (str: string) => {
  if (typeof str !== "string") {
    return str;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Lỗi khi chuyển đổi chuỗi thành đối tượng:", error);
    return str;
  }
};
