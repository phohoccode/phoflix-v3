"use client";

import {
  setParentId,
  setReplyId,
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedbackSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

interface FeedbackActionsProps {
  data: any;
  action: "comment" | "reply";
}

const FeedbackActions = ({ action, data }: FeedbackActionsProps) => {
  const { total_like, total_dislike, _id } = data || {};
  const { showFeedbackId } = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const { showReplyId } = useSelector(
    (state: RootState) => state.feedback.replies
  );
  const dispatch: AppDispatch = useDispatch();

  const handleToogleReply = (id: string) => {
    const isComment = action === "comment";
    const targetId =
      (isComment ? showFeedbackId : showReplyId) === id ? null : _id;

    dispatch(
      isComment ? setShowFeedbackId(targetId) : setShowReplyId(targetId)
    );

    dispatch(setReplyId(id));
  };

  return (
    <Box className="flex gap-4 items-center my-4">
      <Box className="text-gray-400 cursor-pointer hover:text-gray-50 flex gap-1 items-center">
        <BsArrowUpCircleFill />
        {total_like > 0 && <span className="text-xs">{total_like}</span>}
      </Box>

      <Box className="text-gray-400 cursor-pointer hover:text-gray-50 flex gap-1 items-center">
        <BsArrowDownCircleFill />
        {total_dislike > 0 && <span className="text-xs">{total_dislike}</span>}
      </Box>

      <Box
        onClick={() => handleToogleReply(_id)}
        className="text-gray-400 text-xs cursor-pointer hover:text-gray-50 flex gap-1 items-center"
      >
        <FaReply />
        Trả lời
      </Box>
    </Box>
  );
};

export default FeedbackActions;
