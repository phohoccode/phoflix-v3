"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import PlayIcon from "@/components/icons/PlayIcon";
import { useParams } from "next/navigation";
import MovieTabs from "./MovieTabs";
import FavoriteButton from "@/components/movie/controls/FavoriteButton";
import PlaylistButton from "@/components/movie/controls/PlaylistButton";
import ShareButton from "@/components/movie/controls/ShareButton";
import ReviewButton from "@/components/movie/controls/ReviewButton";
import CommentSection from "@/components/feedback/FeedbackSection";

const MovieMain = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <Box className="relative h-full z-[10] flex flex-col gap-4 lg:p-8 p-6 xl:rounded-tl-4xl xl:rounded-tr-4xl xl:rounded-br-4xl xl:rounded-bl-none lg:rounded-bl-4xl lg:rounded-br-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <Box className="flex flex-col gap-8">
        <Box className="flex gap-6 md:flex-row flex-col md:justify-start justify-center md:items-start items-center ">
          <Link
            href={`/watching/${slug}`}
            className="md:w-44 sm:w-[40%] xs:w-[80%] w-full"
          >
            <Button
              className="w-full h-14 text-lg shadow-lg hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-800"
              rounded="full"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <Box className="flex justify-between gap-6 flex-1 items-center">
            <Box className="flex gap-4">
              <FavoriteButton placement="vertical" />
              <PlaylistButton placement="vertical" />
              <ShareButton placement="vertical" />
            </Box>
            <ReviewButton />
          </Box>
        </Box>
        <Box>
          <MovieTabs />
        </Box>
        <Box>
          <CommentSection />
        </Box>
      </Box>
    </Box>
  );
};

export default MovieMain;
