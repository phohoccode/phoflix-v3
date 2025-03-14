"use client";

import Link from "next/link";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../ui/accordion";
import { categories, countries } from "@/lib/defines/data";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";

const Body = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <ul className="flex flex-col gap-1 h-full">
      <li onClick={() => dispatch(setIsOpenDrawer(false))}>
        <Link
          href="/"
          className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
        >
          Trang chủ
        </Link>
      </li>
      <li onClick={() => dispatch(setIsOpenDrawer(false))}>
        <Link
          href="/detail/danh-sach/phim-le"
          className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
        >
          Phim lẻ
        </Link>
      </li>
      <li onClick={() => dispatch(setIsOpenDrawer(false))}>
        <Link
          href="/detail/danh-sach/phim-bo"
          className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
        >
          Phim bộ
        </Link>
      </li>
      <li onClick={() => dispatch(setIsOpenDrawer(false))}>
        <Link
          href="/detail/danh-sach/hoat-hinh"
          className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
        >
          Hoạt hình
        </Link>
      </li>
      <li onClick={() => dispatch(setIsOpenDrawer(false))}>
        <Link
          href="/advance-filter"
          className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
        >
          Lọc nâng cao
        </Link>
      </li>
      <li className="cursor-pointer">
        <AccordionRoot collapsible className="text-sm pl-2 pr-2">
          <AccordionItem value="categories">
            <AccordionItemTrigger className="text-sm">
              Thể loại
            </AccordionItemTrigger>
            <AccordionItemContent>
              <ul className="flex flex-col gap-1">
                {categories.map((category) => (
                  <li
                    key={category._id}
                    onClick={() => dispatch(setIsOpenDrawer(false))}
                  >
                    <Link
                      href={`/detail/the-loai/${category.slug}`}
                      className="flex text-sm w-full p-2 flex-1 rounded-sm transition-all hover:bg-[#ffffff05]"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </li>
      <li className="cursor-pointer">
        <AccordionRoot collapsible className="text-sm pl-2 pr-2">
          <AccordionItem value="categories">
            <AccordionItemTrigger className="text-sm">
              Quốc gia
            </AccordionItemTrigger>
            <AccordionItemContent>
              <ul className="flex flex-col gap-1">
                {countries.map((country) => (
                  <li
                    key={country._id}
                    onClick={() => dispatch(setIsOpenDrawer(false))}
                  >
                    <Link
                      href={`/detail/quoc-gia/${country.slug}`}
                      className="flex text-sm w-full p-2 flex-1 rounded-sm transition-all hover:bg-gray-100"
                    >
                      {country.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </li>
    </ul>
  );
};

export default Body;
