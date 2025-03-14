import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import validator from "validator";
import { UserLogin, UserRegister } from "../lib/types/auth";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
import { generateToken, getVietnamTime } from "../lib/utils";

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

const salt = bcrypt.genSaltSync(10);

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

    const sqlCheckAccount = `select * from users where email = ? and type_account = ?`;

    const [rows]: any = await connection
      .promise()
      .query(sqlCheckAccount, [email, typeAccount]);

    // check account exist
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

    // check account banned
    if (rows[0].status === "banned") {
      return {
        status: false,
        code: "BANNED_ACCOUNT",
        message: "Tài khoản của bạn đã bị khóa!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Đăng nhập thành công!",
      code: "LOGIN_SUCCESS",
      result: {
        id: rows[0].id,
        email: rows[0].email,
        typeAccount: rows[0].typeAccount,
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

export const handleUserRegister = async ({
  email,
  password,
  typeAccount,
  name,
  avatar,
}: UserRegister) => {
  try {
    // check typeAccount
    if (typeAccount === "credentials") {
      // check valid email
      if (!validator.isEmail(email)) {
        return {
          status: false,
          message: "Email không hợp lệ!",
          result: null,
        };
      }

      // check strong password
      if (!validator.isStrongPassword(password)) {
        return {
          status: false,
          message:
            "Mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
          result: null,
        };
      }
    }

    const sqlCheckEmailExist = `select * from users where email = ? and type_account = ?`;

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

    const userId = uuidv4();

    const hashPassword = bcrypt.hashSync(password, salt);

    const sqlRegisterAccount = `insert into users (id, email, password, type_account, username, avatar) values (?, ?, ?, ?, ?, ?)`;

    const [rowsInsert]: any = await connection
      .promise()
      .query(sqlRegisterAccount, [
        userId,
        email,
        hashPassword,
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

export const handleForgotPassword = async (email: string) => {
  try {
    if (!validator.isEmail(email)) {
      return {
        status: false,
        message: "Email không hợp lệ!",
        result: null,
      };
    }

    const sql_find_user = `select * from users where email = ?`;

    const [rows]: any = await connection
      .promise()
      .query(sql_find_user, [email]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Email không tồn tại trong hệ thống!",
        result: null,
      };
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const resetLink = `${process.env.CORS_ORIGIN}/auth/verify-token?token=${token}`;

    await transporter.sendMail({
      from: `phohoccode <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: "Đặt lại mật khẩu",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Đặt lại mật khẩu của bạn</h2>
        <p>Nhấn vào liên kết dưới đây để đặt lại mật khẩu:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #13c2c2; color: white; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
      </div>
    `,
    });

    const userId = rows[0]?.id;
    const id = uuidv4();

    const sql_insert_token = `insert into password_resets (id, user_id, email, token, expires_at) values (?, ?, ?, ?, ?)`;
    const [rowsInsert]: any = await connection
      .promise()
      .query(sql_insert_token, [id, userId, email, token, expiresAt]);

    if (rowsInsert.affectedRows === 0) {
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }

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

export const handleVerifyToken = async (token: string) => {
  try {
    const sql_find_token = `select * from password_resets where token = ? and expires_at > ?`;
    const currentDate = getVietnamTime();

    const [rows]: any = await connection
      .promise()
      .query(sql_find_token, [token, currentDate]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Token không hợp lệ hoặc đã hết hạn!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Xác thực token thành công!",
      result: {
        email: rows[0]?.email ?? "",
        token: rows[0]?.token ?? token,
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

export const handleResetPassword = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
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

    const sql_find_user = `select * from users where email = ?`;
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

    const sql_delete_token = `delete from password_resets where token = ?`;
    const [rowsDelete]: any = await connection
      .promise()
      .query(sql_delete_token, [token]);

    if (rowsDelete.affectedRows === 0) {
      return {
        status: false,
        message: "Token không hợp lệ hoặc đã hết hạn!",
        result: null,
      };
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    console.log(">>> email", email);

    const sql_update_password = `update users set password = ? where email = ?`;

    const [rowsUpdate]: any = await connection
      .promise()
      .query(sql_update_password, [hashPassword, email]);

    if (rowsUpdate.affectedRows === 0) {
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
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
