"use client";

import Refreshicon from "@/components/icons/RefresIcon";
import { Tooltip } from "@/components/ui/tooltip";
import { Box, Button, IconButton } from "@chakra-ui/react";

interface FilterActionsProps {
  handleSearch: () => void;
  handleResetFilter: () => void;
}

const FilterActions = ({
  handleSearch,
  handleResetFilter,
}: FilterActionsProps) => {
  return (
    <Box className="flex gap-4">
      <Button
        onClick={() => handleSearch()}
        variant="solid"
        rounded="full"
        colorPalette="yellow"
        size="sm"
        className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
      >
        Lọc kết quả
      </Button>
      <Tooltip
        content="Làm mới bộ lọc"
        showArrow
        contentProps={{ css: { "--tooltip-bg": "#282b3a" } }}
      >
        <IconButton
          onClick={handleResetFilter}
          rounded="full"
          className="bg-[#282b3a] border border-[#1e2939]"
          size="sm"
        >
          <Refreshicon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FilterActions;
