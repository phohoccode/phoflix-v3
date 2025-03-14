"use client";

import { Box, Popover, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import SearchButton from "./SearchButton";
import AuthButton from "./AuthButton";
import NotificationButton from "./NotificationButton";
import AvatarUser from "./AvatarUser";
import MenuBar from "./MenuBar";
import BarButton from "./BarButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";

import "../../../assets/css/navbar.css";
import { useEffect } from "react";
import { SkeletonCircle } from "@/components/ui/skeleton";
import PopoverUser from "./PopoverUser";
import { setIsOpenPopoverUser } from "@/store/slices/systemSlice";

const NavBar = () => {
  const { loaded, windowWidth, isVisiable, lastScrollY, isOpenPopoverUser } =
    useSelector((state: RootState) => state.system);
  const { status } = useSession();
  const dispatch: AppDispatch = useDispatch();

  return (
    <header
      className={`flex items-center justify-between fixed left-0 right-0 top-0 z-50 h-14 
        bg-transparent pl-4 pr-4 transition-all 
        ${isVisiable ? "translate-y-0" : "-translate-y-full"} 
        ${lastScrollY > 0 ? "backdrop-blur" : ""}`}
    >
      <Box className="flex items-center gap-6">
        {loaded && <BarButton />}
        {windowWidth > 456 && (
          <Link href="/" className="text-primary font-bold lg:text-lg text-sm">
            PHOFLIX-V3
          </Link>
        )}
        {loaded && <MenuBar />}
      </Box>
      <Box className="flex items-center gap-4">
        <SearchButton />
        <NotificationButton />
        {status === "loading" && <SkeletonCircle size="9" />}
        {status === "unauthenticated" && <AuthButton />}
        {status === "authenticated" && <PopoverUser />}
      </Box>
    </header>
  );
};

export default NavBar;
