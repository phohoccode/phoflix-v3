"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputGroup } from "@/components/ui/input-group";
import { fetchDataMoviePreview } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Input } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPreview from "./SearchPreview";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { setIsOpenModalSearch } from "@/store/slices/systemSlice";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { searchMoviePreview } = useSelector((state: RootState) => state.movie);
  const [keyword, setKeyword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const fetchData = useCallback(
    _.debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchDataMoviePreview({ keyword: searchTerm, limit: 10 }));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    fetchData(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {

      if (keyword.trim() === "") {
        return;
      }

      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
      dispatch(setIsOpenModalSearch(false));
    }
  };

  return (
    <DialogRoot scrollBehavior="inside" open={isOpen} onOpenChange={onClose}>
      <DialogContent padding={1} className="bg-[rgba(40,43,58,0.8)] backdrop-blur">
        <DialogHeader p={1}>
          <DialogTitle>
            <InputGroup startElement={<SearchIcon />} className="w-full">
              <Input
                onKeyDown={(e) => handleKeyDown(e)}
                value={keyword}
                onChange={(e) => handleSearch(e)}
                className="font-normal text-gray-50 bg-transparent border-0 focus:border focus:border-gray-50"
                placeholder="Nhập tên phim cần tìm..."
              />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>
        <DialogBody p={1}>
          <Box className="mt-4">
            <SearchPreview keyword={keyword} />
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default SearchDialog;
