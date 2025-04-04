import { CreatePlaylist, DeletePlaylist, GetMoviesFromPlaylist, GetPlaylistsContainingMovie, UpdatePlaylist } from "@lib/types/Playlist";
import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

export const handleCreatePlaylist = async ({
  userId,
  playlistName,
}: CreatePlaylist) => {
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
        statusCode: 404,
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
        message: "Tạo danh sách phát thất bại",
        result: null,
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Tạo danh sách phát thành công!",
      result: {
        id: playlistId,
        userId,
        name: playlistName,
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi tạo playlist",
      result: null,
      statusCode: 500,
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

    return {
      status: true,
      message: "Lấy danh sách playlist thành công",
      result: {
        playlists: rows ?? [],
      },
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error getting playlists:", error);
    return {
      status: false,
      message: "Lỗi khi lấy danh sách playlist",
      result: null,
      statusCode: 500,
    };
  }
};

export const handleUpdatePlaylist = async ({
  userId,
  playlistId,
  playlistName,
}: UpdatePlaylist) => {
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
        statusCode: 404,
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
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Cập nhật playlist thành công",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi cập nhật playlist",
      result: null,
      statusCode: 500,
    };
  }
};

export const handleDeletePlaylist = async ({
  userId,
  playlistId,
}: DeletePlaylist) => {
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
        statusCode: 404,
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
        statusCode: 400,
      };
    }

    return {
      status: true,
      message: "Xóa playlist thành công",
      result: null,
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi xóa playlist",
      result: null,
      statusCode: 500,
    };
  }
};

// ======================== Get movies from playlist ========================

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
        statusCode: 404,
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
        statusCode: 404,
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
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi lấy danh sách phim trong playlist",
      result: null,
      statusCode: 500,
    };
  }
};

// ======================== Get playlists containing movie ========================
export const handleGetPlaylistsContainingMovie = async ({
  userId,
  movieSlug,
}: GetPlaylistsContainingMovie) => {
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
      statusCode: 200,
    };
  } catch (error) {
    return {
      status: false,
      message: "Lỗi khi kiểm tra phim trong playlist",
      result: null,
      statusCode: 500,
    };
  }
};
