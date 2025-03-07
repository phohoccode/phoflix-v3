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
      title: "Phim Việt Nam hay nhất",
      link: "/danh-sach/phim-viet-nam",
      data: vietnameseMovies,
      orientation: "horizontal",
    },
    {
      title: "Phim Trung Quốc hấp dẫn",
      link: "/danh-sach/phim-trung-quoc",
      data: chineseMovies,
      orientation: "horizontal",
    },
    {
      title: "Phim Hàn Quốc không thể bỏ lỡ",
      link: "/danh-sach/phim-han-quoc",
      data: koreanMovies,
      orientation: "horizontal",
    },
    {
      title: "Hành động đỉnh cao",
      link: "/danh-sach/hanh-dong",
      data: actionMovies,
      orientation: "vertical",
    },
    {
      title: "Rùng rợn đến tột cùng",
      link: "/danh-sach/kinh-di",
      data: horrorMovies,
      orientation: "horizontal",
    },
    {
      title: "Cảm xúc dâng trào",
      link: "/danh-sach/tinh-cam",
      data: emotionalMovies,
      orientation: "vertical",
    },
    {
      title: "Phim gia đình ấm áp",
      link: "/danh-sach/phim-gia-dinh",
      data: familyMovies,
      orientation: "horizontal",
    },
    {
      title: "Phim cổ trang kinh điển",
      link: "/danh-sach/phim-co-trang",
      data: historicalDramaMovies,
      orientation: "vertical",
    },
    {
      title: "Phim khoa học viễn tưởng",
      link: "/danh-sach/phim-khoa-hoc-vien-tuong",
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
