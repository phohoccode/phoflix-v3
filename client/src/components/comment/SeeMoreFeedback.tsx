"use client";

import { getMoreFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SeeMoreFeedback = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const { hasMore, items } = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  const handleSeeMoreComments = () => {
    if (hasMore) {
      setLoadingMore(true);
      dispatch(
        getMoreFeedbacks({
          movieSlug: params.slug as string,
          type: "comment",
          limit: 5,
          afterTime: items?.length ? items[items.length - 1].created_at : 0,
        })
      );
      setLoadingMore(false);
    }
  };

  return (
    <Box
      onClick={handleSeeMoreComments}
      className="py-4 text-sm text-[#ffd875] cursor-pointer flex items-center gap-2"
    >
      <span>Xem thêm bình luận...</span>
      {loadingMore && <Spinner size="sm" />}
    </Box>
  );
};

export default SeeMoreFeedback;
