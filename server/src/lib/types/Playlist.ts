export type CreatePlaylist = {
  userId: string;
  playlistName: string;
};

export type UpdatePlaylist = {
  userId: string;
  playlistId: string;
  playlistName: string;
};

export type DeletePlaylist = {
  userId: string;
  playlistId: string;
};

export type GetMoviesFromPlaylist = {
  userId: string;
  page: number;
  limit: number;
  playlistId: string;
};

export type GetPlaylistsContainingMovie = {
  userId: string;
  movieSlug: string;
}