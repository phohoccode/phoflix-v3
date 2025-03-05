"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieItem from "./MovieItem";
import SkeletonMovieThumb from "@/components/skeletons/SkeletonMovieThumb";
import { Box } from "@chakra-ui/react";
import Error from "../Error";

interface MovieThumbProps {
  data: any;
  loading: boolean;
  error: boolean;
  orientation?: "horizontal" | "vertical";
}

const MovieThumb = ({ data, loading, error, orientation }: MovieThumbProps) => {
  if (loading) return <SkeletonMovieThumb />;
  if (error) return <Error />;

  return (
    <Box className="relative ">
      <Swiper
        spaceBetween={20}
        className="movie-slider"
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
          1440: { slidesPerView: 5 },
          1920: { slidesPerView: 6 },
        }}
      >
        {data?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="relative">
            <MovieItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MovieThumb;
