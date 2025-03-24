"use client";

import { getFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import SeeMoreFeedback from "./SeeMoreFeedback";

const CommentList = () => {
  const { items, loading, hasMore } = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const dispatch: AppDispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  useEffect(() => {
    if (movie) {
      startTransition(() => {
        dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: "comment",
            limit: 10,
            afterTime: 0,
          })
        );
      });
    }
  }, [params.slug]);

  if (isPending) {
    return (
      <div className="flex h-96 justify-center items-center">
        <div className="border-[#ffd875] border-[3px] border-b-transparent h-10 rounded-full w-10 animate-spin"></div>
      </div>
    );
  }

  return (
    <Box className="flex flex-col gap-6 mt-12">
      <Box className="flex flex-col gap-8">
        {items?.map((item: any, index: number) => (
          <CommentItem key={index} comment={item} />
        ))}
      </Box>

      {hasMore && <SeeMoreFeedback />}
    </Box>
  );
};

export default CommentList;
