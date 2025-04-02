"use client";

import { Box } from "@chakra-ui/react";
import NavBar from "./layouts/header/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setIsOpenDrawer,
  setIsShowAuthDialog,
  setIsVisiable,
  setLastScrollY,
  setWidth,
} from "@/store/slices/systemSlice";
import { useEffect } from "react";
import DrawerCustom from "./layouts/drawer/DrawerCustom";
import { toaster, Toaster } from "./ui/toaster";
import Footer from "./layouts/Footer";
import AuthDialog from "./dialogs/auth-dialog/AuthDialog";
import ScrollToTopButton from "./ScrollToTopButton";
import { signOut, useSession } from "next-auth/react";

const App = ({ children }: { children: React.ReactNode }) => {
  const { lastScrollY, isOpenDrawer, isShowAuthDialog, typeAuth } = useSelector(
    (state: RootState) => state.system
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion, status }: any = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (!sesstion.user?.email) {
        toaster.create({
          type: "error",
          description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          duration: 2000,
        });

        signOut();
      }
    }
  }, [status]);

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        dispatch(setIsVisiable(false));
      } else {
        dispatch(setIsVisiable(true));
      }

      dispatch(setLastScrollY(currentScrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box>
      <NavBar />
      {children}
      <Footer />

      <DrawerCustom
        isOpen={isOpenDrawer}
        onClose={() => dispatch(setIsOpenDrawer(false))}
      />

      <AuthDialog
        isOpen={isShowAuthDialog}
        type={typeAuth}
        onClose={() => dispatch(setIsShowAuthDialog(false))}
      />

      <Toaster />

      <ScrollToTopButton />
    </Box>
  );
};

export default App;
