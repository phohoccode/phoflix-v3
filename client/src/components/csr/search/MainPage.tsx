"use client";

import RootLayout from "@/components/layouts/RootLayout";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Skeleton } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/assets/css/movie.css";
import Pagination from "@/components/Pagination";
import SkeletonMovieList from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/EmptyData";
import MovieGrid from "@/components/movie/movie-thumb/MovieGrid";

const MainPage = () => {
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error, pagination, titlePage } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword");
  const limit = 24;

  useEffect(() => {
    dispatch(
      fetchDataMovieSearch({
        keyword: keyword as string,
        page: Number(currentPage),
        limit,
      })
    );
  }, [keyword, currentPage]);

  if (loading) {
    return (
      <RootLayout>
        <Box className="flex flex-col gap-4 px-4 lg:pt-28 pt-24">
          <Skeleton width="25%" height="5" />
          <Box className="mt-3">
            <SkeletonMovieList limit={limit} />
          </Box>
        </Box>
      </RootLayout>
    );
  }

  if (items?.length === 0) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Hãy thử lại với từ khóa khác"
        />
      </Box>
    );
  }

  return (
    <RootLayout>
      <Box className="flex flex-col gap-4 px-4 lg:pt-28 pt-24">
        <h3 className="inline-block xl:text-4xl lg:text-3xl md:text-2xl text-xl title-text font-bold">
          Tìm thấy {pagination?.totalItems} kết quả cho từ khóa "{keyword}"
        </h3>

        <Box className="mt-6">
          <MovieGrid items={items} />
        </Box>

        {!loading && (pagination?.totalItems as number) >= limit && (
          <Pagination
            pagination={{
              totalItems: pagination?.totalItems as number,
              totalItemsPerPage: pagination?.totalItemsPerPage as number,
            }}
            currentPage={currentPage}
          />
        )}
      </Box>
    </RootLayout>
  );
};

export default MainPage;
