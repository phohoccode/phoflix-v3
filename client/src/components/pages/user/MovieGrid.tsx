"use client";

import EmptyData from "@/components/EmptyData";
import { toaster } from "@/components/ui/toaster";
import { deleteMovie } from "@/lib/actions/userMovieAction";
import { RootState } from "@/store/store";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { useSession } from "next-auth/react";

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
  const { data: session }: any = useSession();

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

  const handleDeleteMovie = async (slug: string, id: string) => {
    setSlug(slug);
    const response = await deleteMovie({
      userId,
      movieSlug: slug,
      type,
      playlistId: pathname === "/user/playlist" ? selectedPlaylistId : null,
      movieId: type === "history" ? id : null,
      accessToken: session?.user?.accessToken,
    });
    setSlug("");

    if (response?.status) {
      toaster.create({
        title: response?.message,
        type: "success",
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
        <MovieItem
          key={index}
          item={item}
          callback={handleDeleteMovie}
          isLoading={slug === item.slug}
        />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
