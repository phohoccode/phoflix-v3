"use client";

import BarIcon from "@/components/icons/BarIcon";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const BarButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenDrawer(true))}
      size="sm"
      variant="solid"
      className="bg-transparent xl:hidden flex"
    >
      <BarIcon />
    </IconButton>
  );
};

export default BarButton;
