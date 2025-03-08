"use client";

import EmojiDizzyIcon from "@/components/icons/EmojiDizzyIcon";
import { EmptyState, VStack } from "@chakra-ui/react";

interface EmptyDataProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

const EmptyData = ({ title, description }: EmptyDataProps) => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <EmojiDizzyIcon />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title className="text-gray-50">{title}</EmptyState.Title>
          <EmptyState.Description className="text-gray-50">
            {description}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default EmptyData;
