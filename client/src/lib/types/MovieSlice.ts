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
  };
};
