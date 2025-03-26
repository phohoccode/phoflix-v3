type FeedbackSlice = {
  feedback: {
    items: any;
    loading: boolean;
    hasMore: boolean;
    totalFeedbacks: number;
    itemCount: number;
    error: boolean;
    showFeedbackId: string | null;
  };
  replies: {
    data: Record<
      string,
      { items: any; hasMore: boolean; loading: boolean; error: boolean }
    >;
    showReplyId: string | null;
  };
  parentId: string | null;
  replyId: string | null;
  type: "comment" | "review";
};
