"use client";

import { Box } from "@chakra-ui/react";
import CommentSummary from "./CommentSummary";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentSection = () => {
  return (
    <Box className="flex flex-col gap-6 mt-6">
      <CommentSummary />
      <Box>
        <CommentInput />
        <CommentList />
      </Box>
    </Box>
  );
};

export default CommentSection;
