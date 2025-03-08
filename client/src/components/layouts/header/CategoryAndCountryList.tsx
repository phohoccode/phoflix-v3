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
      className="absolute left-0 top-[calc(100%-16px)] mt-2 min-w-2xl overflow-hidden bg-[#191b24] shadow-lg rounded-lg 
      opacity-0 translate-y-2 transition-all duration-300 ease-in-out"
      style={{ opacity: 1, transform: "translateY(0)" }}
    >
      <ul className="flex gap-2 p-2 flex-wrap text-gray-50">
        {data.map((item) => (
          <li
            key={item._id}
            className="px-4 py-2 text-sm transition hover:text-[#f1c40f] rounded-sm"
          >
            <Link href={`/detail/${type}/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CategoryAndCountryList;
