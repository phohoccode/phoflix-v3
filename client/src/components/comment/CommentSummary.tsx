"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";
import CommentToggleTab from "./CommentToggleTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CommentSummary = () => {
  const { itemCount } = useSelector(
    (state: RootState) => state.feedback.feedback
  );

  return (
    <Box className="flex gap-6 items-center">
      <Box className="flex gap-2 items-center lg:text-2xl text-xl text-gray-50">
        <TbMessageFilled />
        Bình luận{""}
        <span>{itemCount ?? 0}</span>
      </Box>
      <CommentToggleTab />
    </Box>
  );
};

export default CommentSummary;
