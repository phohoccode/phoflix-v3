"use client";

import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

interface NotifyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifyDialog = ({ isOpen, onClose }: NotifyDialogProps) => {
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
