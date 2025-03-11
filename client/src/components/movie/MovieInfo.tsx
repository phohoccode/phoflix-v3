"use client";

import { Box } from "@chakra-ui/react";
import { TagClassic } from "./TagClassic";

interface MovieInfoProps {
  data: any;
}

const MovieInfo = ({ data }: MovieInfoProps) => {
  return (
    <Box className="flex flex-col gap-2">
      <h4 className="text-2xl font-semibold text-gray-50">
        {data?.name ?? "Không xác định"}
      </h4>
      <p className="text-sm text-[#f1c40f]">
        {data?.origin_name ?? "Không xác định"}
      </p>
      <Box className="flex items-center gap-2 flex-wrap">
        <span className="p-1 h-6 rounded-md inline-flex items-center justify-center bg-transparent border border-[#f1c40f]">
          <span className="text-[#f1c40f] text-xs">TMDb</span>
          <span className="ml-1 text-gray-50 text-sm">
            {data?.tmdb?.vote_average ?? "Không xác định"}
          </span>
        </span>
        <TagClassic text={data?.quality ?? "Không xác định"} />
        <TagClassic text={data?.year ?? "Không xác định"} />
        <TagClassic text={data?.lang ?? "Không xác định"} />
        <TagClassic text={data?.time ?? "Không xác định"} />
        <TagClassic text={data?.episode_current ?? "Không xác định"} />
      </Box>
      <Box className="flex items-center gap-2 flex-wrap mt-1">
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
