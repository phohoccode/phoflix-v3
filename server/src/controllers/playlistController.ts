import { Request, Response } from "express";
import {
  handleCreatePlaylist,
  handleDeletePlaylist,
  handleGetPlaylists,
  handleUpdatePlaylist,
} from "../services/playlistService";

export const createPlaylist = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, playlistName } = req.body;

    if (!userId || !playlistName) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleCreatePlaylist(userId, playlistName);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating playlist",
      result: null,
    });
  }
};

export const getPlaylists = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleGetPlaylists(userId as string);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error getting playlist",
      result: null,
    });
  }
};

export const updatePlaylist = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, playlistId, playlistName } = req.body;

    if (!userId || !playlistId || !playlistName) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleUpdatePlaylist(
      userId,
      playlistId,
      playlistName
    );

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating playlist",
      result: null,
    });
  }
};

export const deletePlaylist = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId, playlistId } = req.body;

    if (!userId || !playlistId) {
      return res.status(400).json({
        status: false,
        message: "Missing required parameters",
        result: null,
      });
    }

    const response = await handleDeletePlaylist(userId, playlistId);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting playlist",
      result: null,
    });
  }
};
