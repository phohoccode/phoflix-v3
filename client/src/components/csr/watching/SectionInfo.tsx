"use client";

import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import MovieInfo from "@/components/movie/MovieInfo";
import ShowMoreText from "@/components/ShowMoreText";
import { formatStringForURL, generateUrlImage } from "@/lib/utils";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { format } from "path";

interface SectionInfoProps {
  data: any;
}

const SectionInfo = ({ data }: SectionInfoProps) => {
  return (
    <Box className="flex-1">
      <Box className="flex flex-col gap-6">
        <Box className="flex gap-4">
          <Box className="w-28 flex-shrink-0">
            <Box className="relative h-0 pt-[150%]">
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/placeholder.png";
                }}
                src={generateUrlImage(data?.poster_url)}
                alt={data?.name ?? "Không xác định"}
                objectFit="cover"
                className="absolute inset-0 w-full h-full rounded-xl border border-gray-800 group-hover:brightness-75 transition-all"
                loading="lazy"
              />
            </Box>
          </Box>
          <MovieInfo data={data} />
        </Box>

        <Box className="flex flex-col gap-4">
          <ShowMoreText text={data?.content} maxLength={260}/>
          <Link
            className="inline-flex items-center gap-1 text-sm text-[#f1c40f] hover:underline"
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
