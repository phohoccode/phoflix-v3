"use client";

import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionVideo from "./SectionVideo";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import SectionInfo from "./SectionInfo";
import MovieSuggesstions from "@/components/movie/MovieSuggestions";
import EpisodesList from "@/components/movie/EpisodeList";
import SkeletonWachingPage from "@/components/skeletons/SkeletonWatchingPage";
import EmptyData from "@/components/EmptyData";
import { addNewMovie } from "@/lib/actions/userMovieAction";
import { useSession } from "next-auth/react";
import FavoriteButton from "@/components/movie/controls/FavoriteButton";
import PlaylistButton from "@/components/movie/controls/PlaylistButton";
import ShareButton from "@/components/movie/controls/ShareButton";
import ReportFilmButton from "@/components/movie/controls/ReportFilmButton";
import CommentSection from "@/components/feedback/FeedbackSection";

const MainPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { movie, episodes, loading, error, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { data: sesstion }: any = useSession();
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(
      fetchDataMovieInfo({
        slug: params?.slug as string,
        page: "watching",
      })
    );
  }, []);

  useEffect(() => {
    if (sesstion) {
      if (!loading && movie) {
        addNewMovie({
          userId: sesstion?.user?.id as string,
          movieData: {
            movieName: movie?.name,
            movieSlug: movie?.slug,
            moviePoster: movie?.poster_url,
            movieThumbnail: movie?.thumb_url,
          },
          type: "history",
          accessToken: sesstion?.user?.accessToken,
        });
      }
    }
  }, [loading, params.slug]);

  useEffect(() => {
    if (episodes?.length >= 0) {
      // Gộp 2 server (Vietsub và Lồng tiếng)
      const data = [
        ...episodes?.[0]?.server_data,
        ...(episodes?.[1]?.server_data ?? []),
      ];

      // Tìm episode so với id trên url
      const currentEpisode = data.find((item: any) => {
        return item?.link_embed?.includes(id);
      });

      if (currentEpisode) {
        dispatch(setCurrentEpisode(currentEpisode));
      } else {
        dispatch(setCurrentEpisode(data?.[0]));
      }
    }
  }, [episodes]);

  if (loading) return <SkeletonWachingPage />;
  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Bộ phim này không tồn tại hoặc đã bị xóa"
        />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-12 max-w-[1620px] mx-auto lg:px-14">
      <Box className="lg:mt-32 mt-24">
        <h3 className=" xl:text-4xl lg:text-3xl px-4 md:text-2xl text-xl title-text font-bold mb-6 sm:block hidden">
          {movie?.name} - {currentEpisode?.name}
        </h3>
        <Box className="flex flex-col lg:px-4">
          <SectionVideo />
          <Box className="p-4 bg-[#08080a] border-l border-r border-b border-[#ffffff10] xl:rounded-bl-2xl xl:rounded-br-2xl flex justify-between">
            <Box className="flex gap-4">
              <FavoriteButton placement="horizontal" responsiveText />
              <PlaylistButton placement="horizontal" responsiveText />
              <ShareButton placement="horizontal" responsiveText />
            </Box>
            <ReportFilmButton placement="horizontal" responsiveText />
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col gap-12 px-4">
        <Box className="flex gap-12 lg:flex-row flex-col pb-12 border-b border-[#ffffff10]">
          <SectionInfo data={movie} />
          <Box className="lg:w-[0.5px] w-full lg:h-auto h-[0.5px] bg-[#ffffff10]"></Box>
          <Box className="xl:flex-2 flex-1">
            <Box className="flex flex-col gap-6">
              {episodes?.map((episode: any, index: number) => (
                <EpisodesList
                  key={index}
                  colums={{
                    base: 3,
                    md: 5,
                    lg: 3,
                    xl: 6,
                  }}
                  redirect={false}
                  server_name={episode?.server_name}
                  server_data={episode?.server_data}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <CommentSection />

        <Box className="w-full h-[0.5px] bg-[#ffffff10]"></Box>

        <MovieSuggesstions
          columns={{ base: 3, md: 3, lg: 5, xl: 6, "2xl": 8 }}
          title="Đề xuất cho bạn"
          limit={24}
        />
      </Box>
    </Box>
  );
};

export default MainPage;
