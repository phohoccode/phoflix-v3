"use client";

import { Box, Spinner } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";

interface CheckboxPlaylistProps {
  playlist: Playlist;
  playlistIds: string[];
  idCheckbox: string | null;
  callback: (value: string, checked: boolean) => void;
}

const CheckboxPlaylist = ({
  playlist,
  playlistIds,
  idCheckbox,
  callback,
}: CheckboxPlaylistProps) => {

  // Tạo hiệu ứng loading cho checkbox
  if (playlist.id === idCheckbox) {
    return (
      <Box className="flex gap-2 items-center">
        <Spinner size="sm" />
        <span>{playlist.name}</span>
      </Box>
    );
  }

  return (
    <Checkbox
      colorPalette="whiteAlpha"
      variant="subtle"
      className="flex items-center gap-2 cursor-pointer"
      checked={playlistIds?.includes(playlist.id)}
      onCheckedChange={(checked) => {
        callback(playlist.id, checked.checked === true);
      }}
    >
      {playlist.name}
    </Checkbox>
  );
};

export default CheckboxPlaylist;
