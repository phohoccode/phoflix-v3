import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./slices/systemSlice";
import movieReducer from "./slices/movieSlice";
import userReducer from "./slices/userSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    movie: movieReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
