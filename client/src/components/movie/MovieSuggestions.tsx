"use client";

import { categories, countries } from "@/lib/defines/data";
import { getRandomItem } from "@/lib/utils";
import {
  Describe,
  fetchDataMovieDetail,
} from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonMovieList from "../skeletons/SkeletonMovieGrid";
import MovieGrid from "./movie-thumb/MovieGrid";
import { Box } from "@chakra-ui/react";

const data = [...categories, ...countries];

interface MovieSuggesstionsProps {
  title: string;
}

const MovieSuggesstions = ({ title }: MovieSuggesstionsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.movieDetail
  );

  useEffect(() => {
    const itemRandom = getRandomItem(data);
    const describe = categories.includes(itemRandom) ? "the-loai" : "quoc-gia";

    dispatch(
      fetchDataMovieDetail({
        describe: describe as Describe,
        slug: itemRandom?.slug as string,
        page: 1,
        limit: 15,
      })
    );
  }, []);

  if (loading)
    return (
      <SkeletonMovieList columns={{ base: 2, md: 3, lg: 5, xl: 4, "2xl": 5 }} />
    );

  return (
    <Box className="flex flex-col gap-4">
      <h4 className="text-xl text-gray-50">{title}</h4>
      <MovieGrid
        items={items}
        colums={{ base: 2, md: 3, lg: 5, xl: 4, "2xl": 5 }}
      />
    </Box>
  );
};

export default MovieSuggesstions;
