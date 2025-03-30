import connection from "../database/connect";
import bcrypt from "bcrypt";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import {
  CreateReportMovie,
  GetUserProfile,
  UpdateUserPassword,
  UpdateUserProfile,
} from "../lib/types/User";

const salt = bcrypt.genSaltSync(10);

export const handleGetUserProfile = async ({
  email,
  typeAccount,
}: GetUserProfile) => {
  try {
    const sqlGetUserInfo = `
      SELECT
        id, email, type_account, username, avatar, created_at, role, gender  
      FROM users 
      WHERE email = ? AND type_account = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlGetUserInfo, [email, typeAccount]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    return {
      status: true,
      message: "Lấy thông tin người dùng thành công!",
      result: {
        id: rows[0]?.id,
        email: rows[0]?.email,
        typeAccount: rows[0]?.["type_account"],
        username: rows[0]?.username,
        avatar: rows[0]?.avatar,
        createdAt: rows[0]?.created_at,
        role: rows[0]?.role,
        gender: rows[0]?.gender,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      statusCode: 500,
    };
  }
};

// ========================= UPDATE USER PROFILE =========================

export const handleUpdateUserProfile = async ({
  userId,
  username,
  avatar,
  gender,
  typeAccount,
}: UpdateUserProfile) => {
  try {
    const sqlCheckUser = `
      SELECT id
      FROM users
      WHERE id = ? and type_account = ?
    `;

    const [rowsCheckUser]: any = await connection
      .promise()
      .query(sqlCheckUser, [userId, typeAccount]);

    if ((rowsCheckUser as any)?.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    const sqlUpdateUserProfile = `
      UPDATE users
      SET username = ?, gender = ?, avatar = ?
      WHERE id = ? and type_account = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlUpdateUserProfile, [
        username,
        gender,
        avatar,
        userId,
        typeAccount,
      ]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Cập nhật thông tin thất bại!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Cập nhật thông tin thành công!",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      statusCode: 500,
    };
  }
};

// ========================= UPDATE USER PASSWORD =========================

export const handleUpdateUserPassword = async ({
  email,
  oldPassword,
  newPassword,
  typeAccount,
}: UpdateUserPassword) => {
  try {
    if (!validator.isStrongPassword(newPassword)) {
      return {
        status: false,
        message:
          "Mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
        result: null,
        statusCode: 400,
      };
    }

    const sqlCheckUser = `
      SELECT password
      FROM users
      WHERE email = ? and type_account = ?
    `;

    const [rowsUsers]: any = await connection
      .promise()
      .query(sqlCheckUser, [email, typeAccount]);

    const isCorrectPassword = bcrypt.compareSync(
      oldPassword,
      rowsUsers[0]?.password ?? ""
    );

    if (!isCorrectPassword) {
      return {
        status: false,
        message: "Mật khẩu cũ không chính xác!",
        result: null,
        statusCode: 400,
      };
    }

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    const sqlUpdateUserPassword = `
      UPDATE users
      SET password = ?
      WHERE email = ? and type_account = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlUpdateUserPassword, [hashPassword, email, typeAccount]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Cập nhật mật khẩu thất bại!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Cập nhật mật khẩu thành công!",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      statusCode: 500,
    };
  }
};

// ========================= CREATE REPORT MOVIE =========================
export const handleCreateReportMovie = async ({
  userId,
  movieSlug,
  description,
  title,
  movieName,
}: CreateReportMovie) => {
  try {
    const sqlCheckUser = `
      SELECT id
      FROM users
      WHERE id = ?
    `;

    const [rowsCheckUser]: any = await connection
      .promise()
      .query(sqlCheckUser, [userId]);

    if ((rowsCheckUser as any)?.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    const reportId = uuidv4();

    const sqlCreateReportMovie = `
      INSERT INTO user_report (id, user_id, movie_slug, description, title, movie_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlCreateReportMovie, [
        reportId,
        userId,
        movieSlug,
        description,
        title,
        movieName,
      ]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Tạo báo cáo thất bại!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Tạo báo cáo thành công!",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
      statusCode: 500,
    };
  }
};
