"use client";

import ActionsPlaylist from "@/components/csr/user/playlist/ActionsPlaylist";
import PlusIcon from "@/components/icons/PlusIcon";
import { Checkbox } from "@/components/ui/checkbox";
import { toaster } from "@/components/ui/toaster";
import {
  addNewMovie,
  deleteMovie,
  getPlaylists,
  getPlaylistsContainingMovie,
} from "@/lib/actions/userActionClient";
import { RootState } from "@/store/store";
import { Box, Button, Popover, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

interface PlaylistButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const PlaylistButton = ({
  placement = "horizontal",
  responsiveText = false,
}: PlaylistButtonProps) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistIds, setPlaylistIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { data: session } = useSession();
  const params = useParams();

  useEffect(() => {
    if (!session?.user?.id) return;

    handleGetPlaylist();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;

    handleGetPlaylistIds();
  }, [params.slug]);

  const handleGetPlaylist = async () => {
    const response = await getPlaylists(session?.user?.id as string);

    const { playlists } = response?.result || {};

    setPlaylists(playlists);
  };

  const handleGetPlaylistIds = async () => {
    const response = await getPlaylistsContainingMovie({
      userId: session?.user?.id as string,
      movieSlug: (params?.slug as string) || "",
    });

    const { playlistIds } = response?.result || { playlistIds: [] };

    setPlaylistIds(playlistIds);
  };

  const handleActionsPlaylist = (value: string, checked: boolean) => {
    let response: any = null;

    startTransition(async () => {
      if (checked) {
        response = await addNewMovie({
          userId: session?.user?.id as string,
          type: "playlist",
          movieData: {
            movieSlug: movie.slug,
            movieName: movie.name,
            movieThumbnail: movie.thumb_url,
            moviePoster: movie.poster_url,
          },
          playlistId: value,
        });
      } else {
        response = await deleteMovie({
          userId: session?.user?.id as string,
          movieSlug: movie.slug,
          type: "playlist",
          playlistId: value,
        });
      }

      if (response?.status) {
        toaster.create({
          description: response?.message,
          type: "success",
          duration: 1000,
        });

        handleGetPlaylistIds();
      } else {
        toaster.create({
          description: response?.message,
          type: "error",
          duration: 1000,
        });
      }
    });
  };

  const handleErrorWhenNotLoggedIn = () => {
    toaster.create({
      description: "Vui lòng đăng nhập để sử dụng tính năng này",
      type: "error",
      duration: 1000,
    });
  };

  if (!session) {
    return (
      <Box
        onClick={handleErrorWhenNotLoggedIn}
        className={`p-2 sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
          placement === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        <PlusIcon />
        <span
          className={`text-xs ${!responsiveText ? "block" : "hidden xs:block"}`}
        >
          Thêm vào
        </span>
      </Box>
    );
  }

  return (
    <Popover.Root autoFocus={false}>
      <Popover.Trigger asChild>
        <Box
          className={`p-2 sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
            placement === "vertical" ? "flex-col" : "flex-row"
          }`}
        >
          <PlusIcon />
          <span
            className={`text-xs whitespace-nowrap ${
              !responsiveText ? "block" : "hidden xs:block"
            }`}
          >
            Thêm vào
          </span>
        </Box>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "123 !important",
          }}
        >
          <Popover.Arrow />
          <Popover.Content className="p-4 max-w-[260px] rounded-lg bg-[#2a314e] text-gray-50">
            {!playlists || playlists.length === 0 ? (
              <p className="text-sm text-gray-300 mb-3">
                Tạo danh sách phát để lưu trữ và quản lý những bộ phim bạn yêu
                thích.
              </p>
            ) : (
              <Box className="mb-4 flex flex-col gap-4">
                {playlists?.map((playlist, index) => (
                  <Checkbox
                    key={index}
                    colorPalette="yellow"
                    variant="solid"
                    className="flex items-center gap-2 cursor-pointer"
                    checked={playlistIds?.includes(playlist.id)}
                    onCheckedChange={(checked) => {
                      handleActionsPlaylist(
                        playlist.id,
                        checked.checked === true
                      );
                    }}
                  >
                    {playlist.name}
                  </Checkbox>
                ))}
              </Box>
            )}

            <ActionsPlaylist action="create" trigger={handleGetPlaylist}>
              <Button
                size="sm"
                className="bg-[#ffd875] text-gray-900 text-sm hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                <FaPlus />
                Thêm mới
              </Button>
            </ActionsPlaylist>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PlaylistButton;
