import connection from "../database/connect";
import {
  CreateNotification,
  GetNotifications,
} from "../lib/types/Notification";
import { v4 as uuidv4 } from "uuid";

export const handleGetNotifications = async ({
  limit,
  type,
  userId,
  afterTime,
}: GetNotifications) => {
  try {
    // 1. Đếm tổng số thông báo
    const countQuery = `
      SELECT COUNT(*) AS total_count
      FROM notification n
      WHERE n.type = ?
      ${userId ? "AND n.user_id = ?" : ""}
      ${afterTime ? "AND UNIX_TIMESTAMP(n.created_at) < ?" : ""}
    `;

    const countParams: any[] = [type];
    if (userId) countParams.push(userId);
    if (afterTime) countParams.push(afterTime);

    const [countResult] = await connection
      .promise()
      .query(countQuery, countParams);

    const total_count = (countResult as any)[0].total_count;

    // 2. Lấy danh sách thông báo
    const notificationQuery = `
      SELECT 
        n.id,
        n.user_id,
        n.content,
        UNIX_TIMESTAMP(n.created_at) AS created_at,
        n.image,
        n.href,
        u.username AS sender_name,
        u.id AS sender_id
      FROM notification n
      LEFT JOIN users u ON n.sender_id = u.id
      WHERE n.type = ?
      ${userId ? "AND n.user_id = ?" : ""}
      ${afterTime ? "AND UNIX_TIMESTAMP(n.created_at) < ?" : ""}
      ORDER BY n.created_at DESC
      LIMIT ?
    `;

    const notificationParams: any[] = [type];
    if (userId) notificationParams.push(userId);
    if (afterTime) notificationParams.push(afterTime);
    notificationParams.push(limit);

    const [notifications]: any = await connection
      .promise()
      .query(notificationQuery, notificationParams);

    return {
      statusCode: 200,
      status: true,
      message: "Thành công!",
      result: {
        has_more: total_count > notifications.length,
        item_count: total_count,
        items: notifications,
        type,
      },
    };
  } catch (error) {
    console.error("Error in handleGetNotifications:", error);
    return {
      statusCode: 500,
      status: false,
      message: "Server error",
      result: null,
    };
  }
};

export const handleCreateNotification = async ({
  userId,
  senderId,
  type,
  content,
  href,
  image,
}: CreateNotification) => {
  try {
    const sqlCheckUserIdExists = `
      SELECT id FROM users WHERE id = ?
    `;

    const sqlCheckSenderIdExists = `
      SELECT id FROM users WHERE id = ?
    `;

    if (type === "individual") {
      const [userIdExists]: any = await connection
        .promise()
        .query(sqlCheckUserIdExists, [userId]);

      const [senderIdExists]: any = await connection
        .promise()
        .query(sqlCheckSenderIdExists, [senderId]);

      if (
        userIdExists?.length === 0 ||
        senderIdExists?.length === 0
      ) {
        return {
          statusCode: 400,
          status: false,
          message: "Người nhận hoặc người gửi không tồn tại",
          result: null,
        };
      }
    }

    if (type === "community") {
      const [senderIdExists]: any = await connection
        .promise()
        .query(sqlCheckSenderIdExists, [senderId]);

      if (senderIdExists?.length === 0) {
        return {
          statusCode: 400,
          status: false,
          message: "Người gửi không tồn tại",
          result: null,
        };
      }
    }

    let sqlInsert = "";

    let params: any[] = [];

    const notificationId = uuidv4();

    if (type === "individual") {
      sqlInsert = `INSERT INTO notification (id, user_id, sender_id, type, content, href, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      params = [notificationId, userId, senderId, type, content, href, image];
    } else if (type === "community") {
      sqlInsert = `INSERT INTO notification (id, sender_id, type, content, href, image) VALUES (?, ?, ?, ?, ?, ?)`;
      params = [notificationId, senderId, type, content, href, image];
    }

    const [result]: any = await connection.promise().query(sqlInsert, params);

    if (result.affectedRows === 0) {
      return {
        statusCode: 400,
        status: false,
        message: "Không thể tạo thông báo",
        result: null,
      };
    }

    return {
      statusCode: 200,
      status: true,
      message: "Tạo thông báo thành công",
      result: null,
    };
  } catch (error) {
    console.error("Error in handleCreateNotification:", error);
    return {
      statusCode: 500,
      status: false,
      message: "Server error",
      result: null,
    };
  }
};
