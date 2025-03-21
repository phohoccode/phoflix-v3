"use client";

import { setSelectedReview } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

export const options = [
  { id: 1, emoji: "/images/reviews/rate-5.webp", text: "Tuyệt vời", value: 10 },
  { id: 2, emoji: "/images/reviews/rate-4.webp", text: "Phim hay", value: 8 },
  { id: 3, emoji: "/images/reviews/rate-3.webp", text: "Khá ổn", value: 6 },
  { id: 4, emoji: "/images/reviews/rate-2.webp", text: "Tệ", value: 4 },
  { id: 5, emoji: "/images/reviews/rate-1.webp", text: "Rất tệ", value: 2 },
];

const ReviewEmo = () => {
  const { selectedReview } = useSelector(
    (state: RootState) => state.user.reviews
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 rounded-xl p-4 bg-[#0000004d]">
      {options.map((option) => (
        <Box
          onClick={() => dispatch(setSelectedReview(option))}
          key={option.id}
          className={`flex md:flex-col flex-row gap-4 items-center justify-center cursor-pointer px-2 py-4 rounded-lg
              ${
                selectedReview?.id === option.id
                  ? "bg-[#3556b6] grayscale-0"
                  : "grayscale hover:grayscale-0"
              }
            `}
        >
          <Box className="md:w-16 md:h-16 w-8 h-8">
            <img
              src={option.emoji}
              alt={option.text}
              className="w-full h-full"
            />
          </Box>
          <p className="text-xs text-gray-50">{option.text}</p>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewEmo;
