"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";

interface CommentButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const CommentButton = ({
  placement = "horizontal",
  responsiveText = false,
}: CommentButtonProps) => {
  // Scroll to feedback section when clicked
  const scrollToFeedback = () => {
    const feedbackSection = document.getElementById("feedback");
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      onClick={() => {
        scrollToFeedback();
      }}
      className={`p-2 sm:min-w-16 cursor-pointer rounded-lg text-gray-50 xs:flex hidden justify-center items-center gap-2 transition-all hover:bg-[#ffffff05] 
          ${placement === "vertical" ? "flex-col" : "flex-row"}`}
    >
      <TbMessageFilled />
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Bình luận
      </span>
    </Box>
  );
};

export default CommentButton;
