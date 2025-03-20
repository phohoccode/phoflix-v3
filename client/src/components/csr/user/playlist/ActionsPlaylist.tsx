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
  value?: string;
  playlistId?: string;
}

const ActionsPlaylist = ({
  action,
  value,
  playlistId,
}: ActionsPlaylistProps) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("action", action);

    if (action === "create") {
      setPlaylistName("");
    } else {
      setPlaylistName(value as string);
    }
  }, [action, value, isOpen]);

  const handleActionPlaylist = (action: "update" | "delete" | "create") => {
    startTransition(async () => {
      let response: any = null;

      if (playlistName?.trim() === "") {
        toaster.create({
          description: "Tên danh sách không được để trống",
          type: "error",
        });
        return;
      }

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
      <Dialog.Trigger asChild>
        <Button
          size="xs"
          rounded="full"
          className="text-xs text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
        >
          {action === "create" ? (
            <>
              <FaPlus />
              Thêm mới
            </>
          ) : (
            "Sửa"
          )}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="relative text-gray-50 lg:max-w-[320px] max-w-full bg-[rgba(40,43,58,0.8)] rounded-2xl backdrop-blur mx-4 my-auto">
            <Dialog.Header>
              <Dialog.Title>
                {action === "create" ? "Tạo danh sách" : "Sửa danh sách"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                autoFocus={action === "create"}
                className="border border-[#2e313a] focus:border-gray-50"
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
                loading={isPending}
                onClick={() => handleActionPlaylist(action)}
                size="xs"
                colorPalette="yellow"
                variant="solid"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
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
