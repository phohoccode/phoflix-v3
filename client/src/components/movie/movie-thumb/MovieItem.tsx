"use client";

import { generateUrlImage } from "@/lib/utils";
import { Badge, Box, Image, Tag } from "@chakra-ui/react";
import Link from "next/link";

interface MovieItemProps {
  data: any;
  orientation?: "horizontal" | "vertical";
}

const MovieItem = ({ data, orientation }: MovieItemProps) => {
  return (
    <Box className="relative">
      <Link href="#" className="flex flex-col gap-2 group">
        <Box className="w-full lg:h-48 h-24 rounded-xl overflow-hidden">
          <Image
            src={generateUrlImage(data?.thumb_url)}
            alt={data?.name}
            objectFit="cover"
            className="w-full h-full border border-gray-800 group-hover:scale-125 group-hover:brightness-75 transition-all"
            loading="lazy"
          />
        </Box>
        <span className="text-sm text-gray-50 truncate font-semibold group-hover:text-[#f1c40f] transition-all">
          {data?.name}
        </span>
      </Link>
      <Box className="absolute top-2 right-2 flex flex-wrap gap-2">
        <Badge variant={"subtle"} colorPalette="green">
          {data?.quality}
        </Badge>
        <Badge variant={"subtle"} colorPalette="purple">
          {data?.lang}
        </Badge>
      </Box>
    </Box>
  );
};

export default MovieItem;
