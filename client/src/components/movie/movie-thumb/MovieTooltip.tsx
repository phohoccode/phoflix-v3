"use client";

import { createPortal } from "react-dom";
import "@/assets/css/animation.css";
import { Box, Button, Image } from "@chakra-ui/react";
import { generateUrlImage } from "@/lib/utils";
import Link from "next/link";
import PlayIcon from "@/components/icons/PlayIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { TagClassic } from "../TagClassic";
import MovieActionsButton from "./MovieActionsButton";

interface MovieTooltipProps {
  data: any;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const MovieTooltip = ({ data, position }: MovieTooltipProps) => {
  return createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        // width: position.width,
        width: "420px",
        minHeight: position.height,
      }}
      className="absolute tooltip-animation bg-[#2f3346] text-white rounded-lg overflow-hidden shadow-lg z-50"
    >
      <div className="relative">
        <Image
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/placeholder.png";
          }}
          src={generateUrlImage(data?.thumb_url)}
          alt={data?.name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2f3346] to-transparent"></div>
      </div>

      <Box className="p-4 bg-[#2f3346] h-full">
        <h4 className="text-lg">{data?.name ?? "Không xác định"}</h4>
        <p className="text-sm text-[#f1c40f]">
          {data?.origin_name ?? "Không xác định"}
        </p>
        <Box className="flex items-center gap-2 mt-2 mb-4">
          <MovieActionsButton item={data} />
        </Box>
        <Box className="flex items-center gap-2 flex-wrap">
          <TagClassic text={data?.quality ?? "Không xác định"} />
          <TagClassic text={data?.year ?? "Không xác định"} />
          <TagClassic text={data?.lang ?? "Không xác định"} />
          <TagClassic text={data?.time ?? "Không xác định"} />
          <TagClassic text={data?.episode_current ?? "Không xác định"} />
        </Box>
        <Box className="flex items-center gap-2 flex-wrap mt-3">
          {data?.category?.map((category: any, index: number) => (
            <TagClassic
              key={index}
              text={category?.name ?? "Không xác định"}
              isRedirect
              href="#"
            />
          ))}
        </Box>
      </Box>
    </div>,
    document.body
  );
};

export default MovieTooltip;
