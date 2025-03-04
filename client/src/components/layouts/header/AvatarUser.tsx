"use client";

import { Avatar } from "@chakra-ui/react";

interface AvatarProps {
  name?: string;
  src?: string;
}

const AvatarUser = ({ name, src }: AvatarProps) => {
  return (
    <Avatar.Root size={"sm"}>
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  );
};

export default AvatarUser;
