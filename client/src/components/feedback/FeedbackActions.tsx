"use client";

import { addVote, deleteFeedback } from "@/lib/actions/feedbackAction";
import {
  getVoteListFeedback,
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import {
  setReplyId,
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedbackSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { FaReply } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../ui/toaster";
import AlertDialog from "../dialogs/AlertDialog";

const FeedbackActions = ({ action, data, rootId }: FeedbackActionsProps) => {
  const { data: session }: any = useSession();
  const { feedbackData, repliesData, voteList, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const feedbackId = data?._id;
  const parentId = data?.parent_id;
  const userId = data?.author?._id;

  const showFeedbackId = feedbackData.showFeedbackId;
  const showReplyId = repliesData.showReplyId;

  const { userLikedFeedbacks, userDislikedFeedbacks } = voteList || {};
  const totalLiked = userLikedFeedbacks?.[feedbackId]?.length || 0;
  const totalDisliked = userDislikedFeedbacks?.[feedbackId]?.length || 0;
  const isLiked = userLikedFeedbacks?.[feedbackId]?.includes(
    session?.user?.id as string
  );
  const isDisliked = userDislikedFeedbacks?.[feedbackId]?.includes(
    session?.user?.id as string
  );

  const [isPending, startTransition] = useTransition();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  const handleToogleReply = (id: string) => {
    const isComment = action === "comment";

    const targetId =
      (isComment ? showFeedbackId : showReplyId) === id ? null : feedbackId;

    dispatch(
      isComment ? setShowFeedbackId(targetId) : setShowReplyId(targetId)
    );

    dispatch(setReplyId(id));
  };

  const handleVote = (voteType: "like" | "dislike") => {
    if (!session) {
      toaster.create({
        type: "error",
        description: "Vui lòng đăng nhập để thực hiện hành động này.",
        duration: 2000,
      });
      return;
    }

    startTransition(async () => {
      const response = await addVote({
        userId: session?.user?.id as string,
        feedbackId,
        movieSlug: params.slug as string,
        voteType,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        dispatch(getVoteListFeedback(params.slug as string));
      } else {
        toaster.create({
          type: "error",
          description: response?.message,
          duration: 2000,
        });
      }
    });
  };

  const handleDeleteFeedback = () => {
    startTransition(async () => {
      const response = await deleteFeedback({
        feedbackId,
        userId: session?.user?.id as string,
        accessToken: session?.user?.accessToken as string,
      });

      if (response?.status) {
        toaster.create({
          type: "success",
          description: response?.message,
          duration: 2000,
        });

        // Làm mới feedback khi xóa phản hồi cha
        await dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: feedbackType,
            limit: 10,
          })
        );

        // Làm mới reply khi xóa phản hồi con
        parentId &&
          dispatch(
            getReplyListFeedback({
              parentId: rootId as string,
              type: feedbackType,
              limit: 10,
            })
          );
      } else {
        toaster.create({
          type: "error",
          description: response?.message,
          duration: 2000,
        });
      }
    });
  };

  return (
    <Box className="flex gap-4 items-center my-4">
      <Box
        onClick={() => handleVote("like")}
        className={`cursor-pointer hover:text-[#25d366] flex gap-1 items-center 
          ${isLiked ? "text-[#25d366]" : "text-gray-400 "}`}
      >
        <BsArrowUpCircleFill />
        {totalLiked > 0 && <span className="text-xs">{totalLiked}</span>}
      </Box>

      <Box
        onClick={() => handleVote("dislike")}
        className={`cursor-pointer hover:text-[#d33d25] flex gap-1 items-center 
          ${isDisliked ? "text-[#d33d25]" : "text-gray-400 "}`}
      >
        <BsArrowDownCircleFill />
        {totalDisliked > 0 && <span className="text-xs">{totalDisliked}</span>}
      </Box>

      <Box
        onClick={() => handleToogleReply(feedbackId)}
        className="text-gray-400 select-none text-xs cursor-pointer hover:text-gray-50 flex gap-1 items-center"
      >
        <FaReply />
        Trả lời
      </Box>

      {userId === session?.user?.id && (
        <AlertDialog
          trigger={
            <Box className="text-gray-400 select-none text-xs cursor-pointer hover:text-red-500 flex gap-1 items-center">
              <MdDelete />
              Xóa
            </Box>
          }
          title="Xóa phản hồi"
          content="Bạn có chắc chắn muốn xóa phản hồi này không?"
          loading={isPending}
          confirmCallback={handleDeleteFeedback}
        />
      )}
    </Box>
  );
};

export default FeedbackActions;
