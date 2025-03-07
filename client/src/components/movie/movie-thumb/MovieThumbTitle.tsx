"use client";

import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import SkeletonMovieThumbTitle from "@/components/skeletons/SkeletonMovieThumbTitle";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface MovieThumbTitleProps {
  loading: boolean;
  href: string;
  title: string;
  gradient: string;
  error: boolean;
}

const MovieThumbTitle = ({
  loading,
  href,
  title,
  gradient,
  error,
}: MovieThumbTitleProps) => {
  if (loading) return <SkeletonMovieThumbTitle />;
  if (error) return null;

  return (
    <Box className="flex justify-between items-center gap-2 mb-6">
      <h3
        className={`lg:text-2xl md:text-xl text-lg font-bold inline-block text-gray-50`}
      >
        {title}
      </h3>
      <Link
        href={href}
        className="lg:text-md text-sm text-gray-50 flex gap-1 items-center transition-all hover:text-[#f1c40f] hover:translate-x-0.5"
      >
        Xem tất cả
        <ChavronRightIcon />
      </Link>
    </Box>
  );
};

export default MovieThumbTitle;
