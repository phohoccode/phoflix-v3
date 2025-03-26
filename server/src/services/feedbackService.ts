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

    const sqlSelectTotalFeedbacks = `
        SELECT COUNT(*) AS total_feedbacks
        FROM feedbacks f
        WHERE f.movie_slug = ? AND f.type = ? AND parent_id IS NULL
    `;

    const [totalFeedbacks]: any = await connection
      .promise()
      .query(sqlSelectTotalFeedbacks, [movieSlug, type]);

    // Lấy tổng số bản ghi thỏa mãn điều kiện
    const [countResult] = await connection.promise().query(
      ` SELECT COUNT(*) AS total_count
        FROM feedbacks f
        WHERE movie_slug = ? AND type = ? AND parent_id is NULL ${conditionQuery}`,
      params.slice(0, -1)
    );

    const total_count = (countResult as any)[0].total_count;

    const sqlGetFeedbacks = `WITH RECURSIVE feedback_hierarchy AS (
        SELECT id, parent_id
        FROM feedbacks
        WHERE parent_id IS NOT NULL
        
        UNION ALL
        
        SELECT f.id, fh.parent_id
        FROM feedbacks f
        JOIN feedback_hierarchy fh ON f.parent_id = fh.id
      )
      SELECT 
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
          (
              SELECT COUNT(*) 
              FROM feedback_hierarchy fh 
              WHERE fh.parent_id = f.id
          ) AS total_children,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'like') AS total_like
      FROM 
          feedbacks AS f
      JOIN 
          users AS u ON f.user_id = u.id
      WHERE 
          f.movie_slug = ? AND f.type = ? AND f.parent_id IS NULL ${conditionQuery}
      ORDER BY f.created_at DESC
      LIMIT ?;`;

    const [feedbacks]: any = await connection
      .promise()
      .query(
        sqlGetFeedbacks,
        afterTime
          ? [movieSlug, type, afterTime, limit]
          : [movieSlug, type, limit]
      );

    // Format lại dữ liệu trả về
    const finalFeedbacks = feedbacks.map((feedback: any) => ({
      ...feedback,
      author: feedback?.author ? JSON.parse(feedback?.author) : null,
    }));

    return {
      status: true,
      msg: "Thành công.",
      result: {
        has_more: total_count > finalFeedbacks.length,
        item_count: total_count,
        total_feedbacks: totalFeedbacks[0]?.total_feedbacks ?? 0,
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
    // lấy bảng ghi có thời gian tạo nhỏ hơn thời gian của bản ghi cuối cùng
    const conditionQuery = afterTime
      ? `AND UNIX_TIMESTAMP(f.created_at) < ?`
      : ``;

    const sqlCountResult = `
        WITH RECURSIVE CommentCount AS (
          SELECT id FROM feedbacks f
          WHERE f.parent_id = ? AND f.type = ? ${conditionQuery}
          UNION ALL
          SELECT f.id FROM feedbacks f
          INNER JOIN CommentCount c ON f.parent_id = c.id
          WHERE f.type = ? ${conditionQuery}
        )
        SELECT COUNT(*) AS total_count FROM CommentCount
    `;

    const [countResult] = await connection
      .promise()
      .query(
        sqlCountResult,
        afterTime
          ? [parentId, type, afterTime, type, afterTime]
          : [parentId, type, type]
      );

    // Số lượng bảng ghi còn lại
    const total_count = (countResult as any)[0]?.total_count;

    // Lấy danh sách reply feedback
    const sqlGetReplyFeedbacks = `
        WITH RECURSIVE CommentHierarchy AS (
        SELECT 
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
          pu.id AS mention_id,
          JSON_OBJECT(
              '_id', pu.id,
              'name', pu.username
          ) AS mention_user,
          f.movie_slug,
          CASE WHEN f.type = 'review' THEN f.id ELSE NULL END AS reviews_id,
          CASE WHEN f.type = 'review' THEN JSON_OBJECT('point', f.point) ELSE NULL END AS reviews,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'like') AS total_like
        FROM feedbacks AS f
        JOIN users AS u ON f.user_id = u.id
        LEFT JOIN feedbacks AS p ON f.parent_id = p.id
        LEFT JOIN users AS pu ON p.user_id = pu.id
        WHERE f.parent_id = ? AND f.type = ? ${conditionQuery}

        UNION ALL

        SELECT 
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
          pu.id AS mention_id,
          JSON_OBJECT(
              '_id', pu.id,
              'name', pu.username
          ) AS mention_user,
          f.movie_slug,
          CASE WHEN f.type = 'review' THEN f.id ELSE NULL END AS reviews_id,
          CASE WHEN f.type = 'review' THEN JSON_OBJECT('point', f.point) ELSE NULL END AS reviews,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'dislike') AS total_dislike,
          (SELECT COUNT(*) FROM feedback_likes WHERE feedback_id = f.id AND type = 'like') AS total_like
        FROM feedbacks AS f
        JOIN users AS u ON f.user_id = u.id
        LEFT JOIN feedbacks AS p ON f.parent_id = p.id
        LEFT JOIN users AS pu ON p.user_id = pu.id
        INNER JOIN CommentHierarchy ch ON f.parent_id = ch._id
        WHERE f.type = ? ${conditionQuery}
      )
      SELECT * FROM CommentHierarchy
      ORDER BY created_at DESC
      LIMIT ?`;

    const [replies]: any = await connection
      .promise()
      .query(
        sqlGetReplyFeedbacks,
        afterTime
          ? [parentId, type, afterTime, type, afterTime, limit]
          : [parentId, type, type, limit]
      );

    // Format lại dữ liệu trả về
    const finalReplyFeedback = replies.map((feedback: any) => ({
      ...feedback,
      author: JSON.parse(feedback?.author),
      mention_user: feedback?.mention_user
        ? JSON.parse(feedback?.mention_user)
        : null,
    }));

    return {
      status: true,
      msg: "Thành công!",
      result: {
        has_more: total_count > finalReplyFeedback?.length,
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

// ==================== ADD NEW REPLY ====================
interface AddReplyFeedback {
  movieSlug: string;
  userId: string;
  content: string;
  type: "review" | "comment";
  parentId: string;
}

export const handleAddReplyFeedback = async ({
  movieSlug,
  userId,
  content,
  type,
  parentId,
}: AddReplyFeedback) => {
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

    const sqlInsertComment = `
        INSERT INTO feedbacks (id, movie_slug, user_id, content, type, parent_id)
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const commentId = uuidv4();

    const [rows]: any = await connection
      .promise()
      .query(sqlInsertComment, [
        commentId,
        movieSlug,
        userId,
        content,
        type,
        parentId,
      ]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Thêm trả lời thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: "Thêm trả lời thành công",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error adding new reply",
      result: null,
    };
  }
};

// ==================== GET STATS BY MOVIE ====================

export const handleGetStatsByMovie = async (movieSlug: string) => {
  try {
    const sqlGetStatsByMovie = `
        SELECT AVG(point) AS average_point, COUNT(*) AS total_reviews
        FROM feedbacks
        WHERE movie_slug = ? AND type = 'review';
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlGetStatsByMovie, [movieSlug]);

    console.log(typeof rows[0]?.average_point, rows[0]?.average_point);

    return {
      status: true,
      msg: "Thành công.",
      result: {
        average_point: parseFloat(rows[0]?.average_point ?? 0).toFixed(1) ?? 0,
        total_reviews: rows[0]?.total_reviews ?? 0,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error fetching stats by movie",
      result: null,
    };
  }
};
