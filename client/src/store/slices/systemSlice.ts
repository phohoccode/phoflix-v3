import { createSlice } from "@reduxjs/toolkit";

const initialState: TypeSystemSlice = {
  isOpenModalSearch: false,
  isOpenModalNotification: false,
  isOpenDrawer: false,
  windowWidth: 0,
  loaded: false,
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
  },
});

export const {
  setIsOpenModalSearch,
  setIsOpenModalNotification,
  setWidth,
  setIsOpenDrawer,
  setLoaded,
} = systemSlice.actions;
export default systemSlice.reducer;
