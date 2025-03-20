"use client";

import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import MovieInfo from "@/components/movie/MovieInfo";
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
          <MovieInfo data={data} />
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
