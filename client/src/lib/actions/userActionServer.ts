"use server";

import { revalidatePath } from "next/cache";

interface GetUserMovies {
  userId: string;
  type: "history" | "favorite" | "playlist";
  page: number;
  limit: number;
}

export const getUserMovies = async ({
  userId,
  type,
  page,
  limit,
}: GetUserMovies): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/movies?userId=${userId}&type=${type}&page=${page}&limit=${limit}`
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ===================== DELETE MOVIE =====================
interface DeleteMovie {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
}

export const deleteMovie = async ({
  userId,
  movieSlug,
  type,
}: DeleteMovie): Promise<any> => {
  try {
    const query = `?userId=${userId}&movieSlug=${movieSlug}&type=${type}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/movie${query}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ===================== GET PLAYLISTS  =====================
interface GetUserPlaylists {
  userId: string;
}

export const getUserPlaylists = async ({
  userId,
}: GetUserPlaylists): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlists?userId=${userId}`
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ===================== GET USER MOVIES PLAYLIST =====================

interface GetUserMoviesFromPlaylist {
  userId: string;
  playlistId: string;
  page: number;
  limit: number;
}

export const getUserMoviesFromPlaylist = async ({
  userId,
  playlistId,
  page,
  limit,
}: GetUserMoviesFromPlaylist): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlist/movies?userId=${userId}&playlistId=${playlistId}&page=${page}&limit=${limit}`
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
