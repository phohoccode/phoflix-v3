"use client";

import { createPortal } from "react-dom";
import "@/assets/css/animation.css";
import { Box, Button, Image } from "@chakra-ui/react";
import { generateUrlImage } from "@/lib/utils";
import Link from "next/link";
import PlayIcon from "@/components/icons/PlayIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import { TagClassic } from "../slide-show/SlideItem";

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
        width: position.width,
        minHeight: position.height,
      }}
      className="absolute tooltip-animation bg-[#2f3346] text-white rounded-lg overflow-hidden shadow-lg z-50"
    >
      <Image
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/images/placeholder.png";
        }}
        src={generateUrlImage(data?.thumb_url)}
        alt={data?.name}
        className="w-full h-48 object-cover"
      />

      <Box className="p-4 bg-[#2f3346] h-full">
        <h4 className="text-lg">{data?.name ?? "Không xác định"}</h4>
        <span className="text-sm text-[#f1c40f]">
          {data?.origin_name ?? "Không xác định"}
        </span>
        <Box className="flex items-center gap-2 mt-2 mb-4">
          <Link href="#">
            <Button
              size="sm"
              rounded={"full"}
              colorPalette="purple"
              variant="solid"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <Link href="#">
            <Button
              rounded={"full"}
              size="sm"
              colorPalette="gray"
              colorScheme={"gray"}
              variant="subtle"
            >
              <InfoIcon />
              Chi tiết
            </Button>
          </Link>
        </Box>
        <Box className="flex items-center gap-2 flex-wrap">
          <TagClassic text={data?.quality ?? "Không xác định"} />
          <TagClassic text={data?.year ?? "Không xác định"} />
          <TagClassic text={data?.lang ?? "Không xác định"} />
          <TagClassic text={data?.time ?? "Không xác định"} />
          <TagClassic text={data?.episode_current ?? "Không xác định"} />
        </Box>
      </Box>
    </div>,
    document.body
  );
};

export default MovieTooltip;
