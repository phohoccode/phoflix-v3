import { createSlice } from "@reduxjs/toolkit";
import { getUserSearchHistory } from "../asyncThunks/userAsyncThunk";

const initialState: UserSlice = {
  searchHistory: {
    items: [],
    loading: false,
    error: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSearchHistory.pending, (state) => {
      state.searchHistory.loading = true;
      state.searchHistory.error = false;
    });

    builder.addCase(getUserSearchHistory.fulfilled, (state, action) => {
      state.searchHistory.loading = false;
      state.searchHistory.items = action.payload.result;
    });

    builder.addCase(getUserSearchHistory.rejected, (state) => {
      state.searchHistory.loading = false;
      state.searchHistory.error = true;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
