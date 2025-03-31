"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
    const params = new URLSearchParams({
      userId,
      type,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/user/movies?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
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
    const params = new URLSearchParams({
      userId,
      movieSlug,
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/user/movie?${params.toString()}`,
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
      `${BACKEND_URL}/user/playlists?userId=${userId}`
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
    const params = new URLSearchParams({
      userId,
      playlistId,
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/user/playlist/movies?${params.toString()}`
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
