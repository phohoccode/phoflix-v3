"use client";

import { toaster } from "@/components/ui/toaster";
import {
  addNewMovie,
  checkMovieExists,
  deleteMovie,
} from "@/lib/actions/userActionClient";
import { RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { useSelector } from "react-redux";

interface FavoriteButtonProps {
  placement?: "vertical" | "horizontal";
}

const FavoriteButton = ({ placement }: FavoriteButtonProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [favorite, setFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: sesstion } = useSession();

  useEffect(() => {
    if (sesstion) {
      startTransition(handleCheckMovieExists);
    }
  }, []);

  const handleCheckMovieExists = async () => {
    const response = await checkMovieExists({
      userId: sesstion?.user?.id as string,
      movieSlug: movie?.slug,
      type: "favorite",
    });

    setFavorite(response?.status ?? false);
  };

  const handleActionsFavorite = () => {
    if (!sesstion) {
      return toaster.create({
        title: "Vui lòng đăng nhập để thực hiện hành động này.",
        type: "info",
        duration: 2000,
      });
    }

    let response: any = null;

    startTransition(async () => {
      response = !favorite
        ? await addNewMovie({
            userId: sesstion.user?.id as string,
            movieData: {
              movieName: movie?.name,
              movieSlug: movie?.slug,
              moviePoster: movie?.poster_url,
              movieThumbnail: movie?.thumb_url,
            },
            type: "favorite",
          })
        : await deleteMovie({
            userId: sesstion.user?.id as string,
            movieSlug: movie?.slug,
            type: "favorite",
          });

      if (response?.status) {
        setFavorite(response?.result?.action === "favorite" ? true : false);
        toaster.create({
          title: response?.message,
          type: "info",
          duration: 2000,
        });

        handleCheckMovieExists();
      } else {
        toaster.create({
          title: response?.message,
          type: "error",
          duration: 2000,
        });
      }
    });
  };

  if (isPending) return;

  return (
    <Box
      onClick={handleActionsFavorite}
      className={`p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-[#ffffff05] 
          ${placement === "vertical" ? "flex-col" : "flex-row"}
          ${isPending ? "opacity-50" : ""}
          ${favorite ? "text-[#ffd875]" : "text-gray-50"}
        `}
    >
      {isPending ? (
        <Spinner />
      ) : favorite ? (
        <IoMdHeartDislike />
      ) : (
        <IoMdHeart />
      )}
      <span className="text-xs">{favorite ? "Bỏ yêu thích" : "Yêu thích"}</span>
    </Box>
  );
};

export default FavoriteButton;
