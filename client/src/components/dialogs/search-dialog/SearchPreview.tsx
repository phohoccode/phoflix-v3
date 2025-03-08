"use client";

import { TagClassic } from "@/components/movie/TagClassic";
import SkeletonSearchPreview from "@/components/skeletons/SkeletonSearchPreview";
import { generateUrlImage } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Box, Button, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import EmptyData from "../../EmptyData";
import SearchIcon from "@/components/icons/SearchIcon";
import ChavronRightIcon from "@/components/icons/ChavronRightIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

interface SearchPreviewProps {
  keyword: string;
}

const SearchPreview = ({ keyword }: SearchPreviewProps) => {
  const { items, loading, error, totalItems } = useSelector(
    (state: RootState) => state.movie.searchMoviePreview
  );

  if (keyword?.trim() === "") return null;
  if (loading) return <SkeletonSearchPreview />;
  if (items?.length === 0 && !loading)
    return (
      <EmptyData
        title="Không tìm thấy kết quả"
        description="Hãy thử lại với từ khóa khác"
      />
    );

  return (
    <Box className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {items?.map((item: any, index: number) => (
          <li key={index}>
            <Link href="#" className="block">
              <Box className="flex gap-4 p-2 rounded-lg hover:bg-[#2f3241] transition-all">
                <Box className="w-20 h-28 flex-shrink-0">
                  <Image
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/images/placeholder.png";
                    }}
                    src={generateUrlImage(item?.poster_url)}
                    objectFit="cover"
                    className="w-full h-full rounded-md border border-gray-800"
                    loading="lazy"
                  />
                </Box>
                <Box className="flex-1 overflow-hidden">
                  <h3 className="text-md text-gray-50 truncate">
                    {item?.name ?? "Không xác định"}
                  </h3>
                  <p className="text-xs text-primary truncate">
                    {item?.origin_name ?? "Không xác định"}
                  </p>
                  <Box className="flex flex-wrap gap-2 items-center mt-2">
                    <TagClassic text={item?.quality} />
                    <TagClassic text={item?.lang} />
                    <TagClassic text={item?.year} />
                    <TagClassic text={item?.time} />
                    <TagClassic text={item?.episode_current} />
                  </Box>
                </Box>
              </Box>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/search?keyword=${encodeURIComponent(keyword)}`}
        className="w-full flex items-center gap-2 mt-3 "
      >
        <Button
          size="sm"
          className="w-full bg-[#2f3241] text-gray-50 hover:text-[#f0c14b] transition-all"
        >
          Xem tất cả
          <ArrowRightIcon />
        </Button>
      </Link>
    </Box>
  );
};

export default SearchPreview;
