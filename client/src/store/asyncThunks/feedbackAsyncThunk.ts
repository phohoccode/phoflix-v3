import { createAsyncThunk } from "@reduxjs/toolkit";

interface GetFeedbacks {
  movieSlug: string;
  type: "review" | "comment";
  limit: number;
  afterTime?: number;
}

export const getFeedbacks = createAsyncThunk(
  "feedback/getFeedbacks",
  async ({ movieSlug, type, limit }: GetFeedbacks) => {
    const limitParam = `&limit=${limit}`;
    const typeParam = `&type=${type}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/movie/feedbacks?movieSlug=${movieSlug}${limitParam}${typeParam}`,
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/movie/feedbacks?movieSlug=${movieSlug}${limitParam}${typeParam}${afterTimeParam}`,
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

export const getReplyFeedbacks = createAsyncThunk(
  "feedback/getReplyFeedbacks",
  async ({ feedbackId }: { feedbackId: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/movie/feedbacks/reply?feedbackId=${feedbackId}`,
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
