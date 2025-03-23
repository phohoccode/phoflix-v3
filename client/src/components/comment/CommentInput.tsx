"use client";

import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const CommentInput = () => {
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const maxLength = 1000;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    setLength(value.length);
  };

  return (
    <Box className="flex flex-col justify-end gap-2 p-2 rounded-xl bg-[#ffffff10] mt-4">
      <Box className="relative">
        <Textarea
          maxLength={maxLength}
          autoresize
          onChange={handleChangeInput}
          value={value}
          placeholder="Viết bình luận..."
          className="h-full min-h-32 bg-[#191b24] text-white rounded-lg p-4 border-2 border-transparent focus:border-gray-400"
        />
        <span className="text-xs absolute top-1.5 right-2 text-gray-400">
          {length}/{maxLength}
        </span>
      </Box>
      <Button
        size="sm"
        maxWidth={120}
        className="bg-transparent text-[#ffd875] ml-auto max-w hover:opacity-80 transition-all"
      >
        Gửi
        <IoMdSend />
      </Button>
    </Box>
  );
};

export default CommentInput;
