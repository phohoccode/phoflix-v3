"use client";

import { Box } from "@chakra-ui/react";
import PlusIcon from "../../icons/PlusIcon";
import SendIcon from "../../icons/SendIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import FavoriteButton from "./FavoriteButton";
import PlaylistButton from "./PlaylistButton";

interface SectionControlsProps {
  placement?: "vertical" | "horizontal";
}

const SectionControls = ({ placement = "vertical" }: SectionControlsProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { data: sesstion } = useSession();

  return (
    <Box className="flex gap-4">
      <FavoriteButton placement={placement} />
      <PlaylistButton placement={placement} />
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
