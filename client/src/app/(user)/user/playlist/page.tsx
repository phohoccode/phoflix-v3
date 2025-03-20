import Spinner from "@/app/loading";
import { auth } from "@/auth";
import MovieSection from "@/components/csr/user/MovieSection";
import ActionsPlaylist from "@/components/csr/user/playlist/ActionsPlaylist";
import Playlists from "@/components/csr/user/playlist/Playlists";
import {
  getUserMoviesFromPlaylist,
  getUserPlaylists,
} from "@/lib/actions/userActionServer";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const session = await auth();
  const userId = session?.user?.id as string;
  const params = await searchParams;
  const limit = 18;
  const currentPage = params?.page ? Number(params?.page) : 1;

  const [responsePlaylist, responseMovies] = await Promise.all([
    getUserPlaylists({ userId }),

    // kiểm tra xem có playlistId không, nếu có thì lấy danh sách phim trong playlist đó
    params?.playlistId
      ? getUserMoviesFromPlaylist({
          userId,
          playlistId: String(params.playlistId),
          page: currentPage,
          limit,
        })
      : null,
  ]);

  const { playlists } = responsePlaylist?.result || {};

  // nếu không có playlistId thì lấy playlist đầu tiên trong danh sách
  const playlistId = params?.playlistId
    ? String(params.playlistId)
    : playlists[0]?.id;

  const response =
    responseMovies ??
    (await getUserMoviesFromPlaylist({
      userId,
      playlistId,
      page: currentPage,
      limit,
    }));

  const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <>
      <Box className="flex gap-4 items-center mb-4">
        <h3 className="text-gray-50 text-lg">Danh sách</h3>
        <ActionsPlaylist action="create" />
      </Box>

      <Suspense fallback={<Spinner />}>
        <Playlists playlists={playlists} />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <MovieSection
          movies={movies}
          totalItems={totalItems}
          totalItemsPerPage={totalItemsPerPage}
          currentPage={currentPage}
          limit={limit}
          sesstion={session}
          type="playlist"
        />
      </Suspense>
    </>
  );
};

export default Page;
