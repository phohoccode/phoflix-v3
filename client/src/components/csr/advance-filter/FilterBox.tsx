"use client";

import Refreshicon from "@/components/icons/RefresIcon";
import { categories, countries } from "@/lib/defind";
import { updateSearchParams } from "@/lib/utils";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch } from "@/store/store";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface FilterOptions {
  country: any;
  category: any;
  year: any;
  sort_lang: any;
  sort_type: any;
}

const currentYear = new Date().getFullYear();
const recentYears = Array.from({ length: 10 }, (_, i) => {
  return {
    id: currentYear - i,
    name: currentYear - i,
    slug: currentYear - i,
  };
});

const filterOptions = [
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...countries],
    id: "country",
    title: "Quốc gia",
  },
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...categories],
    id: "category",
    title: "Thể loại",
  },
  {
    data: [{ _id: "", name: "Tất cả", slug: "" }, ...recentYears],
    id: "year",
    title: "Năm",
  },
  {
    data: [
      { _id: "", name: "Tất cả", slug: "" },
      { _id: "vietsub", name: "Việt Sub", slug: "vietsub" },
      { _id: "thuyetminh", name: "Thuyết Minh", slug: "thuyet-minh" },
      { _id: "longtieng", name: "Lồng Tiếng", slug: "long-tieng" },
    ],
    id: "sort_lang",
    title: "Phiên bản",
  },
  {
    data: [
      { _id: "desc", name: "Mới nhất", slug: "desc" },
      { _id: "asc", name: "Cũ nhất", slug: "asc" },
    ],
    id: "sort_type",
    title: "Sắp xếp",
  },
];

const FilterBox = () => {
  const [filter, setFilter] = useState<any>({
    country: "",
    category: "",
    year: "",
    sort_lang: "",
    sort_type: "desc",
  });
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleSetFilter = (key: string, value: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilter = () => {
    setFilter({
      country: "",
      category: "",
      year: "",
      sort_lang: "",
      sort_type: "desc",
    });
  };

  const handleSearch = () => {
    dispatch(
      fetchDataMovieSearch({
        ...filter,
        keyword: "a",
      })
    );

    const newQuery = updateSearchParams(filter);
    router.push(`?${newQuery}`);
  };

  return (
    <Box className="flex flex-col border border-[#ffffff10] rounded-2xl">
      <>
        {filterOptions.map((option) => (
          <Box
            key={option.id}
            className="flex lg:gap-6 gap-4 items-start p-4 border-b border-[#ffffff10]"
          >
            <span className="lg:text-sm text-xs text-end lg:min-w-32 min-w-20 text-gray-50 font-semibold">
              {`${option.title}:`}
            </span>
            <ul className="flex flex-wrap gap-4 items-center">
              {option.data.map((item: any, index: number) => (
                <li
                  onClick={() => handleSetFilter(option.id, item.slug)}
                  key={index}
                  className={`px-1 lg:text-sm text-xs cursor-pointer hover:text-[#f1c40f] transition-all
                      ${
                        filter[option.id] === item.slug
                          ? "text-[#f1c40f]"
                          : "text-gray-50"
                      }
                    `}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </>
      <Box className="flex gap-6 items-start p-4">
        <span className=" min-w-32 ">&nbsp;</span>
        <Box className="flex gap-4">
          <Button
            onClick={() => handleSearch()}
            variant="solid"
            rounded="full"
            colorPalette="yellow"
            size="sm"
          >
            Lọc kết quả
          </Button>
          <IconButton
            onClick={handleResetFilter}
            variant="surface"
            rounded="full"
            colorPalette="pink"
            size="sm"
          >
            <Refreshicon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBox;
