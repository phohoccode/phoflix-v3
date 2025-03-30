"use client";

import { Box, IconButton, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { IoNotifications } from "react-icons/io5";
import HeaderNotification from "./HeaderNotification";
import Link from "next/link";

const PopoverNotification = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer">
          <IconButton
            size="sm"
            variant="solid"
            className="lg:bg-[#ffffff5e] bg-transparent"
            rounded="full"
          >
            <IoNotifications />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="xl"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] max-w-[320px]"
          >
            <Popover.Arrow />
            <Popover.Body p={0}>
              <HeaderNotification />
            </Popover.Body>

            <Popover.Footer p={0}>
              <Box className="flex items-center justify-center w-full p-4">
                <Link href="#" className="text-sm text-gray-200">
                  Xem tất cả
                </Link>
              </Box>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverNotification;
