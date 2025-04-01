type CreateNewPlaylist = {
  userId: string;
  playlistName: string;
};

type UpdatePlaylist = {
  userId: string;
  playlistId: string;
  playlistName: string;
};

type DeletePlaylist = {
  userId: string;
  playlistId: string;
};

type GetPlaylistsContainingMovie = {
  userId: string;
  movieSlug: string;
}

type GetUserMoviesFromPlaylist = {
  userId: string;
  playlistId: string;
  page: number;
  limit: number;
}