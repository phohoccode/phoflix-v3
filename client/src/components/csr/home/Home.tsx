"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import SlideShow from "@/components/movie/slide-show/SlideShow";
import { useEffect } from "react";
import {
  fetchDataSlideShow,
  fetchDataMovie,
} from "@/store/asyncThunks/movieAsyncThunk";
import MovieSection from "@/components/movie/MovieSection";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    vietnameseMovies,
    chineseMovies,
    koreanMovies,
    actionMovies,
    emotionalMovies,
    familyMovies,
    historicalDramaMovies,
    scienceFictionMovies,
    horrorMovies,
  } = useSelector((state: RootState) => state.movie.movieData);

  const data = [
    {
      title: "Phim Việt Nam mới",
      link: "/detail/quoc-gia/viet-nam",
      data: vietnameseMovies,
      orientation: "horizontal",
    },
    {
      title: "Phim Trung Quốc mới",
      link: "/detail/quoc-gia/trung-quoc",
      data: chineseMovies,
      orientation: "horizontal",
    },
    {
      title: "Phim Hàn Quốc mới",
      link: "/detail/quoc-gia/han-quoc",
      data: koreanMovies,
      orientation: "horizontal",
    },
    {
      title: "Hành động đỉnh cao",
      link: "/detail/the-loai/hanh-dong",
      data: actionMovies,
      orientation: "vertical",
    },
    {
      title: "Rùng rợn đến tột cùng",
      link: "/detail/the-loai/kinh-di",
      data: horrorMovies,
      orientation: "horizontal",
    },
    {
      title: "Cảm xúc dâng trào",
      link: "/detail/the-loai/tinh-cam",
      data: emotionalMovies,
      orientation: "vertical",
    },
    {
      title: "Gia đình hạnh phúc",
      link: "/detail/the-loai/gia-dinh",
      data: familyMovies,
      orientation: "horizontal",
    },
    {
      title: "Cổ trang kinh điển",
      link: "/detail/the-loai/co-trang",
      data: historicalDramaMovies,
      orientation: "vertical",
    },
    {
      title: "Khoa học viễn tưởng",
      link: "/detail/the-loai/vien-tuong",
      data: scienceFictionMovies,
      orientation: "horizontal",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchDataSlideShow()),
          dispatch(fetchDataMovie({ type: "viet-nam", describe: "quoc-gia" })),
          dispatch(fetchDataMovie({ type: "han-quoc", describe: "quoc-gia" })),
          dispatch(
            fetchDataMovie({ type: "trung-quoc", describe: "quoc-gia" })
          ),
          dispatch(fetchDataMovie({ type: "hanh-dong", describe: "the-loai" })),
          dispatch(fetchDataMovie({ type: "kinh-di", describe: "the-loai" })),
          dispatch(fetchDataMovie({ type: "gia-dinh", describe: "the-loai" })),
          dispatch(fetchDataMovie({ type: "co-trang", describe: "the-loai" })),
          dispatch(fetchDataMovie({ type: "tinh-cam", describe: "the-loai" })),
          dispatch(
            fetchDataMovie({ type: "vien-tuong", describe: "the-loai" })
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
        <Box className="flex flex-col gap-12 overflow-hidden">
          <Box className="bg-gradient-to-b from-[#282b3a] via-transparent via-20% rounded-lg">
            <MovieSection finalData={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
