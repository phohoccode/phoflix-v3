import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

interface GetUserSearchHistory {
  id: string;
  limit: number;
}

export const handleGetUserSearchHistory = async ({
  id,
  limit,
}: GetUserSearchHistory) => {
  try {
    const sqlGetUserSearchHistory = `
      SELECT
        id, keyword, created_at as createdAt
      FROM search_history
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlGetUserSearchHistory, [id, limit]);

    return {
      status: true,
      message: "Lấy lịch sử tìm kiếm thành công!",
      result: rows || [],
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

//  
interface CreateSearchHistory {
  userId: string;
  keyword: string;
}

export const handleCreateSearchHistory = async ({
  userId,
  keyword,
}: CreateSearchHistory) => {
  try {
    const id = uuidv4();
    const today = new Date().toISOString().split("T")[0];
    let sqlCreateOrUpdateSearchHistory = "";

    const sqlSelectSearchHistory = `
      SELECT created_at as createdAt, keyword
      FROM search_history
      WHERE user_id = ? AND keyword = ?
    `;

    const [rowsSelect]: any = await connection
      .promise()
      .query(sqlSelectSearchHistory, [userId, keyword]);

    const searchCreatedAt = rowsSelect?.[0]?.createdAt
      ?.toISOString()
      ?.split("T")[0];

    if (searchCreatedAt === today) {
      sqlCreateOrUpdateSearchHistory = `
        UPDATE search_history
        SET created_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND keyword = ?
      `;

      const [rowsUpdate]: any = await connection
        .promise()
        .query(sqlCreateOrUpdateSearchHistory, [userId, keyword]);

      if (rowsUpdate.affectedRows === 0) {
        return {
          status: false,
          message: "Cập nhật lịch sử tìm kiếm thất bại!",
          result: null,
          statusCode: 400,
        };
      }

      return {
        status: true,
        message: "Cập nhật lịch sử tìm kiếm thành công!",
        result: null,
        statusCode: 200,
      };
    } else {
      sqlCreateOrUpdateSearchHistory = `
        INSERT INTO search_history (id, user_id, keyword)
        VALUES (?, ?, ?)
      `;

      const [rows]: any = await connection
        .promise()
        .query(sqlCreateOrUpdateSearchHistory, [id, userId, keyword]);

      if (rows.affectedRows === 0) {
        return {
          status: false,
          message: "Tạo lịch sử tìm kiếm thất bại!",
          result: null,
          statusCode: 400,
        };
      }

      return {
        status: true,
        message: "Tạo lịch sử tìm kiếm thành công!",
        result: null,
        statusCode: 200,
      };
    }
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

// 
interface DeleteSearchHistory {
  id: string;
  userId: string;
}

export const handleDeleteSearchHistory = async ({
  id,
  userId,
}: DeleteSearchHistory) => {
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
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Xóa lịch sử tìm kiếm thành công!",
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
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Tất cả lịch sử tìm kiếm đã được xóa!",
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
