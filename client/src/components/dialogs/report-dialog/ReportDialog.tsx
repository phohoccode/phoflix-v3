"use client";

import { AppDispatch, RootState } from "@/store/store";
import {
  Box,
  Button,
  CloseButton,
  createListCollection,
  Dialog,
  Portal,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ErrorReportSelect from "./ErrorReportSelect";
import { useEffect, useState, useTransition } from "react";
import ErrorDescriptionInput from "./ErrorDescriptionInput";
import { useSession } from "next-auth/react";
import { toaster } from "@/components/ui/toaster";
import { createReportMovie } from "@/lib/actions/reportAction";
import { setReportDescription, setReportError } from "@/store/slices/userSlice";

interface ReportDialogProps {
  trigger: React.ReactNode;
}

const ReportDialog = ({ trigger }: ReportDialogProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { report } = useSelector((state: RootState) => state.user);
  const { reportError, reportDescription } = report;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: sesstion } = useSession();
  const dispatch: AppDispatch = useDispatch();

  const handleCreateReport = () => {
    if (!sesstion) {
      toaster.create({
        description: "Vui lòng đăng nhập để tiếp tục.",
        type: "error",
        duration: 2000,
      });

      return;
    }

    if (!reportError) {
      toaster.create({
        description: "Vui lòng chọn lỗi cần báo cáo.",
        type: "error",
        duration: 2000,
      });

      return;
    }

    if (reportDescription.trim() === "") {
      toaster.create({
        description: "Vui lòng nhập mô tả lỗi.",
        type: "error",
        duration: 2000,
      });

      return;
    }

    startTransition(async () => {
      const response = await createReportMovie({
        userId: sesstion?.user?.id as string,
        movieSlug: movie?.slug,
        title: reportError,
        description: reportDescription,
        movieName: movie?.name,
      });

      if (response?.status) {
        toaster.create({
          description: "Báo cáo thành công.",
          type: "success",
          duration: 2000,
        });

        dispatch(setReportError(""));
        dispatch(setReportDescription(""));
        setOpen(false);
      } else {
        toaster.create({
          description: response?.message || "Báo cáo thất bại.",
          type: "error",
          duration: 2000,
        });
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9998 !important",
          }}
        >
          <Dialog.Content className="bg-[#2a314e] text-gray-50 relative max-w-[460px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{movie?.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="flex flex-col gap-6">
                <ErrorReportSelect />
                <ErrorDescriptionInput />
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
                onClick={handleCreateReport}
                size="xs"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
              >
                Xác nhận
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ReportDialog;
