"use client";

import { Box } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { formatDataUnix } from "@/lib/utils";
import CommentActions from "./CommentActions";

interface CommentItemProps {
  comment: any;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Box className="flex gap-4 items-start">
      <Avatar
        name={comment?.author?.name}
        src={comment?.author?.avatar}
        className="w-10 h-10"
        fallback={<div className="w-10 h-10 bg-gray-200 rounded-full"></div>}
      />
      <Box>
        <Box className="flex gap-2 items-center mb-2">
          <span className="text-sm text-gray-50">{comment?.author?.name}</span>
          <span className="text-[10px] text-gray-500">
            {formatDataUnix(comment?.created_at)}
          </span>
        </Box>
        <p className="text-xs text-gray-400">{comment?.content}</p>
        <CommentActions comment={comment} />
      </Box>
    </Box>
  );
};

export default CommentItem;
