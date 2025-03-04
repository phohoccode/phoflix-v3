"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import SearchButton from "./SearchButton";
import AuthButton from "./AuthButton";
import NotifyButton from "./NotifyButton";
import AvartarUser from "./AvatarUser";
import MenuBar from "./MenuBar";
import BarButton from "./BarButton";

import "../../../assets/css/navbar.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const NavBar = () => {
  const { loaded, windowWidth } = useSelector(
    (state: RootState) => state.system
  );

  return (
    <header className="flex  items-center justify-between pl-4 pr-4 h-14 fixed left-0 right-0 top-0 z-50 bg-transparent">
      <Box className="flex items-center gap-6">
        {loaded && <BarButton />}
        {windowWidth > 456 && (
          <Link
            href="/"
            className="text-[#0891b2] font-bold lg:text-lg text-sm"
          >
            PHOFLIX-V3
          </Link>
        )}
        {loaded && <MenuBar />}
      </Box>
      <Box className="flex items-center gap-4">
        <SearchButton />
        <NotifyButton />
        <AuthButton />
        {windowWidth > 1024 && <AvartarUser />}
      </Box>
    </header>
  );
};

export default NavBar;
