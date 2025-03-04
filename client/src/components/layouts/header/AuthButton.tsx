"use client";

import { RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const AuthButton = () => {
  const { windowWidth } = useSelector((state: RootState) => state.system);

  return (
    <Box className="flex items-center gap-4">
      <Link href="/auth/login">
        <Button size={"xs"} colorPalette={"cyan"}>
          Đăng nhập
        </Button>
      </Link>
      {windowWidth > 1024 && (
        <Link href="/auth/register">
          <Button size={"xs"} colorPalette={"cyan"} variant={"surface"}>
            Đăng ký
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default AuthButton;
