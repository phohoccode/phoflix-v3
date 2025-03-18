"use client";

import { Box } from "@chakra-ui/react";
import HeartIcon from "../icons/HeartIcon";
import PlusIcon from "../icons/PlusIcon";
import SendIcon from "../icons/SendIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface SectionControlsProps {
  placement?: "vertical" | "horizontal";
}

const SectionControls = ({ placement = "vertical" }: SectionControlsProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  return (
    <Box className="flex gap-4">
      <Box
        className={`p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
          placement === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        <HeartIcon />
        <span className="text-xs">Yêu thích</span>
      </Box>
      <Box
        className={`p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
          placement === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        <PlusIcon />
        <span className="text-xs">Thêm vào</span>
      </Box>
      <Box
        className={`p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
          placement === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        <SendIcon />
        <span className="text-xs">Chia sẻ</span>
      </Box>
    </Box>
  );
};

export default SectionControls;
