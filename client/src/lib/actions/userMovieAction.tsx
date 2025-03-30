// ===================== GET USER MOVIES =====================

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

// ===================== CHECK MOVIE EXISTS =====================

export const checkMovieExists = async ({
  userId,
  movieSlug,
  type,
}: CheckMovieExists): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/checkMovie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieSlug,
          type,
        }),
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

// ===================== ADD NEW MOVIE =====================

export const addNewMovie = async ({
  userId,
  movieData,
  type,
  playlistId,
}: AddNewMovie): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/movie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieData,
          type,
          playlistId,
        }),
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

export const deleteMovie = async ({
  userId,
  movieSlug,
  type,
  playlistId = null,
}: DeleteMovie): Promise<any> => {
  try {
    const query = `?userId=${userId}&movieSlug=${movieSlug}&type=${type}&playlistId=${playlistId}`;

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
