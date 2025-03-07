"use client";

import MovieThumb from "@/components/movie/movie-thumb/MovieThumb";
import MovieThumbTitle from "@/components/movie/movie-thumb/MovieThumbTitle";
import { Box } from "@chakra-ui/react";

interface MovieCollectionProps {
  title: string;
  link: string;
  data: {
    loading: boolean;
    error: boolean;
    items: any[];
  };
  gradient: string;
  orientation: "horizontal" | "vertical";
}

const MovieCollection = ({
  title,
  link,
  data,
  gradient,
  orientation,
}: MovieCollectionProps) => {
  return (
    <Box>
      <MovieThumbTitle
        loading={data.loading}
        href={link}
        title={title}
        gradient={gradient}
        error={data.error}
      />
      <Box>
        <MovieThumb
          items={data.items}
          loading={data.loading}
          error={data.error}
          orientation={orientation}
        />
      </Box>
    </Box>
  );
};

export default MovieCollection;
