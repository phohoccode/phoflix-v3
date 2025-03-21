"use client";

import { Box } from "@chakra-ui/react";

interface ReviewSummaryProps {
  averagePoint: number;
  totalItems: number;
}

const ReviewSummary = ({
  averagePoint = 0,
  totalItems = 0,
}: ReviewSummaryProps) => {
  return (
    <Box className="mt-2">
      <p className="text-sm text-gray-50 text-center mb-4">
        {averagePoint} /{" "}
        <span className="text-gray-400">{totalItems} lượt đánh giá</span>
      </p>
    </Box>
  );
};

export default ReviewSummary;
