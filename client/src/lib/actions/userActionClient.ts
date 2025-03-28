"use client";

interface UpdateUserProflie {
  userId: string;
  username: string;
  gender: "other" | "female" | "male";
  avatar: string;
  typeAccount: "credentials" | "google";
}

export const updateUserProfile = async ({
  userId,
  username,
  gender,
  avatar,
  typeAccount,
}: UpdateUserProflie): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          username,
          gender,
          avatar,
          typeAccount,
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

// ===================== RESET PASSWORD =====================

interface ResetPassword {
  email: string;
  newPassword: string;
  oldPassword: string;
  typeAccount: "credentials";
}

export const resetPassword = async ({
  email,
  newPassword,
  oldPassword,
  typeAccount,
}: ResetPassword): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          oldPassword,
          typeAccount,
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

// ===================== GET USER MOVIES =====================
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

// ===================== CHECK MOVIE EXISTS =====================
interface CheckMovieExists {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
}

export const checkMovieExists = async ({
  userId,
  movieSlug,
  type,
}: CheckMovieExists): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/check-movie`,
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
interface AddNewMovie {
  userId: string;
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumbnail: string;
  };
  type: "history" | "favorite" | "playlist";
  playlistId?: string;
}

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
interface DeleteMovie {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  playlistId?: string | null;
}

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

// ===================== GET PLAYLISTS =====================
export const getPlaylists = async (userId: string): Promise<any> => {
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

// ===================== CREATE NEW PLAYLIST =====================
interface CreateNewPlaylist {
  userId: string;
  playlistName: string;
}

export const createNewPlaylist = async ({
  userId,
  playlistName,
}: CreateNewPlaylist): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          playlistName,
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

// ===================== Update PLAYLIST =====================
interface UpdatePlaylist {
  userId: string;
  playlistId: string;
  playlistName: string;
}

export const updatePlaylist = async ({
  userId,
  playlistId,
  playlistName,
}: UpdatePlaylist): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          playlistId,
          playlistName,
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

// ===================== DELETE PLAYLIST =====================

interface DeletePlaylist {
  userId: string;
  playlistId: string;
}

export const deletePlaylist = async ({
  userId,
  playlistId,
}: DeletePlaylist): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlist`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
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

// ===================== GET PLAYLISTS CONTAINING MOVIE =====================
interface GetPlaylistsContainingMovie {
  userId: string;
  movieSlug: string;
}

export const getPlaylistsContainingMovie = async ({
  userId,
  movieSlug,
}: GetPlaylistsContainingMovie): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/playlists/listByMovie?userId=${userId}&movieSlug=${movieSlug}`
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

// ===================== GET REVIEWS BY MOVIE =====================
interface getFeedbacks {
  movieSlug: string;
  limit: number;
  type: "review" | "comment";
}

export const getFeedbacks = async ({
  movieSlug,
  limit,
  type,
}: getFeedbacks): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/list?movieSlug=${movieSlug}&limit=${limit}&type=${type}`
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

// ===================== ADD NEW REVIEW =====================
interface AddFeedback {
  movieSlug: string;
  userId: string;
  type: "review" | "comment";
  point?: number;
  content?: string;
}

export const addFeedback = async ({
  movieSlug,
  point,
  userId,
  content,
  type,
}: AddFeedback): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieSlug,
          point,
          userId,
          content,
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

// ===================== DELETE FEEDBACK =====================
interface DeleteFeedback {
  feedbackId: string;
  userId: string;
}

export const deleteFeedback = async ({
  feedbackId,
  userId,
}: DeleteFeedback): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/delete?feedbackId=${feedbackId}&userId=${userId}`,
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

// ===================== UPDATE CONTENT FEEDBACK =====================
interface UpdateContentFeedback {
  feedbackId: string;
  userId: string;
  content: string;
}

export const updateContentFeedback = async ({
  feedbackId,
  userId,
  content,
}: UpdateContentFeedback): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackId,
          userId,
          content,
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

// ===================== ADD NEW REPLY =====================
interface AddReply {
  movieSlug: string;
  userId: string;
  content: string;
  type: "review" | "comment";
  parentId: string;
}

export const addReply = async ({
  movieSlug,
  userId,
  content,
  type,
  parentId,
}: AddReply): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieSlug,
          userId,
          content,
          type,
          parentId,
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

export const getStatsByMovie = async (movieSlug: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/statsByMovie?movieSlug=${movieSlug}`
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

// ===================== ADD VOTE =====================
interface AddVote {
  movieSlug: string;
  userId: string;
  feedbackId: string;
  voteType: "like" | "dislike";
}

export const addVote = async ({
  movieSlug,
  userId,
  feedbackId,
  voteType,
}: AddVote): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieSlug,
          userId,
          feedbackId,
          voteType,
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
