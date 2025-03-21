import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

export const handleCreatePlaylist = async (
  userId: string,
  playlistName: string
) => {
  try {
    const sqlCheckPlaylistExists = `
      SELECT id FROM playlists WHERE user_id = ? AND name = ?
    `;

    const [checkRows]: any = await connection
      .promise()
      .query(sqlCheckPlaylistExists, [userId, playlistName]);

    if (checkRows.length > 0) {
      return {
        status: false,
        message: "Playlist đã tồn tại",
        result: null,
      };
    }

    const playlistId = uuidv4();

    const sqlInsertPlaylist = `
      INSERT INTO playlists (id, user_id, name)
      VALUES (?, ?, ?)
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlInsertPlaylist, [playlistId, userId, playlistName]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Tạo playlist thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: "Tạo playlist thành công",
      result: {
        id: playlistId,
        userId,
        name: playlistName,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Error creating playlist",
      result: null,
    };
  }
};

export const handleGetPlaylists = async (userId: string) => {
  try {
    const sqlGetPlaylist = `
      SELECT p.*, COUNT(um.playlist_id) as totalMovie
      FROM playlists p
      LEFT JOIN user_movies um ON p.id = um.playlist_id
      WHERE p.user_id = ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlGetPlaylist, [userId]);

    if (rows.length === 0) {
      return {
        status: false,
        message: "Không có playlist nào",
        result: null,
      };
    }

    return {
      status: true,
      message: "Lấy danh sách playlist thành công",
      result: {
        playlists: rows,
      },
    };
  } catch (error) {
    console.error("Error getting playlists:", error);
    return {
      status: false,
      message: "Error getting playlist",
      result: null,
    };
  }
};

export const handleUpdatePlaylist = async (
  userId: string,
  playlistId: string,
  playlistName: string
) => {
  try {
    const sqlCheckPlaylistExists = `
      SELECT id FROM playlists WHERE id = ? AND user_id = ?
    `;

    const [checkRows]: any = await connection
      .promise()
      .query(sqlCheckPlaylistExists, [playlistId, userId]);

    if (checkRows.length === 0) {
      return {
        status: false,
        message: "Playlist không tồn tại",
        result: null,
      };
    }

    const sqlUpdatePlaylist = `
      UPDATE playlists SET name = ? WHERE id = ? AND user_id = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlUpdatePlaylist, [playlistName, playlistId, userId]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Cập nhật playlist thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: "Cập nhật playlist thành công",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      message: "Error updating playlist",
      result: null,
    };
  }
};

export const handleDeletePlaylist = async (
  userId: string,
  playlistId: string
) => {
  try {
    const sqlCheckPlaylistExists = `
      SELECT id FROM playlists WHERE id = ? AND user_id = ?
    `;

    const [checkRows]: any = await connection
      .promise()
      .query(sqlCheckPlaylistExists, [playlistId, userId]);

    if (checkRows.length === 0) {
      return {
        status: false,
        message: "Playlist không tồn tại",
        result: null,
      };
    }

    const sqlDeletePlaylist = `
      DELETE FROM playlists WHERE id = ? AND user_id = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlDeletePlaylist, [playlistId, userId]);

    if (rows.affectedRows === 0) {
      return {
        status: false,
        message: "Xóa playlist thất bại",
        result: null,
      };
    }

    return {
      status: true,
      message: "Xóa playlist thành công",
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      message: "Error deleting playlist",
      result: null,
    };
  }
};

// ======================== Get movies from playlist ========================

interface GetMoviesFromPlaylist {
  userId: string;
  playlistId: string;
  page: number;
  limit: number;
}

export const handleGetMovieFromPlaylist = async ({
  userId,
  playlistId,
  page = 1,
  limit = 10,
}: GetMoviesFromPlaylist) => {
  try {
    const sqlCheckPlaylistExists = `
      SELECT id FROM playlists WHERE id = ? AND user_id = ?
    `;

    const [checkRows]: any = await connection
      .promise()
      .query(sqlCheckPlaylistExists, [playlistId, userId]);

    if (checkRows.length === 0) {
      return {
        status: false,
        message: "Playlist không tồn tại",
        result: null,
      };
    }

    const offset = (page - 1) * limit;

    const sqlGetMoviesFromPlaylist = `
      SELECT * 
      FROM user_movies 
      WHERE playlist_id = ? AND user_id = ?
      LIMIT ? OFFSET ?
    `;

    const sqlTotalMoviesFromPlaylist = `
      SELECT COUNT(*) as total
      FROM user_movies 
      WHERE playlist_id = ? AND user_id = ?
    `;

    const [rowsMovieFromPlaylist]: any = await connection
      .promise()
      .query(sqlGetMoviesFromPlaylist, [playlistId, userId, limit, offset]);

    const [rowsTotalMoviesFromPlaylist]: any = await connection
      .promise()
      .query(sqlTotalMoviesFromPlaylist, [playlistId, userId]);

    if (rowsMovieFromPlaylist.length === 0) {
      return {
        status: false,
        message: "Không có phim nào trong playlist",
        result: null,
      };
    }

    return {
      status: true,
      message: "Lấy danh sách phim trong playlist thành công",
      result: {
        movies: rowsMovieFromPlaylist,
        totalItems: rowsTotalMoviesFromPlaylist[0].total,
        totalItemsPerPage: limit,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Error getting movies from playlist",
      result: null,
    };
  }
};

// ======================== Get playlists containing movie ========================
export const handleGetPlaylistsContainingMovie = async (
  userId: string,
  movieSlug: string
) => {
  try {
    const sqlCheckMovieInPlaylists = `
      SELECT p.id
      FROM playlists p
      JOIN user_movies um ON p.id = um.playlist_id
      WHERE um.user_id = ? AND um.movie_slug = ?
    `;

    const [rows]: any = await connection
      .promise()
      .query(sqlCheckMovieInPlaylists, [userId, movieSlug]);

    let playlistIds: string[] = [];

    if (rows.length > 0) {
      playlistIds = rows.map((row: any) => row.id);
    }

    return {
      status: true,
      message: "Thành công!",
      result: {
        playlistIds,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: "Error checking movie in playlists",
      result: null,
    };
  }
};
