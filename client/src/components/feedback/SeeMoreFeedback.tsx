"use client";

import { getMoreFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface SeeMoreFeedbackProps {
  callback: () => void;
}

const SeeMoreFeedback = ({ callback }: SeeMoreFeedbackProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSeeMoreFeedbacks = () => {
    startTransition(async () => {
      callback();
    });
  };

  return (
    <Box
      onClick={handleSeeMoreFeedbacks}
      className="py-4 text-sm text-[#ffd875] cursor-pointer flex items-center gap-2"
    >
      <Box className="flex gap-1 text-xs items-center">
        <span>Xem thêm</span>
        <IoIosArrowDown />
      </Box>
      {isPending && <Spinner size="sm" />}
    </Box>
  );
};

export default SeeMoreFeedback;
