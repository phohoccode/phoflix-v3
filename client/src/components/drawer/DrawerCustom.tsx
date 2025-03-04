"use client";

import { Button } from "@chakra-ui/react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Title from "./Title";
import Body from "./Body";

interface DrawerCustomProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerCustom = ({ isOpen, onClose }: DrawerCustomProps) => {
  return (
    <DrawerRoot placement="start" open={isOpen} onOpenChange={onClose}>
      <DrawerBackdrop />

      <DrawerContent offset={3} rounded="md">
        <DrawerHeader>
          <DrawerTitle>
            <Title />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Body />
        </DrawerBody>

        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerCustom;
