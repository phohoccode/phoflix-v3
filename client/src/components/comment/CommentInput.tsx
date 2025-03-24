"use client";

import { addFeedback } from "@/lib/actions/userActionClient";
import { AppDispatch } from "@/store/store";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toaster } from "../ui/toaster";
import { getFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";

const CommentInput = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const maxLength = 1000;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    setLength(value.length);
  };

  const handleAddNewComment = () => {
    startTransition(async () => {
      const response = await addFeedback({
        movieSlug: params.slug as string,
        userId: session?.user?.id as string,
        content: value,
        type: "comment",
      });

      if (response?.status) {
        setValue("");
        setLength(0);

        toaster.create({
          description: response?.message,
          type: "success",
          duration: 1500,
        });

        dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: "comment",
            limit: 10,
            afterTime: 0,
          })
        );
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
    <Box className="flex flex-col justify-end gap-2 p-2 rounded-xl bg-[#ffffff10] mt-4">
      <Box className="relative">
        <Textarea
          maxLength={maxLength}
          autoresize
          onChange={handleChangeInput}
          value={value}
          placeholder="Viết bình luận..."
          className="h-full min-h-32 bg-[#191b24] text-white rounded-lg p-4 border-2 border-transparent focus:border-gray-400"
        />
        <span className="text-xs absolute top-1.5 right-2 text-gray-400">
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

export default CommentInput;
