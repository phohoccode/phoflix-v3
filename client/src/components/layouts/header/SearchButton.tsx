"use client";

import { setIsOpenModalSearch } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";

const SearchButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(setIsOpenModalSearch(true))}
      className="2xl:min-w-60 lg:min-w-48 lg:bg-[#ffffff5e] bg-transparent"
      size="sm"
      variant="solid"
      rounded="full"
    >
      <IoSearch />
      <span className="flex-1 text-left ml-1 lg:block hidden">
        Tìm kiếm phim ...
      </span>
    </Button>
  );
};

export default SearchButton;
