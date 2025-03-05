import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataSlideShow,
  fetchDataMovie,
} from "../asyncThunks/movieAsyncThunk";

const initialState: MovieSlice = {
  slideShows: {
    items: [],
    loading: false,
    error: false,
  },
  movieData: {
    televisonSeries: {
      items: [],
      breadCrumb: [],
      params: {},
      loading: false,
      error: false,
    },
    featureFilms: {
      items: [],
      breadCrumb: [],
      params: {},
      loading: false,
      error: false,
    },
    cartoon: {
      items: [],
      breadCrumb: [],
      params: {},
      loading: false,
      error: false,
    },
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataSlideShow.pending, (state, action) => {
      state.slideShows.loading = true;
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.fulfilled, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.items = action.payload?.items ?? [];
      state.slideShows.error = false;
    });
    builder.addCase(fetchDataSlideShow.rejected, (state, action) => {
      state.slideShows.loading = false;
      state.slideShows.error = true;
    });
    builder.addCase(fetchDataMovie.pending, (state, action) => {
      state.movieData.televisonSeries.loading = true;
      state.movieData.featureFilms.loading = true;
      state.movieData.cartoon.loading = true;
    });
    builder.addCase(fetchDataMovie.fulfilled, (state, action) => {
      console.log(action.payload);

      switch (action.payload?.type) {
        case "phim-bo":
          state.movieData.televisonSeries.loading = false;
          state.movieData.televisonSeries.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "phim-le":
          state.movieData.featureFilms.loading = false;
          state.movieData.featureFilms.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "hoat-hinh":
          state.movieData.cartoon.loading = false;
          state.movieData.cartoon.items =
            action.payload?.res?.data?.items ?? [];
          break;
        default:
          break;
      }
    });
    builder.addCase(fetchDataMovie.rejected, (state, action) => {
      state.movieData.televisonSeries.loading = false;
      state.movieData.televisonSeries.error = true;
      state.movieData.featureFilms.loading = false;
      state.movieData.featureFilms.error = true;
      state.movieData.cartoon.loading = false;
      state.movieData.cartoon.error = true;
    });
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
