type SearchHistory = {
  id: string;
  keyword: string;
  createdAt: string;
}

type UserSlice = {
  searchHistory: {
    items: SearchHistory[];
    loading: boolean;
    error: boolean;
  };
}