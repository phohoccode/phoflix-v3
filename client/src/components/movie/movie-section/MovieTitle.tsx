"use client";

import SkeletonMovieThumbTitle from "@/components/skeletons/SkeletonMovieThumbTitle";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightWideLine } from "react-icons/ri";

interface MovieThumbTitleProps {
  loading: boolean;
  href: string;
  title: string;
  error: boolean;
}

const MovieThumbTitle = ({
  loading,
  href,
  title,
  error,
}: MovieThumbTitleProps) => {
  if (loading) return <SkeletonMovieThumbTitle />;
  if (error) return null;

  return (
    <Box className="flex justify-between gap-2 items-center mb-6">
      <h3 className="lg:text-2xl md:text-xl text-md font-bold inline-block text-gray-50">
        {title}
      </h3>
      <Link
        href={href}
        className="flex text-gray-50 text-sm gap-1 hover:text-[#ffd875] hover:translate-x-0.5 items-center lg:text-md transition-all"
      >
        Xem tất cả
        <RiArrowRightWideLine />
      </Link>
    </Box>
  );
};

export default MovieThumbTitle;
