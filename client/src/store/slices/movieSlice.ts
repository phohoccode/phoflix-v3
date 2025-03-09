import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDataSlideShow,
  fetchDataMovie,
  fetchDataMoviePreview,
  fetchDataMovieDetail,
  fetchDataMovieSearch,
  fetchDataMovieInfo,
} from "../asyncThunks/movieAsyncThunk";
import { error } from "console";

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
  searchMoviePreview: {
    items: [],
    totalItems: 0,
    loading: false,
    error: false,
  },
  movieInfo: {
    movie: null,
    episodes: null,
    loading: false,
    error: false,
  },
  movieDetail: {
    items: null,
    titlePage: "",
    pagination: null,
    loading: false,
    error: false,
  },
  searchMovie: {
    items: [],
    loading: false,
    error: false,
    titlePage: "",
    pagination: {
      totalItems: 0,
      totalItemsPerPage: 0,
      currentPage: 0,
      totalPages: 0,
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
      state.searchMoviePreview.loading = true;
      state.searchMoviePreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.fulfilled, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.items = action.payload?.data?.items ?? [];
      state.searchMoviePreview.totalItems =
        action.payload?.data?.params?.pagination?.totalItems ?? 0;
      state.searchMoviePreview.error = false;
    });
    builder.addCase(fetchDataMoviePreview.rejected, (state, action) => {
      state.searchMoviePreview.loading = false;
      state.searchMoviePreview.error = true;
    });

    builder.addCase(fetchDataMovieDetail.pending, (state, action) => {
      state.movieDetail.loading = true;
      state.movieDetail.error = false;
    });
    builder.addCase(fetchDataMovieDetail.fulfilled, (state, action) => {
      state.movieDetail.loading = false;
      state.movieDetail.titlePage = action.payload?.data?.titlePage;
      state.movieDetail.items = action.payload?.data?.items;
      state.movieDetail.pagination = action.payload?.data?.params?.pagination;
      state.movieDetail.error = false;
    });
    builder.addCase(fetchDataMovieDetail.rejected, (state, action) => {
      state.movieDetail.loading = false;
      state.movieDetail.error = true;
    });

    builder.addCase(fetchDataMovieSearch.pending, (state, action) => {
      state.searchMovie.loading = true;
      state.searchMovie.error = false;
    });
    builder.addCase(fetchDataMovieSearch.fulfilled, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.items = action.payload?.data?.items ?? [];
      state.searchMovie.titlePage = action.payload?.data?.titlePage;
      state.searchMovie.pagination = action.payload?.data?.params?.pagination;
      state.searchMovie.error = false;
    });
    builder.addCase(fetchDataMovieSearch.rejected, (state, action) => {
      state.searchMovie.loading = false;
      state.searchMovie.error = true;
    });

    builder.addCase(fetchDataMovieInfo.pending, (state, action) => {
      state.movieInfo.loading = true;
      state.movieInfo.error = false;
    });
    builder.addCase(fetchDataMovieInfo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.movieInfo.loading = false;
      state.movieInfo.movie = action.payload?.movie;
      state.movieInfo.episodes = action.payload?.episodes;
      state.movieInfo.error = false;
    });
    builder.addCase(fetchDataMovieInfo.rejected, (state, action) => {
      state.movieInfo.loading = false;
      state.movieInfo.error = true;
    });
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
