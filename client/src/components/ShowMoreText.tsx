import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

interface ShowMoreTextProps {
  text: string;
  maxLength?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const ShowMoreText = ({
  text,
  maxLength = 100,
  size = "sm",
}: ShowMoreTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : text?.slice(0, maxLength);

  return (
    <div className="flex flex-col gap-1">
      <p style={{ wordBreak: "break-word" }} className={`text-${size} text-gray-400`}>
        {displayText}
        {text?.length > maxLength && !isExpanded && "..."}
      </p>

      {text?.length > maxLength && (
        <Button
          size="xs"
          onClick={toggleText}
          className="flex ml-auto bg-[#282b3a] text-gray-50 hover:scale-105 transition-all px-2 py-1 text-xs"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default ShowMoreText;
