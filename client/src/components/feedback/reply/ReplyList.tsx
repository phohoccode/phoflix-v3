"use client";

import { Box, Spinner } from "@chakra-ui/react";
import ReplyItem from "./ReplyItem";
import { useState } from "react";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { getMoreReplyListFeedback } from "@/store/asyncThunks/feedbackAsyncThunk";

interface ReplyListProps {
  data: any;
  parentId: string;
}

const ReplyList = ({ data, parentId }: ReplyListProps) => {
  const { items: replies, hasMore } = data;
  const [loadingMore, setLoadingMore] = useState(false);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  const handleSeeMoreReplyFeedback = () => {
    if (hasMore) {
      setLoadingMore(true);
      dispatch(
        getMoreReplyListFeedback({
          parentId,
          type: "comment",
          limit: 5,
          afterTime: replies?.length
            ? replies[replies.length - 1].created_at
            : 0,
        })
      );
      setLoadingMore(false);
    }
  };


  return (
    <Box className="flex flex-col gap-2 mt-6 sm:ml-0 ml-[-56px] sm:border-l-0 border-l-2 border-[#ffffff10] sm:pl-0 pl-4">
      <Box className="flex flex-col gap-4">
        {replies?.map((item: any, index: number) => (
          <ReplyItem key={index} reply={item} />
        ))}
      </Box>

      {hasMore && (
        <Box
          onClick={handleSeeMoreReplyFeedback}
          className="py-4 text-sm text-[#ffd875] cursor-pointer flex items-center gap-2"
        >
          <span>Xem thêm...</span>
          {loadingMore && <Spinner size="sm" />}
        </Box>
      )}
    </Box>
  );
};

export default ReplyList;
