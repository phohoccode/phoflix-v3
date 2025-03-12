"use client";

import { Box } from "@chakra-ui/react";
import NavBar from "./layouts/header/NavBar";
import SearchDialog from "./dialogs/search-dialog/SearchDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setIsOpenDrawer,
  setIsOpenModalNotification,
  setIsOpenModalSearch,
  setIsShowAuthDialog,
  setIsVisiable,
  setLastScrollY,
  setLoaded,
  setWidth,
} from "@/store/slices/systemSlice";
import NotifyDialog from "./dialogs/notification-dialog/NotificationDialog";
import { useEffect } from "react";
import DrawerCustom from "./drawer/DrawerCustom";
import { Toaster } from "./ui/toaster";
import Footer from "./layouts/Footer";
import AuthDialog from "./dialogs/auth-dialog/AuthDialog";
import ScrollToTopButton from "./ScrollToTopButton";

const App = ({ children }: { children: React.ReactNode }) => {
  const {
    isOpenModalNotification,
    lastScrollY,
    isOpenModalSearch,
    isOpenDrawer,
    isShowAuthDialog,
    typeAuth,
  } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
    dispatch(setLoaded(true));
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

      <SearchDialog
        isOpen={isOpenModalSearch}
        onClose={() => dispatch(setIsOpenModalSearch(false))}
      />

      <NotifyDialog
        isOpen={isOpenModalNotification}
        onClose={() => dispatch(setIsOpenModalNotification(false))}
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
