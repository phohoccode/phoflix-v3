"use client";

import { getMoreFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface SeeMoreFeedbackProps {
  type?: "comment" | "reply";
  parentId?: string;
}

const SeeMoreFeedback = ({ type, parentId }: SeeMoreFeedbackProps) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const {
    hasMore: hasMoreFeedback,
    items,
  } = useSelector((state: RootState) => state.feedback.feedback);
  const limit = 5;

  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  const handleSeeMoreFeedbacks = () => {
    if (hasMoreFeedback) {
      setLoadingMore(true);
      dispatch(
        getMoreFeedbacks({
          movieSlug: params.slug as string,
          type: "comment",
          limit,
          afterTime: items?.length ? items[items.length - 1].created_at : 0,
        })
      );
      setLoadingMore(false);
    }
  };

  return (
    <Box
      onClick={handleSeeMoreFeedbacks}
      className="py-4 text-sm text-[#ffd875] cursor-pointer flex items-center gap-2"
    >
      <Box className="flex gap-1 items-center">
        <span>Xem thêm</span>
        <IoIosArrowDown />
      </Box>
      {loadingMore && <Spinner size="sm" />}
    </Box>
  );
};

export default SeeMoreFeedback;
