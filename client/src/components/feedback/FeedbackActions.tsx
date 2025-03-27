"use client";

import { addVote, deleteFeedback } from "@/lib/actions/userActionClient";
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

interface FeedbackActionsProps {
  data: any;
  action: "comment" | "reply";
  parentId?: string;
}

const FeedbackActions = ({ action, data, parentId }: FeedbackActionsProps) => {
  const { total_like, total_dislike, _id: feedbackId } = data || {};
  const { showFeedbackId } = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const { data: session } = useSession();
  const { _id: userId } = data?.author || {};
  const { showReplyId } = useSelector(
    (state: RootState) => state.feedback.replies
  );
  const { voteList, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const { userLikedFeedbacks, userDislikedFeedbacks } = voteList || {};
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
      });

      if (response?.status) {
        toaster.create({
          type: "success",
          description: response?.message,
          duration: 2000,
        });

        await Promise.all([
          dispatch(
            getFeedbacks({
              movieSlug: params.slug as string,
              type: feedbackType,
              limit: 10,
            })
          ),
          dispatch(getVoteListFeedback(params.slug as string)),

          parentId &&
            dispatch(
              getReplyListFeedback({
                parentId: parentId as string,
                type: feedbackType,
                limit: 10,
              })
            ),
        ]);
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
      });

      if (response?.status) {
        toaster.create({
          type: "success",
          description: response?.message,
          duration: 2000,
        });

        await Promise.all([
          dispatch(
            getFeedbacks({
              movieSlug: params.slug as string,
              type: feedbackType,
              limit: 10,
            })
          ),
        ]);
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
        className={`cursor-pointer hover:text-[#25d366] flex gap-1 items-center ${
          userLikedFeedbacks?.[feedbackId]?.includes(
            session?.user?.id as string
          )
            ? "text-[#25d366]"
            : "text-gray-400 "
        }`}
      >
        <BsArrowUpCircleFill />
        {total_like > 0 && <span className="text-xs">{total_like}</span>}
      </Box>

      <Box
        onClick={() => handleVote("dislike")}
        className={`cursor-pointer hover:text-[#d33d25] flex gap-1 items-center ${
          userDislikedFeedbacks?.[feedbackId]?.includes(
            session?.user?.id as string
          )
            ? "text-[#d33d25]"
            : "text-gray-400 "
        }`}
      >
        <BsArrowDownCircleFill />
        {total_dislike > 0 && <span className="text-xs">{total_dislike}</span>}
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
          loading={false}
          confirmCallback={handleDeleteFeedback}
        />
      )}
    </Box>
  );
};

export default FeedbackActions;
