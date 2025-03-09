"use client";

import { Box, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";

interface SkeletonMovieListProps {
  limit?: number;
}

const SkeletonMovieList = ({ limit = 24 }: SkeletonMovieListProps) => {
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
      {[...Array(limit)].map((_, index) => (
        <GridItem key={index}>
          <Box className="pb-[150%] h-0 relative">
            <Skeleton className="absolute inset-0 w-full h-full" rounded="xl" />
          </Box>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default SkeletonMovieList;
