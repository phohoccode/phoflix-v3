"use client";

import InfoIcon from "@/components/icons/InfoIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface MovieActionsButtonProps {
  item: any;
}

const MovieActionsButton = ({ item }: MovieActionsButtonProps) => {
  return (
    <>
      <Link href={`/watching/${item?.slug}`}>
        <Button
          size="sm"
          colorPalette="yellow"
          variant="solid"
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
        >
          <PlayIcon />
          Xem ngay
        </Button>
      </Link>
      <Link href={`/info/${item?.slug}`}>
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
