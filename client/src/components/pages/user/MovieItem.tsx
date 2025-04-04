"use client";

import { formatDate, formatStringForURL, generateUrlImage } from "@/lib/utils";
import { Box, IconButton, Image as ImageCharka } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface MovieItemProps {
  item: any;
  isLoading: boolean;
  callback: (slug: string, id: string) => void;
}

const MovieItem = ({ item, isLoading, callback }: MovieItemProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = item?.movie_poster;
    img.onload = () => setLoaded(true);
  }, [item?.movie_poster]);

  return (
    <Box className="group">
      <Box className="relative">
        <Link
          href={`/info/${item?.movie_slug}?name=${formatStringForURL(
            item?.movie_name ?? "Không xác định",
            "-"
          )}`}
          className="flex flex-col gap-2 group"
        >
          <Box className="h-0 rounded-xl overflow-hidden pb-[150%] relative">
            <ImageCharka
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/images/notfound.png";
              }}
              src={
                loaded
                  ? generateUrlImage(item?.movie_poster)
                  : "/images/placeholder.jpg"
              }
              alt={item?.movie_name ?? "Không xác định"}
              objectFit="cover"
              className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
              loading="lazy"
            />
          </Box>
        </Link>
        <span className="lg:text-xs lg:max-w-24 max-w-20 truncate text-[10px] rounded-sm bg-[#25272f] text-gray-50 lg:px-1 lg:py-0.5 px-1 py-0 absolute left-2 top-2">
          {formatDate(item?.created_at)}
        </span>
        <IconButton
          size="xs"
          loading={isLoading}
          onClick={() => callback(item?.movie_slug, item?.id)}
          aria-label="Xóa"
          className="absolute right-2 bottom-2 bg-gray-50 text-gray-900 lg:w-8 lg:min-w-8 lg:h-8 min-w-6 w-6 h-6"
        >
          <MdDelete />
        </IconButton>
      </Box>
      <Link
        href={`/info/${item?.movie_slug}?name=${formatStringForURL(
          item?.movie_name ?? "Không xác định",
          "-"
        )}`}
        style={{
          WebkitLineClamp: 2,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        className="text-gray-50 text-xs group-hover:text-[#ffd875] lg:text-sm transition-all mt-2"
      >
        {item?.movie_name}
      </Link>
    </Box>
  );
};

export default MovieItem;
