"use client";

import { PaginationItems, PaginationRoot } from "@/components/ui/pagination";
import { Box, HStack } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";
import { useRouter } from "next/navigation";

interface PaginationProps {
  pagination: {
    totalItems: number | string;
    totalItemsPerPage: number | string;
  };
  currentPage: string | number;
  ref?: any;
}

const Pagination = ({ pagination, currentPage, ref }: PaginationProps) => {
  const { totalItems, totalItemsPerPage } = pagination;
  const router = useRouter();

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    // Show toast
    toaster.create({
      title: `Bạn đang xem trang ${page}`,
      description: "Chúc bạn xem phim vui vẻ!",
      placement: "top-end",
      duration: 1500,
    });
  };

  return (
    <Box className="flex mx-auto mt-12">
      <PaginationRoot
        size="md"
        count={Number(totalItems)}
        pageSize={Number(totalItemsPerPage)}
        page={Number(currentPage)}
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
