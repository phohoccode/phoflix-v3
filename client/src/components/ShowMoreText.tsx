import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
const ShowMoreText = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded ? text : text?.slice(0, maxLength);

  return (
    <div className="flex flex-col gap-1">
      <p style={{ wordBreak: "break-word" }} className="text-gray-400 text-sm">
        {displayText}
        {text?.length > maxLength && !isExpanded && "..."}
      </p>

      {text?.length > maxLength && (
        <Button
          size="xs"
          onClick={toggleText}
          className="flex ml-auto bg-[#282b3a] text-gray-50 hover:scale-105 transition-all p-2 text-xs"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default ShowMoreText;
