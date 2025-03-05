"use client";

import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifyDialog = ({ isOpen, onClose }: NotificationDialogProps) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent padding={1}>
        <DialogHeader p={1}>
          <DialogTitle>Thông báo</DialogTitle>
        </DialogHeader>
        <DialogBody></DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default NotifyDialog;
