"use client";

import EmptyData from "@/components/EmptyData";
import { toaster } from "@/components/ui/toaster";
import { deleteMovie } from "@/lib/actions/userActionClient";
import { formatStringForURL, generateUrlImage } from "@/lib/utils";
import { Box, IconButton, Image, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface MovieGridProps {
  items: any;
  userId: string;
  type: "favorite" | "playlist" | "history";
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
}

const MovieGrid = ({ items, colums, userId, type }: MovieGridProps) => {
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();

  const handleDeleteMovie = async (slug: string) => {
    setSlug(slug);
    const response = await deleteMovie({
      userId,
      movieSlug: slug,
      type,
    });
    setSlug("");

    if (response?.status) {
      // Handle success response
      toaster.create({
        title: response?.message,
        type: "info",
        duration: 2000,
      });

      router.refresh();
    } else {
      toaster.create({
        title: response?.message,
        type: "error",
        duration: 2000,
      });
    }
  };

  if (items?.length === 0) {
    return (
      <Box className="flex items-center justify-center h-96 w-full">
        <EmptyData
          title="Danh sách phim đang trống"
          description="Hãy thêm phim vào danh sách của bạn"
        />
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={colums || { base: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
      gap={4}
    >
      {items?.map((item: any, index: number) => (
        <Box className="relative" key={index}>
          <Link
            href={`/info/${item?.movie_slug}?name=${formatStringForURL(
              item?.movie_name ?? "Không xác định",
              "-"
            )}`}
            className="flex flex-col gap-2 group"
          >
            <Box className="h-0 relative pb-[150%] rounded-xl overflow-hidden">
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/placeholder.png";
                }}
                src={generateUrlImage(item?.movie_poster)}
                alt={item?.movie_name ?? "Không xác định"}
                objectFit="cover"
                className="absolute inset-0 w-full h-full rounded-xl border border-gray-800 group-hover:brightness-75 transition-all"
                loading="lazy"
              />
            </Box>
            <span
              style={{
                WebkitLineClamp: 2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              className="lg:text-sm text-xs text-gray-50 group-hover:text-[#f1c40f] transition-all"
            >
              {item?.movie_name}
            </span>
          </Link>
          <IconButton
            size="xs"
            loading={slug === item?.movie_slug}
            onClick={() => handleDeleteMovie(item?.movie_slug)}
            aria-label="Xóa"
            colorPalette="red"
            className="absolute top-2 right-2 text-gray-50"
          >
            <MdDelete />
          </IconButton>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
