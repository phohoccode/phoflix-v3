import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

interface GetFeedbacks {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime?: number;
}

export const handleGetFeedbacks = async ({
  movieSlug,
  type,
  limit,
  afterTime,
}: GetFeedbacks) => {
  try {
    const conditionQuery = afterTime
      ? `AND UNIX_TIMESTAMP(f.created_at) < ?`
      : ``;

    const params = afterTime
      ? [movieSlug, type, afterTime, Number(limit)]
      : [movieSlug, type, Number(limit)];

    // Lấy tổng số bản ghi thỏa mãn điều kiện
    const [countResult] = await connection.promise().query(
      `SELECT COUNT(*) AS total_count
             FROM feedbacks f
             WHERE movie_slug = ? AND type = ? ${conditionQuery}`,
      params.slice(0, -1) // Không truyền limit vào đây
    );

  
    const total_count = (countResult as any)[0].total_count;

    // Truy vấn lấy danh sách feedbacks theo afterTime
    const [feedbacks]: any = await connection.promise().query(
      `SELECT 
          f.id AS _id,
          f.parent_id,
          JSON_OBJECT(
            '_id', u.id,
            'name', u.username,
            'role', u.role,
            'gender', u.gender,
            'avatar', u.avatar
          ) AS author,
            f.content,
            UNIX_TIMESTAMP(f.created_at) AS created_at,
            f.is_spam,
            NULL AS mention_id,
            NULL AS mention_user,
            f.movie_slug,
            CASE WHEN f.type = 'review' THEN f.id ELSE NULL END AS reviews_id,
            CASE WHEN f.type = 'review' THEN JSON_OBJECT('point', f.point) ELSE NULL END AS reviews,
            (SELECT COUNT(*) FROM feedbacks AS c WHERE c.parent_id = f.id) AS total_children,
            (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
            (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'like') AS total_like
          FROM 
              feedbacks AS f
          JOIN 
              users AS u ON f.user_id = u.id
          WHERE 
              f.movie_slug = ? AND f.type = ? ${conditionQuery}
          ORDER BY f.created_at DESC
          LIMIT ?`,
      params
    );

    const finalFeedbacks = feedbacks.map((feedback: any) => ({
      ...feedback,
      author: JSON.parse(feedback.author),
    }));

    return {
      status: true,
      msg: "Thành công.",
      result: {
        has_more: total_count > finalFeedbacks.length,
        item_count: total_count,
        items: finalFeedbacks,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error fetching feedbacks",
      result: null,
    };
  }
};

// ===================== GET REPLY LIST FEEDBACKS =====================
interface GetReplyListFeedbacks {
  parentId: string;
  afterTime?: number;
  limit: number;
  type: "review" | "comment";
}

export const handleGetReplyListFeedbacks = async ({
  parentId,
  afterTime,
  limit,
  type,
}: GetReplyListFeedbacks) => {
  try {
    const conditionQuery = afterTime
      ? `AND UNIX_TIMESTAMP(f.created_at) < ?`
      : ``;

    const params = afterTime
      ? [parentId, type, afterTime, Number(limit)]
      : [parentId, type, Number(limit)];

    // Lấy tổng số bản ghi thỏa mãn
    const [countResult] = await connection.promise().query(
      `SELECT COUNT(*) AS total_count
       FROM feedbacks f
       WHERE parent_id = ? AND type = ? ${conditionQuery}`,
      params.slice(0, -1) // Không truyền limit vào đây
    );

    const total_count = (countResult as any)[0].total_count;

    // Truy vấn lấy danh sách feedbacks theo afterTime
    const [feedbacks]: any = await connection.promise().query(
      `SELECT 
          f.id AS _id,
          f.parent_id,
          JSON_OBJECT(
              '_id', u.id,
              'name', u.username,
              'role', u.role,
              'gender', u.gender,
              'avatar', u.avatar
          ) AS author,
          f.content,
          UNIX_TIMESTAMP(f.created_at) AS created_at,
          f.is_spam,
          p.id AS mention_id,
          JSON_OBJECT(
              '_id', pu.id,
              'name', pu.username
          ) AS mention_user,
          f.movie_slug,
          CASE WHEN f.type = 'review' THEN f.id ELSE NULL END AS reviews_id,
          CASE WHEN f.type = 'review' THEN JSON_OBJECT('point', f.point) ELSE NULL END AS reviews,
          (SELECT COUNT(*) FROM feedbacks AS c WHERE c.parent_id = f.id) AS total_children,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'like') AS total_like
      FROM 
          feedbacks AS f
      JOIN 
          users AS u ON f.user_id = u.id
      LEFT JOIN 
          feedbacks AS p ON f.parent_id = p.id
      LEFT JOIN 
          users AS pu ON p.user_id = pu.id
      WHERE 
          f.parent_id = ? AND f.type = ? ${conditionQuery}
      ORDER BY f.created_at DESC
      LIMIT ?`,
      params
    );

    const finalReplyFeedback = feedbacks.map((feedback: any) => ({
      ...feedback,
      author: JSON.parse(feedback.author),
      mention_user: feedback.mention_user
        ? JSON.parse(feedback.mention_user)
        : null,
    }));

    return {
      status: true,
      msg: "Thành công.",
      result: {
        has_more: total_count > finalReplyFeedback.length,
        item_count: total_count,
        items: finalReplyFeedback,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error fetching reply list feedbacks",
      result: null,
    };
  }
};


// ==================== ADD NEW FEEDBACK ====================
interface AddFeedback {
  movieSlug: string;
  userId: string;
  type: "review" | "comment";
  content?: string;
  point?: number;
}

export const handleAddFeedback = async ({
  movieSlug,
  point,
  content,
  userId,
  type,
}: AddFeedback) => {
  try {
    const sqlCheckUserExists = `
        SELECT id
        FROM users
        WHERE id = ?;
    `;

    const [rowsCheckUser]: any = await connection
      .promise()
      .query(sqlCheckUserExists, [userId]);

    if (rowsCheckUser.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại",
        result: null,
      };
    }

    if (type === "review") {
      return addReview({
        movieSlug,
        userId,
        content,
        point,
        type: "review",
      });
    } else if (type === "comment") {
      return addComment({
        movieSlug,
        userId,
        content,
        type: "comment",
      });
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error adding new review",
      result: null,
    };
  }
};

const addReview = async ({
  movieSlug,
  userId,
  content,
  point,
  type,
}: AddFeedback) => {
  try {
    if (!Number(point)) {
      return {
        status: false,
        message: "Point must be a number",
        result: null,
      };
    }

    if (Number(point) < 0 || Number(point) > 10) {
      return {
        status: false,
        message: "Point must be between 0 and 10",
        result: null,
      };
    }

    const checkReviewExists = `
        SELECT id
        FROM feedbacks
        WHERE movie_slug = ? AND user_id = ? AND type = ?;
    `;

    const [rowsCheck]: any = await connection
      .promise()
      .query(checkReviewExists, [movieSlug, userId, type]);

    let sqlInsertOrUpdateReview = "";
    const isExists = rowsCheck.length > 0;

    if (isExists) {
      sqlInsertOrUpdateReview = `
            UPDATE feedbacks
            SET point = ?, content = ?
            WHERE movie_slug = ? AND user_id = ? AND type = ?;
        `;
    } else {
      sqlInsertOrUpdateReview = `
            INSERT INTO feedbacks (id, movie_slug, user_id, point, content, type)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
    }

    const reviewId = uuidv4();

    const [rows]: any = await connection.promise().query(
      sqlInsertOrUpdateReview,

      isExists
        ? [point, content, movieSlug, userId, type]
        : [reviewId, movieSlug, userId, point, content, type]
    );

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: isExists
          ? "Cập nhật đánh giá thất bại"
          : "Thêm đánh giá thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: isExists
        ? "Cập nhật đánh giá thành công"
        : "Thêm đánh giá thành công",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error adding new review",
      result: null,
    };
  }
};

const addComment = async ({
  movieSlug,
  userId,
  content,
  type,
}: AddFeedback) => {
  try {
    const sqlInsertComment = `
        INSERT INTO feedbacks (id, movie_slug, user_id, content, type)
        VALUES (?, ?, ?, ?, ?);
    `;

    const commentId = uuidv4();

    const [rows]: any = await connection
      .promise()
      .query(sqlInsertComment, [commentId, movieSlug, userId, content, type]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Thêm bình luận thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: "Thêm bình luận thành công",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error adding new comment",
      result: null,
    };
  }
};
