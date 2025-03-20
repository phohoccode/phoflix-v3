"use client";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface CategoryAndCountryListProps {
  data: { _id: string; name: string; slug: string }[];
  type: "the-loai" | "quoc-gia";
}

const CategoryAndCountryList = ({
  data,
  type,
}: CategoryAndCountryListProps) => {
  return (
    <Box
      className="absolute left-0 top-[calc(100%-16px)] mt-2 min-w-2xl overflow-hidden bg-[#0f111af2] text-gray-50 border border-[#ffffff10] shadow-lg rounded-lg 
      opacity-0 translate-y-2 transition-all duration-300 ease-in-out"
      style={{ opacity: 1, transform: "translateY(0)" }}
    >
      <ul className="flex flex-wrap p-2 text-gray-50 gap-1">
        {data.map((item) => (
          <li key={item._id} className="">
            <Link
              className="rounded-sm text-sm block hover:text-[#ffd875] px-4 py-2 transition"
              href={`/detail/${type}/${item.slug}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CategoryAndCountryList;
