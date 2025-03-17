"use client";

import BarIcon from "@/components/icons/BarIcon";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const BarButton = () => {
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();

  if (windowWidth >= 1320) return null;

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenDrawer(true))}
      size="sm"
      variant="solid"
      className="bg-[#ffffff5e]"
    >
      <BarIcon />
    </IconButton>
  );
};

export default BarButton;
