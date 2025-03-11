"use client";

import { Box } from "@chakra-ui/react";
import { Skeleton } from "../ui/skeleton";
import RootLayout from "../layouts/RootLayout";

const SkeletonWachingPage = () => {
  return (
    <Box className="flex flex-col gap-12">
      <Box className="lg:mt-32 mt-24 flex flex-col gap-6 lg:px-4">
        <Skeleton width="50%" height="5" />
        <Box className="relative h-0 lg:pt-[42%] md:pt-[46%] pt-[56%]">
          <Skeleton className="absolute inset-0" width="100%" height="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonWachingPage;
