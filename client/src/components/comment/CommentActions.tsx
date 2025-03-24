"use client";

import { Box, Button, IconButton } from "@chakra-ui/react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";

interface CommentActionsProps {
  comment: any;
}

const CommentActions = ({ comment }: CommentActionsProps) => {
  return (
    <Box className="flex gap-4 items-center mt-4">
      <Box className="text-gray-400 cursor-pointer hover:text-gray-50">
        <BsArrowUpCircleFill />
      </Box>

      <Box className="text-gray-400 cursor-pointer hover:text-gray-50">
        <BsArrowDownCircleFill />
      </Box>

      <Box className="text-gray-400 text-xs cursor-pointer hover:text-gray-50 flex gap-1 items-center">
        <FaReply />
        Trả lời
      </Box>
    </Box>
  );
};

export default CommentActions;
