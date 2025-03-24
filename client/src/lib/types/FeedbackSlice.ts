type FeedbackSlice = {
  feedback: {
    items: any;
    loading: boolean;
    hasMore: boolean;
    itemCount: number;
    error: boolean;
  };
  type: "comment" | "review";
};
