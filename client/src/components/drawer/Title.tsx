"use client";

import { Avatar, Box } from "@chakra-ui/react";
import AvatarUser from "../layouts/header/AvatarUser";

const Title = () => {
  return (
    <Box className="flex gap-2 items-center">
      <AvatarUser />
      <Box>
        <p className="text-lg font-semibold">Hello, User</p>
        <p className="text-sm text-gray-500">Welcome back</p>
      </Box>
    </Box>
  );
};

export default Title;
