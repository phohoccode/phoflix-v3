import { createSlice } from "@reduxjs/toolkit";

const initialState: CommentSlice = {
  comments: {
    items: [],
    loading: false,
    error: false,
  },
  type: "comment",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setType } = commentSlice.actions;
export default commentSlice.reducer;
