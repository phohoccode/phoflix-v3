"use client";

interface UpdateUserProflie {
  userId: string;
  username: string;
  gender: "other" | "female" | "male";
  avatar: string;
  typeAccount: "credentials" | "google";
}

export const updateUserProfile = async ({
  userId,
  username,
  gender,
  avatar,
  typeAccount,
}: UpdateUserProflie): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          username,
          gender,
          avatar,
          typeAccount,
        }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};

// ===================== RESET PASSWORD =====================

interface ResetPassword {
  email: string;
  newPassword: string;
  oldPassword: string;
  typeAccount: "credentials";
}

export const resetPassword = async ({
  email,
  newPassword,
  oldPassword,
  typeAccount,
}: ResetPassword): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          oldPassword,
          typeAccount,
        }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Lỗi server! Vui lòng thử lại sau.",
      result: null,
    };
  }
};
