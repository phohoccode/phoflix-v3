"use client";

import { Box, Button, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { SkeletonText } from "../ui/skeleton";

const SkeletonInfoPage = () => {
  return (
    <>
      <Box className="h-0 relative lg:pt-[32%] md:pt-[46%] sm:pt-[50%] pt-[50%]">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </Box>
      <Box className="max-w-[1620px] mx-auto lg:px-14">
        <Box className="mt-[-100px]">
          <SimpleGrid columns={12} gap={0}>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 4 }}>
              <Box className="flex flex-col gap-2 p-6 rounded-4xl lg:items-start items-center lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
                <Box className="w-40 mb-2">
                  <Box className="h-0 relative pt-[150%]">
                    <Skeleton
                      className="absolute inset-0 w-full h-full"
                      rounded="xl"
                    />
                  </Box>
                </Box>
                <SkeletonText noOfLines={1} className="mt-1" />
                <SkeletonText noOfLines={1} className="mt-1" />
                <SkeletonText noOfLines={1} className="mt-1" />
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 8 }}>
              <Box className="relative z-[10] flex flex-col gap-4 p-8 rounded-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
                <Box className="flex gap-6 lg:flex-row lg:items-start items-center flex-col">
                  <Skeleton
                    css={{
                      width: "160px",
                      height: "60px",
                      borderRadius: "9999px",
                    }}
                  />
                  <Box className="flex gap-2">
                    <Skeleton
                      css={{
                        width: "64px",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                    />
                    <Skeleton
                      css={{
                        width: "64px",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                    />
                    <Skeleton
                      css={{
                        width: "64px",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </Box>
                <Box className="flex flex-col gap-2">
                  <SkeletonText
                    noOfLines={1}
                    css={{
                      width: "20%",
                    }}
                  />
                  <Box className="flex gap-2 mt-3 flex-wrap">
                    {[...Array(24)].map((_, index) => (
                      <Skeleton
                        key={index}
                        css={{ width: "10%", height: "30px" }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default SkeletonInfoPage;
