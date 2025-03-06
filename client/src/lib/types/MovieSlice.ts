type SlideItem = {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
};

type MovieSlice = {
  slideShows: {
    items: SlideItem[];
    loading: boolean;
    error: boolean;
  };
  movieData: {
    televisonSeries: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
    featureFilms: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
    cartoon: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
    vietnameseMovies: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
    chineseMovies: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
    koreanMovies: {
      items: any;
      breadCrumb: any;
      params: any;
      loading: boolean;
      error: boolean;
    };
  };
};

type Categories =
  | "hanh-dong"
  | "lich-su"
  | "co-trang"
  | "chien-tranh"
  | "vien-tuong"
  | "kinh-di"
  | "tai-lieu"
  | "bi-an"
  | "phim-18"
  | "tinh-cam"
  | "tam-ly"
  | "the-thao"
  | "phieu-luu"
  | "am-nhac"
  | "gia-dinh"
  | "hoc-duong"
  | "hai-huoc"
  | "hinh-su"
  | "vo-thuat"
  | "khoa-hoc"
  | "than-thoai"
  | "chinh-kich"
  | "kinh-dien";

type Countries =
  | "viet-nam"
  | "trung-quoc"
  | "thai-lan"
  | "hong-kong"
  | "phap"
  | "duc"
  | "ha-lan"
  | "mexico"
  | "thuy-dien"
  | "philippines"
  | "dan-mach"
  | "thuy-si"
  | "ukraina"
  | "han-quoc"
  | "au-my"
  | "an-do"
  | "canada"
  | "tay-ban-nha"
  | "indonesia"
  | "ba-lan"
  | "malaysia"
  | "bo-dao-nha"
  | "uae"
  | "chau-phi"
  | "a-rap-xe-ut"
  | "nhat-ban"
  | "dai-loan"
  | "anh"
  | "quoc-gia-khac"
  | "tho-nhi-ky"
  | "nga"
  | "uc"
  | "brazil"
  | "y"
  | "na-uy"
  | "namh";
