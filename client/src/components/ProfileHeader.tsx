"use client";

import { Box } from "@chakra-ui/react";
import AvatarUser from "./layouts/header/AvatarUser";
import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const { data: session }: any = useSession();

  return (
    <Box className="flex gap-2 items-center">
      <AvatarUser src={session?.user.avatar} name={session?.user?.username} />
      <Box className="overflow-hidden">
        <p className="text-sm font-semibold truncate">
          {session?.user?.username}
        </p>
        <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
