"use client";

import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import { TagClassic } from "@/components/movie/TagClassic";
import ShowMoreText from "@/components/ShowMoreText";
import { formatStringForURL, generateUrlImage } from "@/lib/utils";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";

interface SectionInfoProps {
  data: any;
}

const SectionInfo = ({ data }: SectionInfoProps) => {
  return (
    <Box className="flex-1">
      <Box className="flex flex-col gap-6">
        <Box className="flex gap-4">
          <Box className="flex-shrink-0 w-28">
            <Box className="h-0 pt-[150%] relative">
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/placeholder.png";
                }}
                src={generateUrlImage(data?.poster_url)}
                alt={data?.name ?? "Không xác định"}
                objectFit="cover"
                className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
                loading="lazy"
              />
            </Box>
          </Box>
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
        </Box>

        <Box className="flex flex-col gap-4">
          <ShowMoreText text={data?.content} maxLength={260} />
          <Link
            className="text-[#ffd875] text-sm gap-1 hover:underline inline-flex items-center"
            href={`/info/${data?.slug}?name=${formatStringForURL(
              data?.name,
              "-"
            )}`}
          >
            Thông tin phim
            <ChavronRightIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionInfo;
