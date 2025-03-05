import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDataSlideShow = createAsyncThunk(
  "movie/fetchDataSlideShow",
  async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/danh-sach/phim-moi-cap-nhat-v3?page=1`,
      { next: { revalidate: 60 } }
    );
    return response.json();
  }
);

interface FetchDataMovie {
  type:
    | "phim-le"
    | "phim-bo"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng";
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  params?: {
    limit?: number;
    page?: number;
  };
}

export const fetchDataMovie = createAsyncThunk(
  "movie/fetchDataMovie",
  async ({
    type,
    describe = "danh-sach",
    params = { limit: 10, page: 1 },
  }: FetchDataMovie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/api/${describe}/${type}?page=${params.page}&limit=${params.limit}`,
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    return {
      res: data,
      type,
    };
  }
);
