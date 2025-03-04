"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { setIsOpenModalSearch } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const SearchButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);

  return (
    <>
      {windowWidth > 1024 ? (
        <Button
          onClick={() => dispatch(setIsOpenModalSearch(true))}
          className="min-w-64"
          size="xs"
          variant="surface"
          colorScheme="gray"
          
        >
          <SearchIcon />
          <span className="flex-1 text-left ml-2">Tìm kiếm...</span>
        </Button>
      ) : (
        <IconButton
          onClick={() => dispatch(setIsOpenModalSearch(true))}
          size={"xs"}
          variant={"surface"}
          colorScheme={"gray"}
        >
          <SearchIcon />
        </IconButton>
      )}
    </>
  );
};

export default SearchButton;
