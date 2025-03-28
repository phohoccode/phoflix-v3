import { createAsyncThunk } from "@reduxjs/toolkit";

interface GetFeedbacks {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
}

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async ({ movieSlug, type, limit }: GetFeedbacks) => {
    const limitParam = `&limit=${limit}`;
    const typeParam = `&type=${type}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/list?movieSlug=${movieSlug}${limitParam}${typeParam}`,
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
    const limitParam = `&limit=${limit}`;
    const typeParam = `&type=${type}`;
    const afterTimeParam = `&afterTime=${afterTime}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/list?movieSlug=${movieSlug}${limitParam}${typeParam}${afterTimeParam}`,
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
    const limitParam = `&limit=${limit}`;
    const typeParam = `&type=${type}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/replyList?parentId=${parentId}${limitParam}${typeParam}`,
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
    const limitParam = `&limit=${limit}`;
    const typeParam = `&type=${type}`;
    const afterTimeParam = `&afterTime=${afterTime}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/replyList?parentId=${parentId}${limitParam}${typeParam}${afterTimeParam}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/feedback/voteList?movieSlug=${movieSlug}`,
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
