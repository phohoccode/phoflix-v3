"use client";

import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface SkeletonMovieThumbProps {
  orientation: "horizontal" | "vertical";
}

const SkeletonMovieThumb = ({ orientation }: SkeletonMovieThumbProps) => {
  return (
    <Swiper
      className="movie-slider"
      breakpoints={{
        320: {
          slidesPerView: orientation === "horizontal" ? 2 : 3,
          spaceBetween: 8,
        },
        768: {
          slidesPerView: orientation === "horizontal" ? 3 : 4,
          spaceBetween: 8,
        },
        1024: {
          slidesPerView: orientation === "horizontal" ? 3 : 4,
          spaceBetween: 8,
        },
        1280: {
          slidesPerView: orientation === "horizontal" ? 4 : 5,
          spaceBetween: 12,
        },
        1440: {
          slidesPerView: orientation === "horizontal" ? 5 : 6,
          spaceBetween: 16,
        },
        1920: {
          slidesPerView: orientation === "horizontal" ? 6 : 8,
          spaceBetween: 18,
        },
      }}
    >
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} className="relative">
          <Skeleton
            className={`w-full rounded-xl
            ${
              orientation === "horizontal"
                ? "lg:h-48 md:h-36 h-24"
                : "lg:h-72 md:h-64 h-48"
            }
            `}
          />
          <SkeletonText noOfLines={1} className="mt-2" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonMovieThumb;
