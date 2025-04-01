import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import validator from "validator";
import { UserLogin, UserRegister } from "../lib/types/Auth";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { decryptData, encryptData, generateHtmlSendMail } from "../lib/utils";

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

    const sqlCheckAccount = `
      select * 
      from users 
      where email = ? and type_account = ?
    `;

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

    const expiresAccess = 60 * 60 * 24; // 1 day

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

export const handleCompleteRegistration = async ({
  email,
  password,
  typeAccount,
  name,
  avatar,
}: {
  email: string;
  password: string | null;
  typeAccount: string;
  name: string;
  avatar: string;
}) => {
  try {
    const userId = uuidv4();

    const hashPassword = password && bcrypt.hashSync(password, salt);

    const sqlRegisterAccount = `
      INSERT INTO users 
        (id, email, password, type_account, username, avatar) 
        values (?, ?, ?, ?, ?, ?)`;

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

    // nếu là tài khoản google thì hoàn tất đăng ký
    // ngược lại thì gửi email xác nhận đăng ký
    if (typeAccount === "google") {
      return handleCompleteRegistration({
        email,
        password,
        typeAccount,
        name,
        avatar,
      });
    } else if (typeAccount === "credentials") {
      const expiresInSeconds = 60; // 1 minutes
      const data = { email, password, name, avatar, typeAccount };
      const token = encryptData(data, expiresInSeconds);
      const link = `${process.env.CLIENT_URL}/auth/verify-token?action=register&token=${token}`;
      const html = generateHtmlSendMail({
        title: "Hoàn tất đăng ký tài khoản",
        content: `Nhấn vào liên kết dưới đây để hoàn tất đăng ký tài khoản. Lưu ý rằng liên kết này sẽ hết hạn sau ${expiresInSeconds} giây.`,
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

    const sql_find_user = `select * from users where email = ? and type_account = ?`;

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

    const expiresInSeconds = 60; // 1 minutes
    const token = encryptData({ email }, expiresInSeconds);
    const link = `${process.env.CLIENT_URL}/auth/verify-token?action=reset-password&token=${token}`;
    const html = generateHtmlSendMail({
      title: "Đặt lại mật khẩu",
      content: `Nhấn vào liên kết dưới đây để đặt lại mật khẩu. Lưu ý rằng liên kết này sẽ hết hạn sau ${expiresInSeconds} giây.`,
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

    const hashPassword = bcrypt.hashSync(password, salt);

    const sql_update_password = `update users set password = ? where email = ?`;

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
