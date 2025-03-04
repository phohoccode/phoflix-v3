"use client";

import BarIcon from "@/components/icons/BarIcon";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const BarButton = () => {
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();

  if (windowWidth > 1024) return null;

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenDrawer(true))}
      size={"xs"}
      variant={"subtle"}
      colorScheme={"gray"}
    >
      <BarIcon />
    </IconButton>
  );
};

export default BarButton;
