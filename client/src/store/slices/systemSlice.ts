import { createSlice } from "@reduxjs/toolkit";

const initialState: SystemSlice = {
  isOpenModalSearch: false,
  isOpenModalNotification: false,
  isOpenDrawer: false,
  windowWidth: 0,
  loaded: false,
  lastScrollY: 0,
  isVisiable: true,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setIsOpenModalSearch: (state, action) => {
      state.isOpenModalSearch = action.payload;
    },
    setIsOpenModalNotification: (state, action) => {
      state.isOpenModalNotification = action.payload;
    },
    setWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload;
    },
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
    },
  },
});

export const {
  setIsOpenModalSearch,
  setIsOpenModalNotification,
  setWidth,
  setIsVisiable,
  setLastScrollY,
  setIsOpenDrawer,
  setLoaded,
} = systemSlice.actions;
export default systemSlice.reducer;
