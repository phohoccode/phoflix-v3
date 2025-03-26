"use client";

import { Box, Show } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { formatDataUnix } from "@/lib/utils";
import FeedbackActions from "./FeedbackActions";
import ReplySection from "./reply/ReplySection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FeedbackInput from "./FeedbackInput";
import ShowMoreText from "../ShowMoreText";

interface FeedItemProps {
  feedback: any;
}

const FeedbackItem = ({ feedback }: FeedItemProps) => {
  const { showFeedbackId } = useSelector(
    (state: RootState) => state.feedback.feedback
  );

  return (
    <Box className="flex gap-4 items-start">
      <Avatar
        name={feedback?.author?.name}
        src={feedback?.author?.avatar}
        className="w-10 h-10"
        fallback={<div className="w-10 h-10 bg-gray-200 rounded-full"></div>}
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-2">
          <span className="text-sm text-gray-50">{feedback?.author?.name}</span>
          <span className="text-[10px] text-gray-500">
            {formatDataUnix(feedback?.created_at)}
          </span>
        </Box>
        <ShowMoreText text={feedback?.content} maxLength={500} size="xs" />

        <FeedbackActions data={feedback} action="comment" />

        {showFeedbackId === feedback?._id && (
          <FeedbackInput action="reply" autoFocus />
        )}

        {feedback?.total_children > 0 && (
          <ReplySection
            totalChildren={feedback?.total_children}
            parentId={feedback?._id}
          />
        )}
      </Box>
    </Box>
  );
};

export default FeedbackItem;
