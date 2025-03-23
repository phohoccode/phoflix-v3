"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";
import CommentToggleTab from "./CommentToggleTab";

const CommentSummary = () => {
  return (
    <Box className="flex gap-6 items-center">
      <h2 className="flex gap-2 items-center lg:text-2xl text-xl text-gray-50">
        <TbMessageFilled />
        Bình luận
      </h2>
      <CommentToggleTab />
    </Box>
  );
};

export default CommentSummary;
