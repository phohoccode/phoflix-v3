"use client";

import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ActionsPlaylist from "./ActionsPlaylist";
import { IoPlayCircleOutline } from "react-icons/io5";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setSelectedPlaylistId } from "@/store/slices/userSlice";
interface PlaylistsProps {
  playlists: any;
}

const Playlists = ({ playlists }: PlaylistsProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const playlistId = params.get("playlistId");
  const dispatch: AppDispatch = useDispatch();
  const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
    return (
      playlists?.find((playlist: any) => playlist?.id === playlistId) ||
      playlists?.[0]
    );
  });

  useEffect(() => {
    if (playlistId) {
      const playlist = playlists?.find(
        (playlist: any) => playlist?.id === playlistId
      );

      dispatch(setSelectedPlaylistId(playlist?.id));
    } else {
      dispatch(setSelectedPlaylistId(playlists?.[0]?.id));
    }
  }, [playlists]);

  const handleChangePlaylist = (playlist: any) => {
    const params = new URLSearchParams(window.location.search);

    params.set("playlistId", playlist?.id.toString());
    params.set("playlistName", playlist?.name.toString());
    router.replace(`?${params.toString()}`);

    setSelectedPlaylist(playlist);
  };

  if (!playlists || playlists?.length === 0) return null;

  return (
    <Box className="grid grid-cols-2 gap-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 my-6">
      {playlists.map((playlist: any, index: number) => (
        <Box
          onClick={() => handleChangePlaylist(playlist)}
          key={index}
          className={`
              p-3 rounded-xl border-2 flex flex-col gap-2
              cursor-pointer
              transition-all
              bg-transparent
              ${
                selectedPlaylist?.id === playlist?.id
                  ? "border-[#ffd875]"
                  : "border-[#ffffff10]"
              }
            `}
        >
          <span className="text-gray-50 text-sm">{playlist?.name}</span>
          <Box className="flex justify-between items-center">
            <Box className="flex flex-1 gap-1 items-center text-gray-200">
              <IoPlayCircleOutline />
              <span className="text-xs">{playlist?.totalMovie} phim</span>
            </Box>

            <ActionsPlaylist
              action="update"
              value={playlist?.name}
              playlistId={playlist?.id}
            >
              <span className="text-gray-200 text-xs underline">Sửa</span>
            </ActionsPlaylist>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Playlists;
