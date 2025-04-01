"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserProfile = async ({
  email,
  typeAccount,
}: GetUserProfile): Promise<any> => {
  try {
    const params = new URLSearchParams({
      email,
      typeAccount,
    });

    const response = await fetch(
      `${BACKEND_URL}/user/profile?${params.toString()}`
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
