"use client";

import { Button, Dialog, Portal } from "@chakra-ui/react";

interface AlertDialogProps {
  trigger: React.ReactNode;
  title: string;
  content: string;
  loading: boolean;
  confirmCallback: () => void;
}

const AlertDialog = ({
  trigger,
  title,
  loading,
  content,
  confirmCallback,
}: AlertDialogProps) => {
  return (
    <Dialog.Root size="xs">
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[rgba(40,43,58,0.8)] rounded-2xl backdrop-blur max-w-[420px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{content}</p>
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
                loading={loading}
                onClick={confirmCallback}
                size="xs"
                colorPalette="yellow"
                variant="solid"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                Xác nhận
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;
