"use client";

import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionVideo from "./SectionVideo";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import SectionControls from "@/components/movie/SectionControls";
import SectionInfo from "./SectionInfo";
import MovieSuggesstions from "@/components/movie/MovieSuggestions";
import EpisodesList from "@/components/movie/EpisodeList";
import SkeletonWachingPage from "@/components/skeletons/SkeletonWatchingPage";
import EmptyData from "@/components/EmptyData";

const MainPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { movie, episodes, loading, error, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
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
        <h3 className=" xl:text-4xl lg:text-3xl px-4 md:text-2xl text-xl title-text font-bold mb-6">
          {movie?.name} - {currentEpisode?.name}
        </h3>
        <Box className="flex flex-col lg:px-4">
          <SectionVideo />
          <Box className="p-4 bg-[#08080a] xl:rounded-bl-2xl xl:rounded-br-2xl">
            <SectionControls placement="horizontal" />
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
                  redirect={false}
                  server_name={episode?.server_name}
                  server_data={episode?.server_data}
                />
              ))}
            </Box>
          </Box>
        </Box>
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
