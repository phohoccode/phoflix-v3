"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface SlideShowProps {
  items: {
    modified: {
      time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    poster_url: string;
    thumb_url: string;
    year: number;
  }[];
}

const SlideShow = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchSlideShow = async () => {
      try {
        const response = await fetch(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1",
          {
            next: { revalidate: 60 },
            headers: {
              "User-Agent": "Mozilla/5.0",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setItems(data?.items);
      } catch (error) {
        console.error(error);
        setItems([]);
      }
    };
    fetchSlideShow();
  }, []);

  return (
    <>
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Thumbs, EffectFade]}
        thumbs={{ swiper: thumbsSwiper }}
        className="max-h-[600px]"
        effect="fade"
      >
        {items.map((item: any, index) => (
          <SwiperSlide key={index}>
            <img
              src={item?.thumb_url}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideShow;
