"use client";

import RootLayout from "@/components/layouts/RootLayout";
import FilterBox from "./FilterBox";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import MovieCard from "@/components/movie/movie-thumb/MovieCard";
import SkeletonMovieList from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/EmptyData";
import { useEffect } from "react";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const AdvanceFilter = () => {
  const { items, loading, error, pagination, titlePage } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const dispatch: AppDispatch = useDispatch();
  const useSearchParam = useSearchParams();
  const currentPage = useSearchParam.get("page") || 1;
  const country = useSearchParam.get("country") || "";
  const category = useSearchParam.get("category") || "";
  const sort_lang = useSearchParam.get("sort_lang") || "";
  const year = useSearchParam.get("year") || "";
  const sort_type = useSearchParam.get("sort_type") || "desc";

  useEffect(() => {
    dispatch(
      fetchDataMovieSearch({
        keyword: "a",
        page: currentPage as number,
        limit: 24,
        country: country as any,
        category: category as any,
        sort_lang: sort_lang as any,
        year: year as any,
        sort_type: sort_type as any,
      })
    );
  }, [currentPage]);

  return (
    <RootLayout>
      <Box className="flex flex-col gap-6 lg:pt-28 pt-24">
        <h3 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl title-text font-bold">
          Lọc nâng cao
        </h3>
        <FilterBox />

        <Box className="mt-12">
          {!loading ? (
            <>
              {items?.length > 0 ? (
                <SimpleGrid
                  columns={{ base: 2, md: 4, lg: 6, xl: 8, xlTo2xl: 8 }}
                  gap={4}
                >
                  {items?.map((item: any, index: number) => (
                    <MovieCard key={index} data={item} orientation="vertical" />
                  ))}
                </SimpleGrid>
              ) : (
                <Box className="min-h-screen flex items-center justify-center">
                  <EmptyData
                    title="Chưa có dữ liệu"
                    description="Dữ liệu sẽ được cập nhật sớm nhất"
                  />
                </Box>
              )}
            </>
          ) : (
            <SkeletonMovieList limit={24} />
          )}
        </Box>

        {items?.length >= 24 && (
          <Pagination pagination={pagination} currentPage={currentPage} />
        )}
      </Box>
    </RootLayout>
  );
};

export default AdvanceFilter;
