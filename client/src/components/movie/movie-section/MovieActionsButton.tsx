"use client";

import InfoIcon from "@/components/icons/InfoIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface MovieActionsButtonProps {
  slug:string
}

const MovieActionsButton = ({ slug }: MovieActionsButtonProps) => {
  return (
    <>
      <Link href={`/watching/${slug}`}>
        <Button
          size="sm"
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
        >
          <PlayIcon />
          Xem ngay
        </Button>
      </Link>
      <Link href={`/info/${slug}`}>
        <Button
          size="sm"
          colorPalette="gray"
          colorScheme={"gray"}
          variant="subtle"
        >
          <InfoIcon />
          Chi tiết
        </Button>
      </Link>
    </>
  );
};

export default MovieActionsButton;
