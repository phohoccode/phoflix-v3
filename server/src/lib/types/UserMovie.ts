export type GetUserMovies = {
  userId: string;
  type: string;
  limit: number;
  page: number;
};

export type CheckMovieExists = {
  userId: string;
  movieSlug: string;
  type: string;
};

export type CreateUserMovie = {
  userId: string;
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumbnail: string;
  };
  playlistId?: string;
  type?: "history" | "favorite" | "playlist";
};

export type DeleteMovie = {
  userId: string;
  movieSlug: string;
  type: string;
  playlistId?: string | null;
};
