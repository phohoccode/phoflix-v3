import { CheckMovieExists, CreateUserMovie, DeleteMovie, GetUserMovies } from "@lib/types/UserMovie";
import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

export const handleGetUserMovies = async ({
  userId,
  type,
  limit,
  page,
}: GetUserMovies) => {
  const offset = (page - 1) * limit;

  try {
    const query = `
      SELECT * FROM user_movies
      WHERE user_id = ? AND type = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(query, [userId, type, limit, offset]);

    const sqlSelectTotalItems = `
      SELECT COUNT(*) AS totalItems FROM user_movies
      WHERE user_id = ? AND type = ?
    `;

    const [rowsTotalItems]: any = await connection
      .promise()
      .query(sqlSelectTotalItems, [userId, type]);

    return {
      status: true,
      message: "Lấy danh sách phim thành công!",
      result: {
        movies: rows,
        totalItems: rowsTotalItems[0].totalItems,
        totalItemsPerPage: limit,
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi lấy danh sách phim!",
      result: null,
      statusCode: 500,
    };
  }
};

// ====================== CHECK MOVIE EXISTS ======================

export const handleCheckMovieExists = async ({
  userId,
  movieSlug,
  type,
}: CheckMovieExists) => {
  try {
    const sqlCheckMovieExists = `
      SELECT id FROM user_movies WHERE user_id = ? AND type = ? AND movie_slug = ?
    `;

    const [rowsCheckMovie]: any = await connection
      .promise()
      .query(sqlCheckMovieExists, [userId, type, movieSlug]);

    return {
      status: true,
      message: "Thành công",
      result: {
        exists: rowsCheckMovie.length > 0,
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi kiểm tra phim tồn tại!",
      result: null,
      statusCode: 500,
    };
  }
};

// ====================== ADD NEW MOVIE ======================

export const handleAddMovie = async ({
  userId,
  movieData,
  type,
  playlistId,
}: CreateUserMovie) => {
  try {
    const sqlCheckUserExists = `
      SELECT id FROM users WHERE id = ?
      `;

    const [rowsCheckUser]: any = await connection
      .promise()
      .query(sqlCheckUserExists, [userId]);

    if (rowsCheckUser.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    switch (type) {
      case "history":
        return await addMovieToHistory({
          userId,
          movieData,
        });
      case "favorite":
        return await addMovieToFavorite({
          userId,
          movieData,
        });
      case "playlist":
        return await addMovieToPlaylist({
          userId,
          movieData,
          playlistId,
        });
      default:
        return {
          status: false,
          message: "Type không hợp lệ!",
          result: null,
          statusCode: 400,
        };
    }
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi thêm phim vào danh sách!",
      result: null,
      statusCode: 500,
    };
  }
};

const addMovieToHistory = async ({ userId, movieData }: CreateUserMovie) => {
  const { movieName, movieSlug, moviePoster, movieThumbnail } = movieData;

  try {
    const today = new Date().toISOString().split("T")[0];

    const sqlSelectSearchHistory = `
      SELECT created_at as createdAt, movie_slug as movieSlug FROM user_movies
      WHERE user_id = ? AND type = ? AND movie_slug = ?
    `;

    const [rowsSelect]: any = await connection
      .promise()
      .query(sqlSelectSearchHistory, [userId, "history", movieSlug]);

    const movieCreatedAt = rowsSelect?.[0]?.createdAt
      ?.toISOString()
      ?.split("T")[0];

    if (movieCreatedAt === today) {
      const sqlCreateOrUpdateSearchHistory = `
        UPDATE user_movies
        SET created_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND type = ? AND movie_slug = ?
      `;

      const [rowsUpdate]: any = await connection
        .promise()
        .query(sqlCreateOrUpdateSearchHistory, [userId, "history", movieSlug]);

      if (rowsUpdate.affectedRows === 0) {
        return {
          status: false,
          message: "Cập nhật lịch sử phim thất bại!",
          result: null,
          statusCode: 400,
        };
      }

      return {
        status: true,
        message: "Cập nhật lịch sử phim thành công!",
        result: null,
        statusCode: 200,
      };
    }

    const query = `
      INSERT INTO user_movies (id, user_id, type, movie_name, movie_slug, movie_poster, movie_thumbnail)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const id = uuidv4();

    const [rowsInsert]: any = await connection
      .promise()
      .query(query, [
        id,
        userId,
        "history",
        movieName,
        movieSlug,
        moviePoster,
        movieThumbnail,
      ]);

    if (rowsInsert.affectedRows === 0) {
      return {
        status: false,
        message: "Tạo lịch sử phim thất bại!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Tạo lịch sử phim thành công!",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi khi thêm phim vào lịch sử!",
      result: null,
      statusCode: 500,
    };
  }
};

const addMovieToFavorite = async ({ userId, movieData }: CreateUserMovie) => {
  const { movieName, movieSlug, moviePoster, movieThumbnail } = movieData;

  try {
    const sqlCheckMovieExists = `
    SELECT id FROM user_movies WHERE user_id = ? AND type = ? AND movie_slug = ?
    `;

    const [rowsCheckMovie]: any = await connection
      .promise()
      .query(sqlCheckMovieExists, [userId, "favorite", movieSlug]);

    if (rowsCheckMovie.length > 0) {
      return {
        status: false,
        message: "Phim đã có trong danh sách yêu thích!",
        result: null,
        statusCode: 400,
      };
    }

    const query = `
      INSERT INTO user_movies (id, user_id, type, movie_name, movie_slug, movie_poster, movie_thumbnail)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const id = uuidv4();

    const [rowsInsert]: any = await connection
      .promise()
      .query(query, [
        id,
        userId,
        "favorite",
        movieName,
        movieSlug,
        moviePoster,
        movieThumbnail,
      ]);

    if (rowsInsert.affectedRows === 0) {
      return {
        status: false,
        message: "Có lỗi xảy ra khi thêm phim vào danh sách yêu thích!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: `Đã thêm ${movieName} vào danh sách yêu thích!`,
      result: {
        action: "favorite",
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi thêm phim vào danh sách yêu thích!",
      result: null,
      statusCode: 500,
    };
  }
};

const addMovieToPlaylist = async ({
  userId,
  movieData,
  playlistId,
}: CreateUserMovie) => {
  const { movieName, movieSlug, moviePoster, movieThumbnail } = movieData;

  try {
    const sqlCheckPlaylistExists = `
        SELECT id FROM playlists WHERE id = ?
    `;
    const [rowsCheckPlaylist]: any = await connection
      .promise()
      .query(sqlCheckPlaylistExists, [playlistId]);

    if (rowsCheckPlaylist.length === 0) {
      return {
        status: false,
        message: "Playlist không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    const query = `
      INSERT INTO user_movies (id, user_id, type, movie_name, movie_slug, movie_poster, movie_thumbnail, playlist_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const id = uuidv4();

    const [rowsInsert]: any = await connection
      .promise()
      .query(query, [
        id,
        userId,
        "playlist",
        movieName,
        movieSlug,
        moviePoster,
        movieThumbnail,
        playlistId,
      ]);

    if (rowsInsert.affectedRows === 0) {
      return {
        status: false,
        message: "Có lỗi xảy ra khi thêm phim vào playlist!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Đã thêm phim vào danh sách",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi khi thêm phim vào playlist!",
      result: null,
      statusCode: 500,
    };
  }
};

// ====================== DELETE MOVIE ======================

export const handleDeleteMovie = async ({
  userId,
  movieSlug,
  type,
  playlistId,
  movieId,
}: DeleteMovie) => {
  try {
    const sqlCheckUserExists = `
      SELECT id FROM users WHERE id = ?
      `;

    const [rowsCheckUser]: any = await connection
      .promise()
      .query(sqlCheckUserExists, [userId]);

    if (rowsCheckUser.length === 0) {
      return {
        status: false,
        message: "Người dùng không tồn tại!",
        result: null,
        statusCode: 404,
      };
    }

    const sqlDeleteMovie = `
      DELETE FROM user_movies 
      WHERE user_id = ? AND type = ? AND 
      (${playlistId ? "playlist_id = ?" : "playlist_id IS NULL"}) AND
      (${type === "history" ? "id = ?" : "movie_slug = ?"})
    `;

    let params = [userId, type];

    if (playlistId) {
      params.push(playlistId);
    }

    if (type === "history") {
      params.push(movieId as string);
    } else {
      params.push(movieSlug);
    }

    const [rowsDelete]: any = await connection
      .promise()
      .query(sqlDeleteMovie, params);

    if (rowsDelete.affectedRows === 0) {
      return {
        status: false,
        message: "Xóa phim thất bại!",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Đã xóa phim khỏi danh sách!",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi khi xóa phim khỏi danh sách!",
      result: null,
      statusCode: 500,
    };
  }
};
