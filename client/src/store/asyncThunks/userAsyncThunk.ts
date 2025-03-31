import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserSearchHistory = createAsyncThunk(
  "user/getUserSearchHistory",
  async (id: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history?id=${id}`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

// ======================= CREATE USER SEARCH HISTORY =======================

interface CreateUserSearchHistoryProps {
  userId: string;
  keyword: string;
}

export const createUserSearchHistory = createAsyncThunk(
  "user/createUserSearchHistory",
  async ({ userId, keyword }: CreateUserSearchHistoryProps) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/search-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, keyword }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

// ======================= DELETE USER SEARCH HISTORY =======================
interface DeleteUserSearchHistoryProps {
  id: string;
  userId: string;
}

export const deleteUserSearchHistory = createAsyncThunk(
  "user/deleteUserSearchHistory",
  async ({ id, userId }: DeleteUserSearchHistoryProps) => {
    try {
      const params = new URLSearchParams({
        id,
        userId,
      });

      const response = await fetch(
        `${BACKEND_URL}/user/search-history?${params.toString()}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);

export const deleteAllUserSearchHistory = createAsyncThunk(
  "user/deleteAllUserSearchHistory",
  async (userId: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/user/search-history/all?userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Lỗi server! Vui lòng thử lại sau.",
        result: null,
      };
    }
  }
);
