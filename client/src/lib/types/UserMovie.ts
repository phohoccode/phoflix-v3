type GetUserMovies = {
  userId: string;
  type: "history" | "favorite" | "playlist";
  page: number;
  limit: number;
};

type CheckMovieExists = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
};

type AddNewMovie = {
  userId: string;
  movieData: {
    movieName: string;
    movieSlug: string;
    moviePoster: string;
    movieThumbnail: string;
  };
  type: "history" | "favorite" | "playlist";
  playlistId?: string;
};

type DeleteMovie = {
  userId: string;
  movieSlug: string;
  type: "history" | "favorite" | "playlist";
  playlistId?: string | null;
  movieId?: string | null;
};
