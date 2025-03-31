import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface GetFeedbacks {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
}

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async ({ movieSlug, type, limit }: GetFeedbacks) => {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/list?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= GET MORE FEEDBACK =========================
interface GetMoreFeedbacks {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime: number;
}

export const getMoreFeedbacks = createAsyncThunk(
  "feedback/getMoreFeedbacks",
  async ({ movieSlug, type, limit, afterTime }: GetMoreFeedbacks) => {
    const params = new URLSearchParams({
      movieSlug,
      limit: limit.toString(),
      type,
      afterTime: afterTime.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/list?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch more feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= REPLY =========================

interface GetReplyListFeedback {
  parentId: string;
  limit: number;
  type: "review" | "comment";
}

export const getReplyListFeedback = createAsyncThunk(
  "feedback/getReplyListFeedback",
  async ({ parentId, limit, type }: GetReplyListFeedback) => {
    if (!parentId) return;

    const params = new URLSearchParams({
      parentId,
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reply feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

interface GetMoreReplyListFeedback {
  parentId: string;
  limit: number;
  type: "review" | "comment";
  afterTime: number | string;
}

export const getMoreReplyListFeedback = createAsyncThunk(
  "feedback/getMoreReplyListFeedback",
  async ({ parentId, limit, type, afterTime }: GetMoreReplyListFeedback) => {
    const params = new URLSearchParams({
      parentId,
      limit: limit.toString(),
      type,
      afterTime: afterTime.toString(),
    });

    const response = await fetch(
      `${BACKEND_URL}/feedback/replyList?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch more reply feedbacks");
    }

    const data = await response.json();

    return data;
  }
);

// ========================= VOTE =========================
export const getVoteListFeedback = createAsyncThunk(
  "feedback/getVoteListFeedback",
  async (movieSlug: string) => {
    const response = await fetch(
      `${BACKEND_URL}/feedback/voteList?movieSlug=${movieSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vote feedbacks");
    }

    const data = await response.json();

    return data;
  }
);
