"use client";

import { setIsOpenModalNotification } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useDispatch } from "react-redux";

const NotificationButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenModalNotification(true))}
      size="sm"
      variant="solid"
      className="lg:bg-[#ffffff5e] bg-transparent"
      rounded="full"
    >
      <IoNotifications />
    </IconButton>
  );
};

export default NotificationButton;
