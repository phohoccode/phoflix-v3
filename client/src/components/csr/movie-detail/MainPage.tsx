"use client";

import RootLayout from "@/components/layouts/RootLayout";
import { fetchDataMovieDetail } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, GridItem, Group, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/assets/css/movie.css";
import MovieCard from "@/components/movie/movie-thumb/MovieCard";
import Pagination from "@/components/Pagination";
import SkeletonMovieList from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/EmptyData";
import MovieGrid from "@/components/movie/movie-thumb/MovieGrid";

const MainPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error, pagination, titlePage } = useSelector(
    (state: RootState) => state.movie.movieDetail
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 24;

  useEffect(() => {
    dispatch(
      fetchDataMovieDetail({
        describe: params["describe"] as any,
        slug: params["slug"] as any,
        page: Number(currentPage),
        limit,
      })
    );
  }, [params["describe"], params["slug"], currentPage]);

  if (loading) {
    return (
      <RootLayout>
        <Box className="flex flex-col gap-4 px-4 lg:pt-28 pt-24">
          <Skeleton className="w-1/3 h-10" />
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
          title="Chưa có dữ liệu"
          description="Dữ liệu sẽ được cập nhật sớm nhất"
        />
      </Box>
    );
  }

  return (
    <RootLayout>
      <Box className="flex flex-col gap-4 px-4 lg:pt-28 pt-24">
        <h3 className=" xl:text-4xl lg:text-3xl md:text-2xl text-xl title-text font-bold">
          {titlePage}
        </h3>
        <Box className="mt-6">
          <MovieGrid items={items} />
        </Box>

        {!loading && items?.length >= limit && (
          <Pagination
            pagination={{
              totalPages: pagination?.totalPages as number,
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
