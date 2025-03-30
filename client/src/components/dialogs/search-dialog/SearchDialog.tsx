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
import { AppDispatch } from "@/store/store";
import { Box, Input, Kbd } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import SearchPreview from "./SearchPreview";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { setIsOpenModalSearch } from "@/store/slices/systemSlice";
import { toaster } from "@/components/ui/toaster";
import SearchHistory from "./SearchHistory";
import { createUserSearchHistory } from "@/store/asyncThunks/userAsyncThunk";
import { useSession } from "next-auth/react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [keyword, setKeyword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { data: sesstion } = useSession();

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
        toaster.create({
          title: "Thông báo",
          description: "Bạn muốn tìm gì thế?",
          duration: 2000,
        });
        return;
      }

      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
      dispatch(setIsOpenModalSearch(false));
      setKeyword("");

      if (sesstion) {
        dispatch(
          createUserSearchHistory({
            userId: sesstion.user?.id as string,
            keyword: keyword as string,
          })
        );
      }
    }
  };

  return (
    <DialogRoot scrollBehavior="inside" open={isOpen} onOpenChange={onClose}>
      <DialogContent
        padding={1}
        className="bg-[#2a314e] text-gray-50 border border-[#ffffff10] rounded-2xl backdrop-blur mx-4 lg:max-w-[560px] md:max-w-[520px] max-w-[420px]"
      >
        <DialogHeader p={1}>
          <DialogTitle>
            <InputGroup
              startElement={<SearchIcon />}
              endElement={<Kbd>Enter</Kbd>}
              className="w-full"
            >
              <Input
                onKeyDown={(e) => handleKeyDown(e)}
                value={keyword}
                onChange={(e) => handleSearch(e)}
                className="font-normal text-gray-50 rounded-xl truncate bg-transparent border border-gray-400 focus:border-gray-100"
                placeholder="Nhập tên phim cần tìm..."
              />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>
        <DialogBody p={1}>
          <Box className="mt-4">
            <SearchPreview keyword={keyword} />
            <SearchHistory keyword={keyword} />
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default SearchDialog;
