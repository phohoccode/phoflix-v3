import { createSlice } from "@reduxjs/toolkit";
import {
  getFeedbacks,
  getMoreFeedbacks,
} from "../asyncThunks/feedbackAsyncThunk";

const initialState: FeedbackSlice = {
  feedback: {
    items: [],
    loading: false,
    hasMore: false,
    itemCount: 0,
    error: false,
  },

  type: "comment",
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedbacks.pending, (state, action) => {
      state.feedback.loading = true;
      state.feedback.error = false;
    });

    builder.addCase(getFeedbacks.fulfilled, (state, action) => {
      state.feedback.loading = false;
      state.feedback.items = action.payload?.result?.items || [];
      state.feedback.hasMore = action.payload?.result?.has_more ?? false;
      state.feedback.itemCount = action.payload?.result?.item_count ?? 0;
      state.feedback.error = false;
    });

    builder.addCase(getFeedbacks.rejected, (state, action) => {
      state.feedback.loading = false;
      state.feedback.error = true;
    });

    builder.addCase(getMoreFeedbacks.pending, (state, action) => {
      state.feedback.loading = true;
      state.feedback.error = false;
    });

    builder.addCase(getMoreFeedbacks.fulfilled, (state, action) => {
      state.feedback.loading = false;
      state.feedback.items = [
        ...state.feedback.items,
        ...(action.payload?.result?.items || []),
      ];
      state.feedback.hasMore = action.payload?.result?.has_more ?? false;
      state.feedback.itemCount = action.payload?.result?.item_count ?? 0;
      state.feedback.error = false;
    });

    builder.addCase(getMoreFeedbacks.rejected, (state, action) => {
      state.feedback.loading = false;
      state.feedback.error = true;
    });
  },
});

export const { setType } = feedbackSlice.actions;
export default feedbackSlice.reducer;
