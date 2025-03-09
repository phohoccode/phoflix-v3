"use client";

import { Box } from "@chakra-ui/react";

interface BackgroundMovieProps {
  url: string;
}

const BackgroundMovie = ({ url }: BackgroundMovieProps) => {
  return (
    <Box className="h-0 relative lg:pt-[32%] md:pt-[46%] sm:pt-[50%] pt-[50%] before:absolute before:inset-0 before:bg-[url('/images/dotted.png')] before:bg-repeat before:opacity-20 before:z-[1]">
      <Box
        style={{
          backgroundImage: `url(${url})`,
        }}
        className="absolute rounded-b-3xl inset-0 w-full h-full bg-cover bg-center opacity-50"
      />
    </Box>
  );
};

export default BackgroundMovie;
