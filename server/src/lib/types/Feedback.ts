export type GetFeedbacks = {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime?: number;
};

export type GetReplyListFeedbacks = {
  parentId: string;
  type: "review" | "comment";
  limit: number;
  afterTime?: number;
}

export type AddFeedback = {
  movieSlug: string;
  type: "review" | "comment";
  userId: string;
  content?: string;
  point?: number;
}

export type DeleteFeedback = {
  feedbackId: string;
  userId: string;
};

export type UpdateFeedbackContent = {
  feedbackId: string;
  userId: string;
  content: string;
}

export type AddReplyFeedback = {
  movieSlug: string;
  userId: string;
  content: string;
  type: "review" | "comment";
  parentId: string;
};

export type FeedbackVote = {
  userId: string;
  feedbackId: string;
  voteType: "like" | "dislike";
  movieSlug: string;
};

export type UserVoteFeedback = {
  feedback_id: string;
  type: "like" | "dislike";
  user_id: string;
};