"use client";

import { Box } from "@chakra-ui/react";
import MovieBar from "../../movie/MovieBar";

const MovieMain = () => {
  return (
    <Box className="relative z-[10] flex flex-col gap-4 p-8 lg:rounded-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <MovieBar />
    </Box>
  );
};

export default MovieMain;
