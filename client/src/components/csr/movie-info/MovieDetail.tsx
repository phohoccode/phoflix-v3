"use client";

import MovieInfo from "@/components/movie/MovieInfo";
import { TagClassic } from "@/components/movie/TagClassic";
import ShowMoreText from "@/components/ShowMoreText";
import { generateUrlImage } from "@/lib/utils";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";

interface MovieDetailProps {
  data: any;
}

const MovieDetail = ({ data }: MovieDetailProps) => {
  return (
    <Box className="relative z-[10] h-full flex flex-col gap-2 p-6 lg:items-start items-center lg:rounded-tl-4xl lg:rounded-tr-4xl lg:rounded-bl-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <Box className="w-40 mb-2">
        <Box className="h-0 relative pt-[150%]">
          <Image
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/placeholder.png";
            }}
            src={generateUrlImage(data?.poster_url)}
            alt={data?.name ?? "Không xác định"}
            objectFit="cover"
            className="absolute inset-0 w-full h-full rounded-xl border border-gray-600"
            loading="lazy"
          />
        </Box>
      </Box>

      <MovieInfo data={data} />

      <Box className="flex flex-col gap-4 mt-3">
        <Box className="flex gap-2 flex-col text-sm">
          <span className="font-semibold text-gray-50">Giới thiệu:</span>
          <ShowMoreText text={data?.content} maxLength={240} />
        </Box>
        <Box className="flex gap-2 text-sm">
          <span className="font-semibold text-gray-50 whitespace-nowrap">
            Đạo diễn:
          </span>
          <ul className="flex gap-2 flex-wrap">
            {data?.director?.map((director: any, index: number) => (
              <li key={index} className="text-gray-400">
                {director}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex gap-2 text-sm">
          <span className="font-semibold text-gray-50 whitespace-nowrap">
            Quốc gia:
          </span>
          <ul className="flex gap-2">
            {data?.country?.map((country: any, index: number) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#f1c40f] transition-all"
              >
                <Link href={`/detail/quoc-gia/${country?.slug}`}>
                  {country?.name}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex gap-2 text-sm">
          <span className="font-semibold text-gray-50 whitespace-nowrap">
            Diễn viên:
          </span>
          <ul className="flex gap-2 flex-wrap">
            {data?.actor?.map((actor: any, index: number) => (
              <li key={index} className="text-gray-400">
                {actor}
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;
