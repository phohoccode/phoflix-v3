"use client";

import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  return (
    <Box className="relative border border-[#ffffff10] h-0 lg:pt-[42%] md:pt-[46%] pt-[56%] xl:rounded-tl-2xl xl:rounded-tr-2xl overflow-hidden">
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
