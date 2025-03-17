export interface MovieConfigItem {
  title: string;
  link: string;
  type:
    | "phim-le"
    | "phim-bo"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | Categories
    | Countries;
  describe: "danh-sach" | "quoc-gia" | "the-loai";
  orientation: "horizontal" | "vertical";
}

export const initialMovieConfig: MovieConfigItem[] = [
  {
    title: "Phim Việt Nam mới",
    link: "/detail/quoc-gia/viet-nam",
    type: "viet-nam",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Phim Trung Quốc mới",
    link: "/detail/quoc-gia/trung-quoc",
    type: "trung-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Phim Hàn Quốc mới",
    link: "/detail/quoc-gia/han-quoc",
    type: "han-quoc",
    describe: "quoc-gia",
    orientation: "horizontal",
  },
  {
    title: "Hành động đỉnh cao",
    link: "/detail/the-loai/hanh-dong",
    type: "hanh-dong",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    title: "Rùng rợn đến tột cùng",
    link: "/detail/the-loai/kinh-di",
    type: "kinh-di",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    title: "Cảm xúc dâng trào",
    link: "/detail/the-loai/tinh-cam",
    type: "tinh-cam",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    title: "Gia đình hạnh phúc",
    link: "/detail/the-loai/gia-dinh",
    type: "gia-dinh",
    describe: "the-loai",
    orientation: "horizontal",
  },
  {
    title: "Cổ trang kinh điển",
    link: "/detail/the-loai/co-trang",
    type: "co-trang",
    describe: "the-loai",
    orientation: "vertical",
  },
  {
    title: "Khoa học viễn tưởng",
    link: "/detail/the-loai/vien-tuong",
    type: "vien-tuong",
    describe: "the-loai",
    orientation: "horizontal",
  },
];

export const quantitySectionMovie = 2;
