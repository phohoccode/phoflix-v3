"use client";

import { Box, Skeleton } from "@chakra-ui/react";
import { SkeletonText } from "../ui/skeleton";

const SkeletonSearchPreview = () => {
  return (
    <ul className="flex flex-col gap-4">
      {[...Array(3)]?.map((item: any, index: number) => (
        <li key={index}>
          <Box className="flex gap-4">
            <Box className="w-20 h-28 flex-shrink-0">
              <Skeleton className="w-full h-full" />
            </Box>
            <Box className="flex flex-col gap-2 w-full">
              <SkeletonText
                noOfLines={1}
                className="text-md text-gray-50 font-semibold truncate"
              />
              <SkeletonText noOfLines={1} className="text-sm text-primary" />
            </Box>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonSearchPreview;
