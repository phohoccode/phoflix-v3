"use client";

import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Dialog, Portal } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ReviewSummary from "./ReviewSummary";
import ReviewEmo from "./ReviewEmo";
import ReviewComment from "./ReviewComment";
import { useEffect, useState, useTransition } from "react";
import {
  addNewReview,
  getReviewsByMovie,
} from "@/lib/actions/userActionClient";
import { useSession } from "next-auth/react";
import { toaster } from "@/components/ui/toaster";
import { setReviewContent } from "@/store/slices/userSlice";

interface ReviewDialogProps {
  trigger: React.ReactNode;
}

const ReviewDialog = ({ trigger }: ReviewDialogProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { selectedReview, reviewContent } = useSelector(
    (state: RootState) => state.user.reviews
  );
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [reviews, setReviews] = useState({
    averagePoint: 0,
    totalItems: 0,
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    startTransition(() => {
      handleGetReviewsByMovie();
    });
  }, [movie.slug]);

  const handleGetReviewsByMovie = async () => {
    const response = await getReviewsByMovie({
      movieSlug: movie.slug,
      page: 1,
      limit: 10,
    });

    if (response?.status) {
      setReviews({
        averagePoint: response?.result?.reviews?.averagePoint,
        totalItems: response?.result?.reviews?.totalItems,
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

    startTransition(async () => {
      const response = await addNewReview({
        movieSlug: movie.slug,
        userId: session?.user?.id as string,
        point: Number(selectedReview?.value),
        content: reviewContent as string,
      });

      if (response?.status) {
        toaster.create({
          description: response?.message,
          type: "success",
          duration: 1500,
        });

        // Refresh reviews
        handleGetReviewsByMovie();

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
                averagePoint={reviews?.averagePoint}
                totalItems={reviews?.totalItems}
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
                colorPalette="yellow"
                variant="solid"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
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
