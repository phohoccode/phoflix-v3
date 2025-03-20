"use client";

import { Box } from "@chakra-ui/react";
import { TagClassic } from "./TagClassic";

interface MovieInfoProps {
  data: any;
}

const MovieInfo = ({ data }: MovieInfoProps) => {
  return (
    <Box className="flex flex-col gap-2">
      <h4 className="text-2xl text-gray-50 font-semibold">
        {data?.name ?? "Không xác định"}
      </h4>
      <p className="text-[#ffd875] text-sm">
        {data?.origin_name ?? "Không xác định"}
      </p>
      <Box className="flex flex-wrap gap-2 items-center">
        <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
          <span className="text-[#ffd875] text-xs">TMDb</span>
          <span className="text-gray-50 text-sm ml-1">
            {data?.tmdb?.vote_average ?? "Không xác định"}
          </span>
        </span>
        <TagClassic text={data?.quality ?? "Không xác định"} />
        <TagClassic text={data?.year ?? "Không xác định"} />
        <TagClassic text={data?.lang ?? "Không xác định"} />
        <TagClassic text={data?.time ?? "Không xác định"} />
        <TagClassic text={data?.episode_current ?? "Không xác định"} />
      </Box>
      <Box className="flex flex-wrap gap-2 items-center mt-1">
        {data?.category?.map((category: any, index: number) => (
          <TagClassic
            key={index}
            text={category?.name ?? "Không xác định"}
            isRedirect
            href={`/detail/the-loai/${category?.slug}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieInfo;
