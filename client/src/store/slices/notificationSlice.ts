import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationSlice = {
  data: {
    conmunity: [],
    individual: [],
  },
  activeTab: "community",
  loading: false,
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setActiveTab } = notificationSlice.actions;
export default notificationSlice.reducer;
