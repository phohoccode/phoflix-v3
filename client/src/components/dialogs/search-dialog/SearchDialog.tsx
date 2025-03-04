"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";
import { Box, Input } from "@chakra-ui/react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent padding={1}>
        <DialogHeader p={1}>
          <DialogTitle>
            <InputGroup startElement={<SearchIcon />} className="w-full">
              <Input className="font-normal" placeholder="Nhập tên phim cần tìm..." />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>
        <DialogBody></DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default SearchDialog;
