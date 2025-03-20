"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import { getPlaylists } from "@/lib/actions/userActionClient";
import { Box, Checkbox, Popover, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";

interface PlaylistButtonProps {
  placement?: "vertical" | "horizontal";
}

const PlaylistButton = ({ placement = "vertical" }: PlaylistButtonProps) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    startTransition(async () => {
      const response = await getPlaylists(session?.user?.id as string);

      const { playlists } = response?.result || {};

      setPlaylists(playlists);
    });
  }, []);

  console.log("playlists", playlists);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Box
          className={`p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
            placement === "vertical" ? "flex-col" : "flex-row"
          }`}
        >
          <PlusIcon />
          <span className="text-xs">Thêm vào</span>
        </Box>
      </Popover.Trigger>

     <Portal>
        <Popover.Positioner css={{
          zIndex: "9999 !important",
        }}>
          <Popover.Arrow />
          <Popover.Content className="p-4 max-w-[120px] flex flex-col gap-2 rounded-lg">
            {playlists?.map((playlist, index) => (
              <Checkbox.Root key={index} colorScheme="inherit">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{playlist?.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Popover.Content>
        </Popover.Positioner>
     </Portal>
    </Popover.Root>
  );
};

export default PlaylistButton;
