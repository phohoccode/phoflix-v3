"use client";

import { generateUrlImage, getPositionElement } from "@/lib/utils";
import { Badge, Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MovieTooltip from "./MovieTooltip";
import { createPortal } from "react-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface MovieItemProps {
  data: any;
  orientation?: "horizontal" | "vertical";
}

interface Tooltip {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
}

const MovieCard = ({ data, orientation }: MovieItemProps) => {
  const cuurentElementRef = useRef<HTMLImageElement | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);

  const handleMouseEnter = () => {
    if (windowWidth <= 1280) return;

    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);

    tooltipTimeout.current = setTimeout(() => {
      if (cuurentElementRef.current) {
        const { top, left, width, height } = getPositionElement(
          cuurentElementRef.current
        );

        // lấy vị trí của element hiện tại
        setTooltip({
          top: top + window.scrollY - (height * 1.5) / 2 + height / 2,
          left: left + window.scrollX - (width * 1.5) / 2 + width / 2,
          width: width * 1.5,
          height: height * 1.5,
          visible: true,
        });
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setTooltip(null);
  };

  return (
    <Box
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="#" className="flex flex-col gap-2 group">
        <Box
          className={`h-0 relative ${
            orientation === "horizontal" ? "pb-[62%]" : "pb-[150%]"
          } rounded-xl overflow-hidden`}
        >
          <Image
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/placeholder.png";
            }}
            ref={cuurentElementRef}
            src={generateUrlImage(
              orientation === "horizontal" ? data?.thumb_url : data?.poster_url
            )}
            alt={data?.name ?? "Không xác định"}
            objectFit="cover"
            className="absolute inset-0 w-full h-full rounded-xl border border-gray-800 group-hover:brightness-75 transition-all"
            loading="lazy"
          />
        </Box>
        <span className="lg:text-sm text-xs text-gray-50 truncate group-hover:text-[#f1c40f] transition-all">
          {data?.name}
        </span>
      </Link>
      <Box className="absolute top-2 right-2 lg:flex hidden flex-wrap gap-2">
        <Badge variant={"subtle"} colorPalette="purple">
          {data?.lang ?? "Không xác định"}
        </Badge>
      </Box>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;
