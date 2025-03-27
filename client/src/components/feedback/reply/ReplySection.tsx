"use client";

import { getReplyListFeedback } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useTransition, useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ReplyList from "./ReplyList";
import { setParentId } from "@/store/slices/feedbackSlice";

interface ReplySectionProps {
  totalChildren: number;
  parentId: string;
}

const ReplySection = ({ totalChildren, parentId }: ReplySectionProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { replies, feedbackType } = useSelector((state: RootState) => state.feedback);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleReply = () => {
    if (!isOpen) {
      startTransition(() => {
        dispatch(
          getReplyListFeedback({
            parentId,
            type: feedbackType,
            limit: 5,
          })
        );
      });
    }

    setIsOpen(!isOpen);
    dispatch(setParentId(parentId));
  };

  return (
    <Box className="mt-4">
      <Box
        className="flex items-center select-none gap-1 text-[#ffd875] cursor-pointer"
        onClick={handleToggleReply}
      >
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        <span className="text-xs">
          {isOpen ? "Ẩn bớt" : `Xem ${totalChildren} phản hồi`}
        </span>
        {isPending && <Spinner size="sm" />}
      </Box>

      {isOpen && (
        <ReplyList data={replies?.data?.[parentId]} parentId={parentId} />
      )}
    </Box>
  );
};

export default ReplySection;
