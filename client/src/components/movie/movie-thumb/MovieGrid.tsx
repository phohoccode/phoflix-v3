"use client";

import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  items: any;
}

const MovieGrid = ({ items }: MovieGridProps) => {
  return (
    <SimpleGrid
      columns={{
        base: 2,
        md: 4,
        lg: 5,
        xl: 6,
        "2xl": 8,
      }}
      gap={4}
    >
      {items?.map((item: any, index: number) => (
        <MovieCard key={index} data={item} orientation="vertical" />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
