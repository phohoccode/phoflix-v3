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
  setLoaded,
  setWidth,
} from "@/store/slices/systemSlice";
import NotifyDialog from "./dialogs/notify-dialog/NotifyDialog";
import { useEffect } from "react";
import DrawerCustom from "./drawer/DrawerCustom";

const App = ({ children }: { children: React.ReactNode }) => {
  const { isOpenModalNotification, isOpenModalSearch, isOpenDrawer } =
    useSelector((state: RootState) => state.system);
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

  return (
    <Box>
      <NavBar />
      {children}

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
    </Box>
  );
};

export default App;
