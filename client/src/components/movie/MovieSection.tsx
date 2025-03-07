"use client";

import { Box } from "@chakra-ui/react";
import MovieCollection from "./MovieCollection";

interface MovieSectionProps {
  finalData: any;
}

const MovieSection = ({ finalData }: MovieSectionProps) => {
  return (
    <Box className="flex flex-col gap-12 lg:p-6 p-4">
      {finalData?.map(({ title, link, data, gradient, orientation }: any) => (
        <Box key={title}>
          <MovieCollection
            title={title}
            link={link}
            data={data}
            gradient={gradient}
            orientation={orientation}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MovieSection;
