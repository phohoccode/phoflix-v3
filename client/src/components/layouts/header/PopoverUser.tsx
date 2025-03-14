"use client";

import { Box, Popover, Portal } from "@chakra-ui/react";
import AvatarUser from "./AvatarUser";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileHeader from "@/components/ProfileHeader";

const PopoverUser = () => {
  const { data: session }: any = useSession();

  return (
    <Popover.Root size="xs" autoFocus={false}>
      <Popover.Trigger asChild>
        <Box className="cursor-pointer">
          <AvatarUser
            name={session.user?.username}
            src={session.user?.avatar}
          />
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="2xl"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10]"
          >
            <Popover.Arrow />
            <Popover.Body p={0}>
              <Box className="p-4">
                <ProfileHeader />
              </Box>
              <Box className="w-full h-[0.5px] bg-[#ffffff10]" />

              <ul className="py-2 flex flex-col gap-1">
                <li>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FaHeart />
                    Yêu thích
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FaPlus />
                    Danh sách
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FaHistory />
                    Lịch sử xem
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FaUser />
                    Tài khoản
                  </Link>
                </li>

                <Box className="w-full h-[0.5px] bg-[#ffffff10]" />

                <li onClick={() => signOut({ callbackUrl: "/" })}>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FiLogOut />
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverUser;
