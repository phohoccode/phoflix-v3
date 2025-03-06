"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container } from "@chakra-ui/react";
import SlideShow from "@/components/movie/slide-show/SlideShow";
import { useEffect, useCallback } from "react";
import {
  fetchDataSlideShow,
  fetchDataMovie,
} from "@/store/asyncThunks/movieAsyncThunk";
import MovieThumb from "@/components/movie/movie-thumb/MovieThumb";
import Link from "next/link";
import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import MovieThumbTitle from "@/components/movie/movie-thumb/MovieThumbTitle";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    televisonSeries,
    featureFilms,
    cartoon,
    vietnameseMovies,
    chineseMovies,
    koreanMovies,
  } = useSelector((state: RootState) => state.movie.movieData);

  const finalData = [
    {
      title: "Phim bộ mới",
      link: "/danh-sach/phim-bo",
      data: televisonSeries,
      gradient: "from-[#674196] to-gray-100",
      orientation: "horizontal",
    },
    {
      title: "Phim lẻ mới",
      link: "/danh-sach/phim-le",
      data: featureFilms,
      gradient: "from-[#f7a10b] to-gray-100",
      orientation: "horizontal",
    },
    {
      title: "Phim hoạt hình mới",
      link: "/danh-sach/hoat-hinh",
      data: cartoon,
      gradient: "from-[#1d2e79] to-gray-100",
      orientation: "horizontal",
    },
    {
      title: "Phim Việt Nam",
      link: "/danh-sach/phim-viet-nam",
      data: vietnameseMovies,
      gradient: "from-[#db2777] to-gray-100",
      orientation: "vertical",
    },
    {
      title: "Phim Trung Quốc",
      link: "/danh-sach/phim-trung-quoc",
      data: chineseMovies,
      gradient: "from-[#9333ea] to-gray-100",
      orientation: "vertical",
    },
    {
      title: "Phim Hàn Quốc",
      link: "/danh-sach/phim-han-quoc",
      data: koreanMovies,
      gradient: "from-[#0d9488] to-gray-100",
      orientation: "vertical",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchDataSlideShow()),
          dispatch(fetchDataMovie({ type: "phim-bo", describe: "danh-sach" })),
          dispatch(fetchDataMovie({ type: "phim-le", describe: "danh-sach" })),
          dispatch(
            fetchDataMovie({ type: "hoat-hinh", describe: "danh-sach" })
          ),
          dispatch(
            fetchDataMovie({
              type: "viet-nam",
              describe: "quoc-gia",
              params: {
                limit: 24,
                page: 1,
              },
            })
          ),
          dispatch(
            fetchDataMovie({
              type: "trung-quoc",
              describe: "quoc-gia",
              params: {
                limit: 24,
                page: 1,
              },
            })
          ),
          dispatch(
            fetchDataMovie({
              type: "han-quoc",
              describe: "quoc-gia",
              params: {
                limit: 24,
                page: 1,
              },
            })
          ),
        ]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Box>
      <SlideShow />
      <Box className="max-w-[1900px] mx-auto mt-12 lg:px-14">
        <Box className="flex flex-col gap-12 bg-gradient-to-b from-[#282b3a] via-transparent via-20% lg:p-8 md:p-6 p-4 rounded-lg">
          {finalData?.map(
            ({ title, link, data, gradient, orientation }: any) => (
              <Box key={title}>
                <MovieThumbTitle
                  loading={data.loading}
                  href={link}
                  title={title}
                  gradient={gradient}
                  error={data.error}
                />
                <Box>
                  <MovieThumb
                    data={data.items}
                    loading={data.loading}
                    error={data.error}
                    orientation={orientation}
                  />
                </Box>
              </Box>
            )
          )}
        </Box>

        
      </Box>
    </Box>
  );
};

export default Home;
