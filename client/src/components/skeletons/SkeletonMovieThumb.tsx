"use client";

import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SkeletonMovieThumb = () => {
  const windowWidth = useSelector(
    (state: RootState) => state.system.windowWidth
  );

  return (
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
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} className="relative">
          <Skeleton className="lg:h-48 h-24 w-full rounded-xl" />
          <SkeletonText noOfLines={1} className="mt-2" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonMovieThumb;
