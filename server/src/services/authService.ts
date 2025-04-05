import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { decryptData, encryptData, generateHtmlSendMail } from "../lib/utils";

dotenv.config();

// Cấu hình transporter gửi email bằng nodemailer (SMTP Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const salt = bcrypt.genSaltSync(10);

// ==============================
// Interface: UserLogin
// ==============================

interface UserLogin {
  email: string;
  password: string;
  typeAccount: string;
}

// ==============================
// Hàm: handleUserLogin
// Mô tả: Đăng nhập người dùng bằng email, mật khẩu và loại tài khoản
// ==============================

export const handleUserLogin = async ({
  email,
  password,
  typeAccount,
}: UserLogin) => {
  try {
    if (!validator.isEmail(email)) {
      return {
        status: false,
        message: "Email không hợp lệ!",
        result: null,
      };
    }

    const sqlCheckAccount = `
      SELECT * FROM users 
      WHERE email = ? AND type_account = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlCheckAccount, [email, typeAccount]);

    // Kiểm tra mật khẩu có khớp không
    const isCorrectPassword = bcrypt.compareSync(
      password,
      rows[0]?.password ?? ""
    );

    if ((rows as any)?.length === 0 || !isCorrectPassword) {
      return {
        status: false,
        code: "INVALID_CREDENTIALS",
        message: "Thông tin đăng nhập không chính xác!",
        result: null,
      };
    }

    // Kiểm tra tài khoản bị khóa
    if (rows[0].status === "banned") {
      return {
        status: false,
        code: "BANNED_ACCOUNT",
        message: "Tài khoản của bạn đã bị khóa!",
        result: null,
      };
    }

    // Tạo accessToken (JWT-like)
    const expiresAccess = 60 * 60 * 24; // 1 ngày
    const dataAccessToken = {
      userId: rows[0]?.id,
      role: rows[0]?.role,
    };
    const accessToken = encryptData(dataAccessToken, expiresAccess);

    return {
      status: true,
      message: "Đăng nhập thành công!",
      code: "LOGIN_SUCCESS",
      result: {
        id: rows[0]?.id,
        email: rows[0]?.email,
        typeAccount: rows[0]?.type_account,
        accessToken,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      code: "SERVER_ERROR",
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ==============================
// Interface: CompleteRegistration
// ==============================

interface CompleteRegistration {
  email: string;
  password: string | null;
  typeAccount: string;
  name: string;
  avatar: string;
}

// ==============================
// Hàm: handleCompleteRegistration
// Mô tả: Hoàn tất đăng ký tài khoản (thường dùng sau xác thực email hoặc với Google)
// ==============================

export const handleCompleteRegistration = async ({
  email,
  password,
  typeAccount,
  name,
  avatar,
}: CompleteRegistration) => {
  try {
    const userId = uuidv4();
    const hashPassword = password && bcrypt.hashSync(password, salt);

    const sqlRegisterAccount = `
      INSERT INTO users 
        (id, email, password, type_account, username, avatar) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [rowsInsert]: any = await connection
      .promise()
      .query(sqlRegisterAccount, [
        userId,
        email,
        hashPassword ?? null,
        typeAccount,
        name,
        avatar,
      ]);

    if (rowsInsert.affectedRows === 0) {
      return {
        status: false,
        message: "Đăng ký tài khoản thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Đăng ký tài khoản thành công!",
      result: {
        id: userId,
        email,
        typeAccount,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ==============================
// Interface: UserRegister
// ==============================

interface UserRegister {
  email: string;
  name: string;
  password: string;
  typeAccount: "credentials" | "google";
  avatar: string;
}

// ==============================
// Hàm: handleUserRegister
// Mô tả: Đăng ký tài khoản mới. Nếu là "credentials" thì gửi email xác nhận.
// Nếu là "google" thì đăng ký trực tiếp.
// ==============================

export const handleUserRegister = async ({
  email,
  password,
  typeAccount,
  name,
  avatar,
}: UserRegister) => {
  try {
    if (typeAccount === "credentials") {
      if (!validator.isEmail(email)) {
        return {
          status: false,
          message: "Email không hợp lệ!",
          result: null,
        };
      }

      if (!validator.isStrongPassword(password)) {
        return {
          status: false,
          message:
            "Mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
          result: null,
        };
      }
    }

    const sqlCheckEmailExist = `SELECT * FROM users WHERE email = ? AND type_account = ?`;

    const [rows]: any = await connection
      .promise()
      .query(sqlCheckEmailExist, [email, typeAccount]);

    if ((rows as any)?.length > 0) {
      return {
        status: false,
        message: "Email đã đăng ký bởi tài khoản khác!",
        result: null,
      };
    }

    if (typeAccount === "google") {
      return handleCompleteRegistration({
        email,
        password,
        typeAccount,
        name,
        avatar,
      });
    } else if (typeAccount === "credentials") {
      const expiresInSeconds = 60; // 1 phút
      const data = { email, password, name, avatar, typeAccount };
      const token = encryptData(data, expiresInSeconds);
      const link = `${process.env.CLIENT_URL}/auth/verify-token?action=register&token=${token}`;

      const html = generateHtmlSendMail({
        title: "Hoàn tất đăng ký tài khoản",
        content: `Nhấn vào liên kết dưới đây để hoàn tất đăng ký tài khoản. Liên kết sẽ hết hạn sau ${expiresInSeconds} giây.`,
        conntentLink: "Hoàn tất đăng ký",
        link,
      });

      await transporter.sendMail({
        from: `phohoccode <${process.env.GOOGLE_APP_EMAIL}>`,
        to: email,
        subject: "Hoàn tất đăng ký tài khoản",
        html,
      });

      return {
        status: true,
        message: "Vui lòng kiểm tra email hoàn tất đăng ký tài khoản!",
        result: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ==============================
// Hàm: handleForgotPassword
// Mô tả: Gửi email đặt lại mật khẩu
// ==============================

export const handleForgotPassword = async (
  email: string,
  typeAccount: "credentials"
) => {
  try {
    if (!validator.isEmail(email)) {
      return {
        status: false,
        message: "Email không hợp lệ!",
        result: null,
      };
    }

    const sql_find_user = `SELECT * FROM users WHERE email = ? AND type_account = ?`;

    const [rows]: any = await connection
      .promise()
      .query(sql_find_user, [email, typeAccount]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Email không tồn tại trong hệ thống!",
        result: null,
      };
    }

    const expiresInSeconds = 60; // 1 phút
    const token = encryptData({ email }, expiresInSeconds);
    const link = `${process.env.CLIENT_URL}/auth/verify-token?action=reset-password&token=${token}`;

    const html = generateHtmlSendMail({
      title: "Đặt lại mật khẩu",
      content: `Nhấn vào liên kết dưới đây để đặt lại mật khẩu. Liên kết sẽ hết hạn sau ${expiresInSeconds} giây.`,
      conntentLink: "Đặt lại mật khẩu",
      link,
    });

    await transporter.sendMail({
      from: `phohoccode <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: "Đặt lại mật khẩu",
      html,
    });

    return {
      status: true,
      message: "Vui lòng kiểm tra email để đặt lại mật khẩu!",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ==============================
// Hàm: handleVerifyToken
// Mô tả: Xác minh token từ email (đăng ký / đặt lại mật khẩu)
// ==============================

export const handleVerifyToken = async (token: string) => {
  try {
    const decoded = decryptData(token);

    if (!decoded) {
      return {
        status: false,
        message: "Token không hợp lệ hoặc đã hết hạn!",
        result: null,
      };
    }

    const { email, action } = decoded;

    return {
      status: true,
      message: "Xác thực token thành công!",
      result: {
        email,
        token,
        action,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ==============================
// Hàm: handleResetPassword
// Mô tả: Đặt lại mật khẩu sau khi xác thực qua token
// ==============================

export const handleResetPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    if (!validator.isStrongPassword(password)) {
      return {
        status: false,
        message:
          "Mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
        result: null,
      };
    }

    const sql_find_user = `SELECT * FROM users WHERE email = ?`;

    const [rowsSelect]: any = await connection
      .promise()
      .query(sql_find_user, [email]);

    if ((rowsSelect as any)?.length === 0) {
      return {
        status: false,
        message: "Email không tồn tại trong hệ thống!",
        result: null,
      };
    }

    const hashPassword = bcrypt.hashSync(password, salt);
    const sql_update_password = `UPDATE users SET password = ? WHERE email = ?`;

    const [rowsUpdate]: any = await connection
      .promise()
      .query(sql_update_password, [hashPassword, email]);

    if (rowsUpdate.affectedRows === 0) {
      return {
        status: false,
        message: "Đặt lại mật khẩu thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Đặt lại mật khẩu thành công!",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
