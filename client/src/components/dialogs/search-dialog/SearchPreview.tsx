"use client";

import { TagClassic } from "@/components/movie/TagClassic";
import SkeletonSearchPreview from "@/components/skeletons/SkeletonSearchPreview";
import { generateUrlImage } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import EmptyData from "./EmptyData";

interface SearchPreviewProps {
  keyword: string;
}

const SearchPreview = ({ keyword }: SearchPreviewProps) => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.movie.searchPreview
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
    <ul className="flex flex-col gap-4">
      {items?.map((item: any, index: number) => (
        <li key={index}>
          <Link href="#">
            <Box className="flex gap-4">
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
              <Box>
                <h3 className="text-md text-gray-50 font-semibold truncate">
                  {item?.name ?? "Không xác định"}
                </h3>
                <span className="text-sm text-primary truncate">
                  {item?.origin_name ?? "Không xác định"}
                </span>
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
  );
};

export default SearchPreview;
