import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataSlideShow,
  fetchDataMovie,
  fetchDataMoviePreview,
} from "../asyncThunks/movieAsyncThunk";

const data = {
  items: [],
  loading: false,
  error: false,
};

const initialState: MovieSlice = {
  slideShows: data,
  movieData: {
    vietnameseMovies: data,
    chineseMovies: data,
    koreanMovies: data,
    actionMovies: data,
    horrorMovies: data,
    emotionalMovies: data,
    familyMovies: data,
    historicalDramaMovies: data,
    scienceFictionMovies: data,
  },
  searchPreview: data,
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
      state.movieData.vietnameseMovies.loading = true;
      state.movieData.chineseMovies.loading = true;
      state.movieData.koreanMovies.loading = true;
      state.movieData.actionMovies.loading = true;
      state.movieData.horrorMovies.loading = true;
      state.movieData.emotionalMovies.loading = true;
      state.movieData.familyMovies.loading = true;
      state.movieData.historicalDramaMovies.loading = true;
      state.movieData.scienceFictionMovies.loading = true;
    });
    builder.addCase(fetchDataMovie.fulfilled, (state, action) => {
      switch (action.payload?.type) {
        case "viet-nam":
          state.movieData.vietnameseMovies.loading = false;
          state.movieData.vietnameseMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "trung-quoc":
          state.movieData.chineseMovies.loading = false;
          state.movieData.chineseMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "han-quoc":
          state.movieData.koreanMovies.loading = false;
          state.movieData.koreanMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "hanh-dong":
          state.movieData.actionMovies.loading = false;
          state.movieData.actionMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "kinh-di":
          state.movieData.horrorMovies.loading = false;
          state.movieData.horrorMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "tinh-cam":
          state.movieData.emotionalMovies.loading = false;
          state.movieData.emotionalMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "gia-dinh":
          state.movieData.familyMovies.loading = false;
          state.movieData.familyMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "co-trang":
          state.movieData.historicalDramaMovies.loading = false;
          state.movieData.historicalDramaMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;
        case "vien-tuong":
          state.movieData.scienceFictionMovies.loading = false;
          state.movieData.scienceFictionMovies.items =
            action.payload?.res?.data?.items ?? [];
          break;

        default:
          break;
      }
    });
    builder.addCase(fetchDataMovie.rejected, (state, action: any) => {
      switch (action.payload?.type) {
        case "viet-nam":
          state.movieData.vietnameseMovies.loading = false;
          state.movieData.vietnameseMovies.error = true;
          break;
        case "trung-quoc":
          state.movieData.chineseMovies.loading = false;
          state.movieData.chineseMovies.error = true;
          break;
        case "han-quoc":
          state.movieData.koreanMovies.loading = false;
          state.movieData.koreanMovies.error = true;
          break;
        case "hanh-dong":
          state.movieData.actionMovies.loading = false;
          state.movieData.actionMovies.error = true;
          break;
        case "kinh-di":
          state.movieData.horrorMovies.loading = false;
          state.movieData.horrorMovies.error = true;
          break;
        case "tinh-cam":
          state.movieData.emotionalMovies.loading = false;
          state.movieData.emotionalMovies.error = true;
          break;
        case "gia-dinh":
          state.movieData.familyMovies.loading = false;
          state.movieData.familyMovies.error = true;
          break;
        case "co-trang":
          state.movieData.historicalDramaMovies.loading = false;
          state.movieData.historicalDramaMovies.error = true;
          break;
        case "vien-tuong":
          state.movieData.scienceFictionMovies.loading = false;
          state.movieData.scienceFictionMovies.error = true;
          break;

        default:
          break;
      }
    });

    builder.addCase(fetchDataMoviePreview.pending, (state, action) => {
      state.searchPreview.loading = true;
      state.searchPreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.fulfilled, (state, action) => {
      state.searchPreview.loading = false;
      state.searchPreview.items = action.payload?.data?.items ?? [];
      state.searchPreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.rejected, (state, action) => {
      state.searchPreview.loading = false;
      state.searchPreview.error = true;
    });
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
