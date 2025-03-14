"use client";

import { toaster } from "@/components/ui/toaster";
import { verifyToken } from "@/lib/actions/authAction";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleVerifyToken();
  }, []);

  const handleVerifyToken = async () => {
    const response = await verifyToken(token as string);

    if (!response?.status) {
      toaster.error({
        description: response?.message,
        type: "error",
        duration: 2000,
      });

      router.push("/");
    } else {
      toaster.success({
        description: response.message,
        type: "success",
        duration: 2000,
      });

      // Redirect to reset password page
      setTimeout(() => {
        dispatch(setTypeAuth("reset-password"));
        dispatch(setIsShowAuthDialog(true));
      }, 500);

      router.push(
        `/?type=reset-password&email=${response?.result?.email}&token=${token}`
      );
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center">
      <h1 className="text-[#f1c40f] text-lg font-semibold">
        Đang xác thực token, vui lòng chờ trong giây lát...
      </h1>
    </Box>
  );
};

export default MainPage;
