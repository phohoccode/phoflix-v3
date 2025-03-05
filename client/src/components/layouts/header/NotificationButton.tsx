"use client";

import BellIcon from "@/components/icons/BellIcon";
import { setIsOpenModalNotification } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const NotificationButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenModalNotification(true))}
      size={"sm"}
      variant="solid"
      className="bg-[#ffffff5e]"
      rounded={"full"}
    >
      <BellIcon />
    </IconButton>
  );
};

export default NotificationButton;
