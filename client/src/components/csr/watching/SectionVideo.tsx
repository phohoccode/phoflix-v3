"use client";

import RootLayout from "@/components/layouts/RootLayout";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Box className="relative h-0 lg:pt-[42%] md:pt-[46%] pt-[56%]">
      <iframe
        src={currentEpisode?.link_embed}
        title={currentEpisode?.name}
        frameBorder="0"
        allowFullScreen
        className="absolute w-full h-full inset-0"
      ></iframe>
    </Box>
  );
};

export default SectionVideo;
