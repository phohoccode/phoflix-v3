"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileHeader from "@/components/ProfileHeader";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const menu = [
  {
    icon: <FaHeart />,
    label: "Yêu thích",
    link: "/user/favorite",
  },
  {
    icon: <FaPlus />,
    label: "Danh sách",
    link: "/user/playlist",
  },
  {
    icon: <FaHistory />,
    label: "Lịch sử xem",
    link: "/user/history",
  },
  {
    icon: <FaUser />,
    label: "Tài khoản",
    link: "/user/profile",
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box className="lg:w-72 w-full lg:p-10 p-4 rounded-2xl bg-[#25272f] lg:sticky lg:top-20 lg:max-h-[600px]">
      <Box className="flex flex-col gap-6">
        <h4 className="text-lg text-gray-50 lg:text-left text-center">
          Quản lý tài khoản
        </h4>
        <ul className="flex lg:flex-col lg:gap-1 md:gap-4 gap-2 flex-row lg:justify-start justify-center lg:mb-32">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex md:flex-row whitespace-nowrap flex-col gap-2 items-center lg:text-sm text-xs lg:py-4 lg:px-0 p-2 lg:border-b border-[#2e313a] hover:text-[#f1c40f] transition-all
                    ${
                      pathname === item.link ? "text-[#f1c40f]" : "text-gray-50"
                    }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Box className="lg:flex hidden flex-col gap-4">
          <ProfileHeader />
          <Box
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex gap-2 cursor-pointer items-center text-gray-50 text-sm py-4 hover:text-[#f1c40f] transition-all"
          >
            <FiLogOut />
            Đăng xuất
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
