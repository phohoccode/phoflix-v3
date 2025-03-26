"use client";

import { Box } from "@chakra-ui/react";
import FeedbackSummary from "./FeedbackSummary";
import FeedbackInput from "./FeedbackInput";
import FeedbackList from "./FeedbackList";

const FeedbackSection = () => {
  return (
    <Box className="flex flex-col gap-6 mt-6">
      <FeedbackSummary />
      <Box>
        <FeedbackInput action="comment" />
        <FeedbackList />
      </Box>
    </Box>
  );
};

export default FeedbackSection;
