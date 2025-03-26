"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDataUnix } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import FeedbackActions from "../FeedbackActions";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedbackInput from "../FeedbackInput";

interface ReplyItemProps {
  reply: any;
}

const ReplyItem = ({ reply }: ReplyItemProps) => {
  const { showReplyId } = useSelector(
    (state: RootState) => state.feedback.replies
  );

  return (
    <Box className="flex gap-4 items-start">
      <Avatar
        name={reply?.author?.name}
        src={reply?.author?.avatar}
        className="sm:w-10 sm:h-10 w-8 h-8" 
        fallback={<div className="sm:w-10 sm:h-10 w-8 h-8 bg-gray-200 rounded-full"></div>}
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-2">
          <span className="text-sm text-gray-50">{reply?.author?.name}</span>
          <span className="text-[10px] text-gray-500">
            {formatDataUnix(reply?.created_at)}
          </span>
        </Box>
        <Box className="flex items-center gap-2">
          <span className="bg-[#3e435c] text-xs text-gray-50 inline-block p-[2px] rounded-sm">
            @{reply?.mention_user?.name}
          </span>
          <p className="text-xs text-gray-400">{reply?.content}</p>
        </Box>

        <FeedbackActions data={reply} action="reply" />

        {showReplyId === reply?._id && <FeedbackInput action="reply" autoFocus/>}
      </Box>
    </Box>
  );
};

export default ReplyItem;
