"use client";

import EmptyData from "@/components/EmptyData";
import {
  deleteAllUserSearchHistory,
  deleteUserSearchHistory,
  getUserSearchHistory,
} from "@/store/asyncThunks/userAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, IconButton, Skeleton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoClockFill } from "react-icons/go";
import { BsXLg } from "react-icons/bs";
import Spinner from "@/app/loading";
import AlertDialog from "../AlertDialog";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { setIsOpenModalSearch } from "@/store/slices/systemSlice";

interface SearchHistoryProps {
  keyword: string;
}

const SearchHistory = ({ keyword }: SearchHistoryProps) => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.user.searchHistory
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (session) {
      dispatch(getUserSearchHistory(session.user?.id as string));
    }
  }, []);

  const handleDeleteSearchHistory = (id: string) => {
    if (session) {
      startTransition(async () => {
        await dispatch(
          deleteUserSearchHistory({
            id,
            userId: session.user?.id as string,
          })
        );
        dispatch(getUserSearchHistory(session.user?.id as string));
      });
    }
  };

  const handleDeleteAllSearchHistory = () => {
    if (session) {
      startTransition(async () => {
        const response: any = await dispatch(
          deleteAllUserSearchHistory(session.user?.id as string)
        );

        const { status, message } = response.payload;

        if (status) {
          dispatch(getUserSearchHistory(session.user?.id as string));
        }

        toaster.create({
          title: "Thông báo",
          description: message,
          duration: 2000,
          type: status ? "success" : "error",
        });
      });
    }
  };

  if (keyword?.trim() !== "") return null;
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-36">
        <div className="w-10 h-10 border-[3px] border-b-transparent border-[#f1c40f] rounded-full animate-spin"></div>
      </div>
    );

  if (items?.length === 0 && !loading) {
    return (
      <EmptyData
        title="Lịch sử tìm kiếm trống"
        description="Tìm kiếm ngay để xem phim bạn yêu thích!"
      />
    );
  }

  return (
    <Box className="flex flex-col gap-6">
      <ul className="flex flex-col gap-2">
        {items?.map((item: any, index: number) => (
          <li
            className="flex h-12 justify-between items-center p-2 rounded-lg hover:bg-[#ffffff05] text-gray-50 text-sm"
            key={index}
          >
            <Link
              onClick={() => dispatch(setIsOpenModalSearch(false))}
              className="flex-1 h-full flex items-center"
              href={`/search?keyword=${encodeURIComponent(item?.keyword)}`}
            >
              <Box className="flex gap-2 items-center flex-1 max-w-[90%]">
                <GoClockFill />
                <span className="truncate w-full">{item?.keyword}</span>
              </Box>
            </Link>
            <IconButton
              onClick={() => handleDeleteSearchHistory(item?.id)}
              className="bg-transparent flex-shrink-0"
              aria-label="delete"
              size="xs"
              loading={isPending}
            >
              <BsXLg />
            </IconButton>
          </li>
        ))}
      </ul>

      {items?.length >= 2 && (
        <AlertDialog
          title="Xóa tất cả lịch sử tìm kiếm"
          content="Bạn có chắc chắn muốn xóa tất cả lịch sử tìm kiếm?"
          loading={isPending}
          confirmCallback={handleDeleteAllSearchHistory}
          trigger={
            <Button
              className="bg-transparent text-sm text-gray-50 mx-auto hover:text-[#f1c40f] transition-all"
              size="xs"
            >
              Xóa tất cả
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default SearchHistory;
