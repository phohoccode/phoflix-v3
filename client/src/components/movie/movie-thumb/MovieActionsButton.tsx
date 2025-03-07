"use client";

import InfoIcon from "@/components/icons/InfoIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const MovieActionsButton = () => {
  return (
    <>
      <Link href="#">
        <Button size="sm" colorPalette="purple" variant="solid">
          <PlayIcon />
          Xem ngay
        </Button>
      </Link>
      <Link href="#">
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
