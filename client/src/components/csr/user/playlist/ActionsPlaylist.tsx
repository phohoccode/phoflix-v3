"use client";

import AlertDialog from "@/components/dialogs/AlertDialog";
import { toaster } from "@/components/ui/toaster";
import {
  createNewPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/lib/actions/userActionClient";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Input,
  Portal,
} from "@chakra-ui/react";
import { set } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

interface ActionsPlaylistProps {
  action: "update" | "create";
  children: React.ReactNode;
  value?: string;
  playlistId?: string;
  trigger?: () => void;
}

const ActionsPlaylist = ({
  action,
  value,
  children,
  playlistId,
  trigger,
}: ActionsPlaylistProps) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (action === "create") {
      setPlaylistName("");
    } else {
      setPlaylistName(value as string);
    }
  }, [action, value, isOpen]);

  const handleActionPlaylist = (action: "update" | "delete" | "create") => {
    if (playlistName?.trim() === "") {
      toaster.create({
        description: "Tên danh sách không được để trống",
        type: "error",
        duration: 1500,
      });
      return;
    }

    startTransition(async () => {
      let response: any = null;

      if (action === "create") {
        response = await createNewPlaylist({
          userId: session?.user?.id as string,
          playlistName: playlistName as string,
        });
      } else if (action === "update") {
        response = await updatePlaylist({
          userId: session?.user?.id as string,
          playlistId: playlistId as string,
          playlistName: playlistName as string,
        });
      } else if (action === "delete") {
        response = await deletePlaylist({
          userId: session?.user?.id as string,
          playlistId: playlistId as string,
        });
      }

      if (!response?.status) {
        toaster.create({
          description: response?.message,
          type: "error",
        });
      } else {
        toaster.create({
          description: response?.message,
          type: "success",
        });

        setPlaylistName("");
        setIsOpen(false);

        // trigger khi thêm mới danh sách
        if (trigger) {
          trigger();
        }

        // Update data
        router.refresh();
      }
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 max-w-[320px] bg-[#2a314e] rounded-2xl backdrop-blur mx-4 my-auto">
            <Dialog.Header>
              <Dialog.Title>
                {action === "create" ? "Tạo danh sách" : "Sửa danh sách"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                autoFocus={action === "create"}
                onFocus={(e) =>
                  action === "update" &&
                  e.target.setSelectionRange(
                    playlistName?.length,
                    playlistName?.length
                  )
                }
                className="border border-[#ffffff10] focus:border-gray-50"
                onChange={(e) => setPlaylistName(e.target.value)}
                value={playlistName}
                placeholder="Tên danh sách"
              />
            </Dialog.Body>
            <Dialog.Footer>
              {action === "update" && (
                <AlertDialog
                  trigger={
                    <IconButton
                      className="mr-auto"
                      size="xs"
                      aria-label="Xóa"
                      colorPalette="red"
                    >
                      <MdDelete />
                    </IconButton>
                  }
                  title="Xác nhận xóa"
                  content="Bạn có chắc chắn muốn xóa danh sách này không?"
                  loading={isPending}
                  confirmCallback={() => handleActionPlaylist("delete")}
                />
              )}
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Đóng
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={action === "create" ? isPending : false}
                onClick={() => handleActionPlaylist(action)}
                size="xs"
                className="min-w-24 bg-[#ffd875] text-gray-800 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                {action === "create" ? "Thêm" : "Lưu"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ActionsPlaylist;
