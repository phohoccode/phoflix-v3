"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";
import CommentToggleTab from "./FeedbackToggleTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const FeedbackSummary = () => {
  const { totalFeedbacks } = useSelector(
    (state: RootState) => state.feedback.feedbackData
  );

  return (
    <Box className="flex lg:gap-6 gap-4 items-center">
      <Box className="flex gap-2 items-center lg:text-2xl text-lg text-gray-50">
        <TbMessageFilled />
        <span>
          Bình luận <span>({totalFeedbacks})</span>
        </span>
      </Box>
      <CommentToggleTab />
    </Box>
  );
};

export default FeedbackSummary;
