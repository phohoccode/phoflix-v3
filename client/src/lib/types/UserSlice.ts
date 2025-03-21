type SearchHistory = {
  id: string;
  keyword: string;
  createdAt: string;
};

type UserSlice = {
  searchHistory: {
    items: SearchHistory[];
    loading: boolean;
    error: boolean;
  };
  selectedPlaylistId: any;
  reviews: {
    items: any;
    loading: boolean;
    error: boolean;
    selectedReview: {
      id: string | number;
      emoji: string;
      text: string;
      value: number;
    } | null;
    reviewContent: string | null;
  };
};
