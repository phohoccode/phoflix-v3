"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SlideItem from "./SlideItem";
import { Skeleton } from "@chakra-ui/react";
import Error from "../Error";

const SlideShow = () => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.movie.slideShows
  );

  if (loading)
    return (
      <Skeleton
        className="lg:h-[600px] md:h-[400px] h-[300px]"
        loading
        rounded={0}
      />
    );

  if (error) return <Error />;

  return (
    <Swiper
      modules={[Autoplay, Thumbs, EffectFade]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      effect="fade"
      allowTouchMove={true}
      loop={true}
      className="w-full lg:h-[600px] md:h-[400px] h-[300px] relative"
    >
      {items.map((item, index: number) => (
        <SwiperSlide key={index} className="h-full">
          <SlideItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideShow;
