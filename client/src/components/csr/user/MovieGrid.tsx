"use client";

import EmptyData from "@/components/EmptyData";
import { toaster } from "@/components/ui/toaster";
import { deleteMovie } from "@/lib/actions/userActionClient";
import { formatStringForURL, generateUrlImage } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Box, IconButton, Image, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

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
  const searchParams = useSearchParams();
  const { selectedPlaylistId } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();

  const updatePageAndRefresh = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    if ((!items || items.length === 0) && currentPage > 1) {
      updatePageAndRefresh(currentPage - 1);
    }
  }, [items, searchParams]);

  const handleDeleteMovie = async (slug: string) => {
    setSlug(slug);
    const response = await deleteMovie({
      userId,
      movieSlug: slug,
      type,
      playlistId: pathname === "/user/playlist" ? selectedPlaylistId : null,
    });
    setSlug("");

    if (response?.status) {
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

  if (!items || items?.length === 0) {
    return (
      <Box className="flex h-64 justify-center w-full items-center">
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
            <Box className="h-0 rounded-xl overflow-hidden pb-[150%] relative">
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/placeholder.png";
                }}
                src={generateUrlImage(item?.movie_poster)}
                alt={item?.movie_name ?? "Không xác định"}
                objectFit="cover"
                className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
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
              className="text-gray-50 text-xs group-hover:text-[#ffd875] lg:text-sm transition-all"
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
            className="text-gray-50 absolute right-2 top-2"
          >
            <MdDelete />
          </IconButton>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
