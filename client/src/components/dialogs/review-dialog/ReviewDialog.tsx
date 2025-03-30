"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ReviewSummary from "./ReviewSummary";
import ReviewEmo from "./ReviewEmo";
import ReviewComment from "./ReviewComment";
import { useEffect, useState, useTransition } from "react";
import { addFeedback, getStatsByMovie } from "@/lib/actions/feedbackAction";
import { useSession } from "next-auth/react";
import { toaster } from "@/components/ui/toaster";
import { setReviewContent } from "@/store/slices/userSlice";
import { getFeedbacks } from "@/store/asyncThunks/feedbackAsyncThunk";

interface ReviewDialogProps {
  trigger: React.ReactNode;
}

const ReviewDialog = ({ trigger }: ReviewDialogProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { selectedReview, reviewContent } = useSelector(
    (state: RootState) => state.user.reviews
  );
  const { feedbackType } = useSelector((state: RootState) => state.feedback);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [statsByMovie, setStatsByMovie] = useState({
    averagePoint: 0,
    totalReviews: 0,
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (movie) {
      startTransition(() => {
        handleGetStatsByMovie();
      });
    }
  }, [movie?.slug]);

  const handleGetStatsByMovie = async () => {
    const response = await getStatsByMovie(movie.slug);

    if (response?.status) {
      setStatsByMovie({
        averagePoint: response?.result?.average_point,
        totalReviews: response?.result?.total_reviews,
      });
    } else {
      toaster.create({
        description: response?.message,
        type: "error",
        duration: 1500,
      });
    }
  };

  const handleAddNewReview = () => {
    if (!session) {
      toaster.create({
        description: "Bạn cần đăng nhập để thực hiện hành động này",
        type: "error",
        duration: 1500,
      });
    }

    if (reviewContent?.trim() === "") {
      toaster.create({
        description: "Nội dung đánh giá không được để trống",
        type: "error",
        duration: 1500,
      });
      return;
    }

    startTransition(async () => {
      const response = await addFeedback({
        movieSlug: movie.slug,
        userId: session?.user?.id as string,
        point: Number(selectedReview?.value),
        content: reviewContent as string,
        type: "review",
      });

      if (response?.status) {
        toaster.create({
          description: response?.message,
          type: "success",
          duration: 1500,
        });

        // làm mới feedback khi feedbackType là review

        if (feedbackType === "review") {
          await dispatch(
            getFeedbacks({
              movieSlug: movie.slug,
              type: "review",
              limit: 10,
            })
          );
        }

        // Refresh reviews
        handleGetStatsByMovie();

        // Close dialog
        setOpen(false);

        // Reset review content
        dispatch(setReviewContent(""));
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
    <Dialog.Root
      size="xs"
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-[600px] mx-4">
            <Dialog.Header>
              <Dialog.Title className="text-center">{movie?.name}</Dialog.Title>
              <ReviewSummary
                averagePoint={statsByMovie?.averagePoint}
                totalReviews={statsByMovie?.totalReviews}
              />
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-6">
                <ReviewEmo />
                <ReviewComment />
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Hủy bỏ
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={isPending}
                onClick={handleAddNewReview}
                size="xs"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
              >
                Gửi đánh giá
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReviewDialog;
