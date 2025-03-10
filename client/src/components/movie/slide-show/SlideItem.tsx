"use client";

import { Box, Button, Image } from "@chakra-ui/react";
import Link from "next/link";
import PlayIcon from "../../icons/PlayIcon";
import InfoIcon from "../../icons/InfoIcon";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TagClassic } from "../TagClassic";
import "@/assets/css/movie.css";
import MovieActionsButton from "../movie-thumb/MovieActionsButton";

const SlideItem = ({ item }: any) => {
  const { windowWidth } = useSelector((state: RootState) => state.system);

  return (
    <Box className="relative lg:before:absolute lg:before:inset-0 lg:before:bg-[url('/images/dotted.png')] lg:before:bg-repeat lg:before:opacity-20 lg:before:z-[1]">
      <Link href={"#"}>
        <Image
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/placeholder.png";
          }}
          src={item?.thumb_url ?? "/images/placeholder.jpg"}
          alt={item?.name ?? "Không xác định"}
          objectFit="cover"
          loading="lazy"
          className="lg:h-[600px] md:h-[400px] h-[300px] w-full brightness-[0.85]"
        />
      </Link>

      <Box className="absolute bottom-2 left-2 right-2 lg:pl-6 lg:pr-6 lg:pb-20 p-4 slide-in z-10">
        <h4 className="font-bold title-text lg:text-4xl md:text-2xl lg:inline-block block text-xl truncate lg:text-left text-center ">
          {item?.name ?? "Không xác định"}
        </h4>
        <Box className="flex gap-2 items-center flex-wrap lg:justify-start justify-center mt-3">
          <TagClassic text={item?.quality ?? "Không xác định"} />
          <TagClassic text={item?.year ?? "Không xác định"} />
          <TagClassic text={item?.lang ?? "Không xác định"} />
          <TagClassic text={item?.time ?? "Không xác định"} />
          <TagClassic text={item?.episode_current ?? "Không xác định"} />
        </Box>
        {windowWidth > 1024 && (
          <>
            <Box className="flex flex-wrap gap-2 mt-2">
              {item?.category?.map((caterogy: any, index: number) => (
                <TagClassic
                  key={index}
                  text={caterogy?.name ?? "Không xác định"}
                  isRedirect
                  href={`/detail/the-loai/${caterogy?.slug}`}
                />
              ))}
            </Box>
            <Box className="flex gap-2 items-center mt-6">
              <MovieActionsButton item={item}/>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SlideItem;
