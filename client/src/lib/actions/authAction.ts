"use server";

import { signIn } from "@/auth";

export async function authenticate(
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: "/",
    });

    return {
      status: true,
      message: "Đăng nhập thành công!",
    };
  } catch (error: any) {
    switch (error?.code) {
      case "INVALID_CREDENTIALS":
        return {
          status: false,
          message: error?.details,
        };
      case "BANNED_ACCOUNT": {
        return {
          status: false,
          message: error?.details,
        };
      }
      default:
        return {
          status: false,
          message: error?.details,
        };
    }
  }
}

export async function register({
  email,
  password,
  name,
  typeAccount,
  avatar,
}: any): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          typeAccount,
          avatar,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export async function forgotPassword(email: string): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-token?token=${token}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}

export async function resetPassword({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          password,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      status: false,
      message: "Đã có lỗi xảy ra, vui lòng thử lại!",
    };
  }
}
