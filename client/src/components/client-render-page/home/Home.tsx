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
  const { televisonSeries, featureFilms, cartoon } = useSelector(
    (state: RootState) => state.movie.movieData
  );

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
        <Box className="flex flex-col gap-12 bg-gradient-to-b from-[#282b3a] via-transparent via-20% p-8 rounded-lg">
          {[
            {
              title: "Phim bộ mới",
              link: "/danh-sach/phim-bo",
              data: televisonSeries,
              gradient: "from-blue-600 to-purple-500",
            },
            {
              title: "Phim lẻ mới",
              link: "/danh-sach/phim-le",
              data: featureFilms,
              gradient: "from-pink-600 to-purple-500",
            },
            {
              title: "Phim hoạt hình mới",
              link: "/danh-sach/hoat-hinh",
              data: cartoon,
              gradient: "from-cyan-500 to-blue-600",
            },
          ].map(({ title, link, data, gradient }) => (
            <Box key={title}>
              <MovieThumbTitle
                loading={data.loading}
                href={link}
                title={title}
                gradient={gradient}
                error={data.error}
              />
              <MovieThumb
                data={data.items}
                loading={data.loading}
                error={data.error}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
