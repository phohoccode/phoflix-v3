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
    <Box className="flex flex-col h-full p-6 gap-2 items-center lg:backdrop-blur-lg lg:bg-[#282b3a8a] xl:items-start xl:rounded-bl-4xl xl:rounded-tl-4xl xl:rounded-tr-4xl lg:rounded-tl-4xl lg:rounded-tr-4xl relative z-[10]">
      <Box className="w-40 mb-2">
        <Box className="h-0 pt-[150%] relative">
          <Image
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/placeholder.png";
            }}
            src={generateUrlImage(data?.poster_url)}
            alt={data?.name ?? "Không xác định"}
            objectFit="cover"
            className="border border-gray-600 h-full rounded-xl w-full absolute inset-0"
            loading="lazy"
          />
        </Box>
      </Box>

      <Box className="flex flex-col gap-2 xl:items-start items-center">
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

      <Box className="flex flex-col gap-4 mt-3">
        <Box className="flex flex-col text-sm gap-2">
          <span className="text-gray-50 font-semibold">Giới thiệu:</span>
          <ShowMoreText text={data?.content} maxLength={240} />
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Đạo diễn:
          </span>
          <ul className="flex flex-wrap gap-2">
            {data?.director?.map((director: any, index: number) => (
              <li key={index} className="text-gray-400">
                {director}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Quốc gia:
          </span>
          <ul className="flex gap-2">
            {data?.country?.map((country: any, index: number) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#ffd875] transition-all"
              >
                <Link href={`/detail/quoc-gia/${country?.slug}`}>
                  {country?.name}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Diễn viên:
          </span>
          <ul className="flex flex-wrap gap-2">
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
