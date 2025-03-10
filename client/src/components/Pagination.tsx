"use client";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { RootState } from "@/store/store";
import { Box, Group, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { toaster } from "./ui/toaster";

interface PaginationProps {
  pagination: {
    totalItems: number | string;
    totalItemsPerPage: number | string;
  };
  currentPage: string | number;
}

const Pagination = ({ pagination, currentPage }: PaginationProps) => {
  const { totalItems, totalItemsPerPage } = pagination;
  const { windowWidth } = useSelector((state: RootState) => state.system);

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page.toString());
    window.history.replaceState({}, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Show toast
    toaster.create({
      title: `Bạn đang xem trang ${page}`,
      description: "Chúc bạn xem phim vui vẻ!",
      placement: "top-end",
      duration: 1500,
    });
  };

  return (
    <Box className="flex mx-auto my-12">
      <PaginationRoot
        size={windowWidth < 768 ? "xs" : "md"}
        count={Number(totalItems)}
        pageSize={Number(totalItemsPerPage)}
        page={currentPage as number}
        siblingCount={1}
        variant="solid"
        onPageChange={(details) => handleChangePage(details.page)}
      >
        <HStack>
          <PaginationItems className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
        </HStack>
      </PaginationRoot>
    </Box>
  );
};

export default Pagination;
