"use client";

import Refreshicon from "@/components/icons/RefresIcon";
import { Tooltip } from "@/components/ui/tooltip";
import { RootState } from "@/store/store";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";

interface FilterActionsProps {
  handleSearch: () => void;
  handleResetFilter: () => void;
}

const FilterActions = ({
  handleSearch,
  handleResetFilter,
}: FilterActionsProps) => {
  const { loading } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );

  return (
    <Box className="flex gap-4">
      <Button
        loading={loading}
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
