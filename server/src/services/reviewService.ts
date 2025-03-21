import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

// ==================== GET REVIEWS BY MOVIE ====================

interface GetReviewsByMovie {
  movieSlug: string;
  page: number;
  limit: number;
}

export const handleGetReviewsByMovie = async ({
  movieSlug,
  page = 1,
  limit = 10,
}: GetReviewsByMovie) => {
  try {
    const offset = (page - 1) * limit;

    const sqlSelectReviewByMovie = `
        SELECT 
          r.id as reviewId, 
          r.is_spam as isSpam, 
          r.point,
          u.username, 
          u.avatar, 
          u.id as userId
        FROM reviews r
        INNER JOIN users u ON r.user_id = u.id
        WHERE r.movie_slug = ?
        ORDER BY r.created_at DESC
        LIMIT ? OFFSET ?;
    `;
    const [rowsSelect]: any = await connection
      .promise()
      .query(sqlSelectReviewByMovie, [movieSlug, limit, offset]);

    const sqlSelectTotalReviewByMovie = `
        SELECT COUNT(*) as totalReview, SUM (r.point) as totalPoint
        FROM reviews r
        WHERE r.movie_slug = ?;
    `;

    const [rowsTotalReview]: any = await connection
      .promise()
      .query(sqlSelectTotalReviewByMovie, [movieSlug]);

    return {
      status: true,
      message: "Lấy danh sách đánh giá thành công",
      result: {
        reviews: {
          items: rowsSelect,
          averagePoint: rowsTotalReview[0].totalPoint ?? 0,
          totalItems: rowsTotalReview[0].totalReview,
          itemsPerPage: limit,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error fetching reviews",
      result: null,
    };
  }
};

// ==================== ADD NEW REVIEW ====================

interface AddNewReview {
  movieSlug: string;
  point: number;
  userId: string;
  content?: string;
}

export const handleAddNewPreview = async ({
  movieSlug,
  point,
  content,
  userId,
}: AddNewReview) => {
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

    const sqlCheckUserReviewMovie = `
        SELECT id
        FROM reviews
        WHERE movie_slug = ? AND user_id = ?;
    `;

    const [rowsCheck]: any = await connection
      .promise()
      .query(sqlCheckUserReviewMovie, [movieSlug, userId]);

    let sqlInsertOrUpdateReview = "";
    const isExists = rowsCheck.length > 0;

    if (isExists) {
      sqlInsertOrUpdateReview = `
            UPDATE reviews
            SET point = ?, content = ?
            WHERE movie_slug = ? AND user_id = ?;
        `;
    } else {
      sqlInsertOrUpdateReview = `
            INSERT INTO reviews (id, movie_slug, user_id, point, content)
            VALUES (?, ?, ?, ?, ?);
        `;
    }

    const reviewId = uuidv4();

    const [rows]: any = await connection
      .promise()
      .query(
        sqlInsertOrUpdateReview,
        isExists
          ? [point, content, movieSlug, userId]
          : [reviewId, movieSlug, userId, point, content]
      );

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Không thể thêm đánh giá",
        result: null,
      };
    }

    return {
      status: true,
      message: "Cảm ơn bạn đã đánh giá phim!",
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
