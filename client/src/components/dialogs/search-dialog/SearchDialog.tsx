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
import useDebounce from "@/hooks/useDebounce";
import { fetchDataMoviePreview } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPreview from "./SearchPreview";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const { searchPreview } = useSelector((state: RootState) => state.movie);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (debouncedKeyword) {
      dispatch(fetchDataMoviePreview({ keyword: debouncedKeyword, limit: 10 }));
    }
  }, [debouncedKeyword, dispatch]);

  return (
    <DialogRoot scrollBehavior="inside" open={isOpen} onOpenChange={onClose}>
      <DialogContent padding={1} className="bg-[#282b3a]">
        <DialogHeader p={1}>
          <DialogTitle>
            <InputGroup startElement={<SearchIcon />} className="w-full">
              <Input
                value={keyword}
                css={{ "--error-color": "#fff" }}
                onChange={(e) => setKeyword(e.target.value)}
                className="font-normal text-gray-50 "
                placeholder="Nhập tên phim cần tìm..."
              />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <SearchPreview keyword={keyword} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default SearchDialog;
