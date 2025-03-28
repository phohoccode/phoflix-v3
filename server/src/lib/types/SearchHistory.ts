export type GetUserSearchHistory = {
  id: string;
  limit: number;
};

export type CreateSearchHistory = {
  userId: string;
  keyword: string;
}

export type DeleteSearchHistory = {
  id: string;
  userId: string;
}
