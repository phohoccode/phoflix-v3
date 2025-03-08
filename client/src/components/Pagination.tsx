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

interface PaginationProps {
  pagination: {
    totalPages: number | string;
    totalItemsPerPage: number | string;
  };
  currentPage: string | number;
}

const Pagination = ({ pagination, currentPage }: PaginationProps) => {
  const { totalPages, totalItemsPerPage } = pagination;
  const { windowWidth } = useSelector((state: RootState) => state.system);

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    window.history.replaceState({}, "", `?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box className="flex mx-auto my-12">
      <PaginationRoot
        size={windowWidth < 768 ? "xs" : "md"}
        count={Number(totalPages)}
        pageSize={Number(totalItemsPerPage)}
        page={currentPage as number}
        siblingCount={1}
        variant="solid"
        onPageChange={(details) => handleChangePage(details.page)}
      >
        <HStack>
          <PaginationPrevTrigger className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
          <PaginationItems className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
          <PaginationNextTrigger className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
        </HStack>
      </PaginationRoot>
    </Box>
  );
};

export default Pagination;
