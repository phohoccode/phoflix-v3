import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

export const handleGetUserInfo = async (
  email: string,
  typeAccount: "credentials" | "google"
) => {
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

export const handleGetUserSearchHistory = async (
  id: string,
  limit: number = 20
) => {
  try {
    const sqlGetUserSearchHistory = `
      SELECT
        id, keyword, created_at
      FROM search_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlGetUserSearchHistory, [id, limit]);

    if ((rows as any)?.length === 0) {
      return {
        status: false,
        message: "Lịch sử tìm kiếm trống!",
        result: [],
      };
    }

    return {
      status: true,
      message: "Lấy lịch sử tìm kiếm thành công!",
      result: rows,
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

export const handleCreateSearchHistory = async (
  userId: string,
  keyword: string
) => {
  try {
    const id = uuidv4();

    const sqlCreateSearchHistory = `
      INSERT INTO search_history (id, user_id, keyword)
      VALUES (?, ?, ?)
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlCreateSearchHistory, [id, userId, keyword]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Tạo lịch sử tìm kiếm thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Tạo lịch sử tìm kiếm thành công!",
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

export const handleDeleteSearchHistory = async (id: string, userId: string) => {
  try {
    const sqlDeleteSearchHistory = `
      DELETE FROM search_history
      WHERE id = ? AND user_id = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlDeleteSearchHistory, [id, userId]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Xóa lịch sử tìm kiếm thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Xóa lịch sử tìm kiếm thành công!",
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

export const handleDeleteAllSearchHistory = async (userId: string) => {
  try {
    const sqlDeleteAllSearchHistory = `
      DELETE FROM search_history
      WHERE user_id = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlDeleteAllSearchHistory, [userId]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Xóa lịch sử tìm kiếm thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Tất cả lịch sử tìm kiếm đã được xóa!",
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
