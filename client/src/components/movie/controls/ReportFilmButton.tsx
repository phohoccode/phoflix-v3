"use client";

import { Box } from "@chakra-ui/react";
import { FaFlag } from "react-icons/fa6";

interface ReportFilmButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const ReportFilmButton = ({
  placement = "horizontal",
  responsiveText = false,
}: ReportFilmButtonProps) => {
  return (
    <Box
      className={`p-2 sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <FaFlag />
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Báo lỗi
      </span>
    </Box>
  );
};

export default ReportFilmButton;
