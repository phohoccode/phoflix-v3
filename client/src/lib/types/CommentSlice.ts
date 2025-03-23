type CommentSlice = {
  comments: {
    items: any;
    loading: boolean;
    error: boolean;
  };
  type: "comment" | "review";
};
