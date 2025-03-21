"use client";

import {
  formatStringForURL,
  generateUrlImage,
  getPositionElement,
} from "@/lib/utils";
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
      <Link
        href={`/info/${data?.slug}?name=${formatStringForURL(data?.name, "-")}`}
        className="flex flex-col gap-2 group"
      >
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
            className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
            loading="lazy"
          />
        </Box>
        <span
          style={{
            WebkitLineClamp: 2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          className="text-gray-50 text-xs group-hover:text-[#ffd875] lg:text-sm transition-all"
        >
          {data?.name}
        </span>
      </Link>

      {tooltip?.visible && <MovieTooltip data={data} position={tooltip} />}
    </Box>
  );
};

export default MovieCard;
