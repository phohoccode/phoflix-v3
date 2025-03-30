"use client";

import { addFeedback, addReply } from "@/lib/actions/feedbackAction";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../ui/toaster";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import {
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedbackSlice";

const FeedbackInput = ({
  action,
  autoFocus = false,
  rootId,
}: FeedbackInputProps) => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const { replyId, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const [isPending, startTransition] = useTransition();
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const maxLength = 1000;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    setLength(value.length);
  };

  const handleAddNewComment = () => {
    if (!session) {
      toaster.create({
        description: "Vui lòng đăng nhập để bình luận",
        type: "error",
        duration: 1500,
      });

      return;
    }

    if (value.trim() === "") {
      toaster.create({
        description: "Nội dung không được để trống",
        type: "error",
        duration: 1500,
      });

      return;
    }

    startTransition(async () => {
      let response: any = null;

      if (action === "comment") {
        response = await addFeedback({
          movieSlug: params.slug as string,
          userId: session?.user?.id as string,
          content: value,
          type: "comment",
        });
      } else if (action === "reply") {
        response = await addReply({
          parentId: replyId as string,
          userId: session?.user?.id as string,
          content: value,
          type: feedbackType,
          movieSlug: params.slug as string,
        });
      }

      if (response?.status) {
        setValue("");
        setLength(0);

        toaster.create({
          description: response?.message,
          type: "success",
          duration: 1500,
        });

        dispatch(setShowFeedbackId(null));
        dispatch(setShowReplyId(null));

        // Làm mới danh sách bình luận
        await Promise.all([
          dispatch(
            getFeedbacks({
              movieSlug: params.slug as string,
              type: feedbackType,
              limit: 10,
            })
          ),

          dispatch(
            getReplyListFeedback({
              parentId: rootId as string,
              type: feedbackType,
              limit: 10,
            })
          ),
        ]);
      } else {
        toaster.create({
          description: response?.message,
          type: "error",
          duration: 1500,
        });
      }
    });
  };

  return (
    <Box className="flex flex-col justify-end gap-2 p-2 rounded-xl bg-[#ffffff10]">
      <Box className="relative">
        <Textarea
          autoFocus={autoFocus}
          maxLength={maxLength}
          autoresize
          onChange={handleChangeInput}
          value={value}
          placeholder="Viết bình luận..."
          className="h-full min-h-32 bg-[#191b24] text-white rounded-lg p-4 border-2 border-transparent focus:border-gray-400"
        />
        <span className="text-xs absolute top-1.5 right-6 text-gray-400">
          {length}/{maxLength}
        </span>
      </Box>
      <Button
        size="sm"
        maxWidth={120}
        loading={isPending}
        onClick={handleAddNewComment}
        className="bg-transparent text-[#ffd875] ml-auto max-w hover:opacity-80 transition-all"
      >
        Gửi
        <IoMdSend />
      </Button>
    </Box>
  );
};

export default FeedbackInput;
