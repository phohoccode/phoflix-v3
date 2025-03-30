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
  comments: {
    items: any;
    loading: boolean;
    error: boolean;
  };
  report: {
    reportError: string;
    reportDescription: string;
  };
};

type UpdateUserProflie = {
  userId: string;
  username: string;
  gender: "other" | "female" | "male";
  avatar: string;
  typeAccount: "credentials" | "google";
};

type UpdateUserPassword = {
  email: string;
  newPassword: string;
  oldPassword: string;
  typeAccount: "credentials";
};
