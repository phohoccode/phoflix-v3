"use client";

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
    <Box className="relative z-[10] flex flex-col gap-2 p-6 lg:items-start items-center lg:rounded-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
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
