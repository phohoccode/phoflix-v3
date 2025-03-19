import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

interface GetUserMovies {
  userId: string;
  type: string;
  limit: number;
  page: number;
}

export const handleGetUserMovies = async ({
  userId,
  type,
  limit,
  page,
}: GetUserMovies) => {
  const offset = (page - 1) * limit;

  console.log("type", type);

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
    

    console.log(">> rows", rows);

    return {
      status: true,
      message: "User movies fetched successfully",
      result: {
        movies: rows,
        totalItems: rowsTotalItems[0].totalItems,
        totalItemsPerPage: limit,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Error fetching user movies",
      result: null,
    };
  }
};

// ====================== CHECK MOVIE EXISTS ======================

interface CheckMovieExists {
  userId: string;
  movieSlug: string;
  type: string;
}

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

    if (rowsCheckMovie.length > 0) {
      return {
        status: true,
        message: "Phim đã có trong danh sách!",
        result: null,
      };
    }

    return {
      status: false,
      message: "Phim không tồn tại trong danh sách!",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      message: "Error checking movie existence",
      result: null,
    };
  }
};

// ====================== CREATE USER MOVIE ======================

interface CreateUserMovie {
  userId: string;
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumbnail: string;
  };
  playlistId?: string;
  type?: "history" | "favorite" | "playlist";
}

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
          message: "Invalid type",
          result: null,
        };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error creating user movie",
      result: null,
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
        };
      }

      return {
        status: true,
        message: "Cập nhật lịch sử phim thành công!",
        result: null,
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
      };
    }

    return {
      status: true,
      message: "Tạo lịch sử phim thành công!",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error creating user movie history",
      result: null,
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
      };
    }

    return {
      status: true,
      message: `Đã thêm ${movieName} vào danh sách yêu thích!`,
      result: {
        action: "favorite",
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Error creating user movie favorite",
      result: null,
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
        message: "Tạo phim vào playlist thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Tạo phim vào playlist thành công!",
      result: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error creating user movie playlist",
      result: null,
    };
  }
};

// ====================== DELETE MOVIE ======================
interface DeleteMovie {
  userId: string;
  movieSlug: string;
  type: string;
}

export const handleDeleteMovie = async ({
  userId,
  movieSlug,
  type,
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
      };
    }

    const sqlDeleteMovie = `
      DELETE FROM user_movies WHERE user_id = ? AND type = ? AND movie_slug = ?
    `;

    const [rowsDelete]: any = await connection
      .promise()
      .query(sqlDeleteMovie, [userId, type, movieSlug]);

    if (rowsDelete.affectedRows === 0) {
      return {
        status: false,
        message: "Xóa phim thất bại!",
        result: null,
      };
    }

    return {
      status: true,
      message: "Đã xóa phim khỏi danh sách!",
      result: {
        action: `un-${type}`,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error deleting user movie",
      result: null,
    };
  }
};
