"use client";

import {  
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import BodyDrawer from "./BodyDrawer";
import "@/assets/css/movie.css";
import ProfileHeader from "../ProfileHeader";

interface DrawerCustomProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerCustom = ({ isOpen, onClose }: DrawerCustomProps) => {
  return (
    <DrawerRoot placement="start" open={isOpen} onOpenChange={onClose}>
      <DrawerBackdrop />

      <DrawerContent p={1} className="bg-[#0f111af2] text-gray-50">
        <DrawerHeader p={3}>
          <DrawerTitle>
            <ProfileHeader />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody p={3}>
          <BodyDrawer />
        </DrawerBody>

        <DrawerCloseTrigger className="text-gray-50" />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerCustom;
