"use client";

import { useState } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import Link from "next/link";
import CategoryAndCountryList from "./CategoryAndCountryList";
import { categories, countries } from "@/lib/defines/data";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const MenuBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { windowWidth } = useSelector((state: RootState) => state.system);

  if (windowWidth <= 1320) return null;

  return (
    <ul className="flex text-gray-50 gap-2 items-center">
      <li className="text-sm hover:text-[#ffd875] relative transition-all">
        <Link href="/detail/danh-sach/phim-le" className="p-2">
          Phim lẻ
        </Link>
      </li>
      <li className="text-sm hover:text-[#ffd875] relative transition-all">
        <Link href="/detail/danh-sach/phim-bo" className="p-2">
          Phim bộ
        </Link>
      </li>
      <li className="text-sm hover:text-[#ffd875] relative transition-all">
        <Link href="/detail/danh-sach/hoat-hinh" className="p-2">
          Hoạt hình
        </Link>
      </li>
      <li className="text-sm hover:text-[#ffd875] relative transition-all">
        <Link href="/advance-filter" className="p-2">
          Lọc nâng cao
        </Link>
      </li>
      <li
        className="flex p-2 text-sm cursor-pointer gap-1 items-center relative"
        onMouseEnter={() => setOpenDropdown("country")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Quốc gia</span>
        <ChevronDownIcon />
        {openDropdown === "country" && (
          <CategoryAndCountryList data={countries} type="quoc-gia" />
        )}
      </li>
      <li
        className="flex p-2 text-sm cursor-pointer gap-1 items-center relative"
        onMouseEnter={() => setOpenDropdown("category")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Thể loại</span>
        <ChevronDownIcon />
        {openDropdown === "category" && (
          <CategoryAndCountryList data={categories} type="the-loai" />
        )}
      </li>
    </ul>
  );
};

export default MenuBar;
