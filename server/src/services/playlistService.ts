import connection from "../database/connect";
import { v4 as uuidv4 } from "uuid";

export const handleCreatePlaylist = async (
  userId: string,
  playlistName: string
) => {
  try {
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
      SELECT * FROM playlists WHERE user_id = ?
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
