"use client";

import { filterOptions } from "@/lib/defines/data";
import { updateSearchParams } from "@/lib/utils";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";
import FilterActions from "./FilterActions";

const options = {
  charactor: "a",
  country: "",
  category: "",
  year: "",
  sort_lang: "",
  sort_type: "desc",
};

const FilterBox = () => {
  const [filter, setFilter] = useState<any>(options);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleSetFilter = (key: string, value: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilter = () => {
    setFilter(options);
  };

  const handleSearch = () => {
    dispatch(
      fetchDataMovieSearch({
        ...filter,
        keyword: filter.charactor,
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
            <FilterItem
              option={option}
              handleSetFilter={handleSetFilter}
              filter={filter}
            />
          </Box>
        ))}
      </>
      <Box className="flex gap-6 items-start p-4">
        <span className=" min-w-32 md:inline-block hidden">&nbsp;</span>
        <FilterActions
          handleSearch={handleSearch}
          handleResetFilter={handleResetFilter}
        />
      </Box>
    </Box>
  );
};

export default FilterBox;
