"use client";

import BellIcon from "@/components/icons/BellIcon";
import { setIsOpenModalNotification } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const NotifyButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenModalNotification(true))}
      size={"xs"}
      variant="surface"
      colorScheme={"gray"}
      className="bg-transparent text-gray-50"
    >
      <BellIcon />
    </IconButton>
  );
};

export default NotifyButton;
