"use client";

import { getFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedbackItem from "./FeedbackItem";
import SeeMoreFeedback from "./SeeMoreFeedback";
import EmptyData from "../EmptyData";
import { BiSolidMessageDetail } from "react-icons/bi";

const FeedbackList = () => {
  const { items, loading, hasMore } = useSelector(
    (state: RootState) => state.feedback.feedback
  );
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const dispatch: AppDispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  useEffect(() => {
    if (movie) {
      startTransition(() => {
        dispatch(
          getFeedbacks({
            movieSlug: params.slug as string,
            type: "comment",
            limit: 10,
          })
        );
      });
    }
  }, [params.slug]);

  if (isPending) {
    return (
      <div className="flex h-96 justify-center items-center">
        <div className="border-[#ffd875] border-[3px] border-b-transparent h-10 rounded-full w-10 animate-spin"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Box className="flex justify-center items-center h-48 mt-8 bg-[#0003] rounded-2xl">
        <EmptyData
          title="Chưa có bình luận nào"
          description="Hãy trở thành người đầu tiên bình luận về phim này"
          icon={<BiSolidMessageDetail />}
        />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-6 mt-12">
      <Box className="flex flex-col gap-8">
        {items?.map((item: any, index: number) => (
          <FeedbackItem key={index} feedback={item} />
        ))}
      </Box>

      {hasMore && <SeeMoreFeedback />}
    </Box>
  );
};

export default FeedbackList;
