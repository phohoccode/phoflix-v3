"use client";

import { setType } from "@/store/slices/feedbackSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: "comment", value: "comment", label: "Bình luận" },
  { id: "review", value: "review", label: "Đánh giá" },
];

const CommentToggleTab = () => {
  const { type } = useSelector((state: RootState) => state.feedback);
  const dispatch: AppDispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setType("comment"));
  }, [pathname]);

  return (
    <ButtonGroup
      variant="outline"
      size="sm"
      className="gap-0 border border-gray-50 rounded-xl h-9 p-[2px] overflow-hidden"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          size="sm"
          onClick={() => dispatch(setType(tab.value))}
          bg={type === tab.value ? "white" : "transparent"}
          color={type === tab.value ? "black" : "white"}
          className="rounded-[9px] border-none h-[31px] lg:text-sm text-xs"
        >
          {tab.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default CommentToggleTab;
