"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { PaginationItems, PaginationRoot } from "../ui/pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
};

interface EpisodesListProps {
  server_name: string;
  server_data: Episode[];
}

const limitDisplay = 24;

const EpisodesList = ({
  server_data: episodes,
  server_name,
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState(
    episodes.slice(0, limitDisplay)
  );
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [page, setPage] = useState(1);
  const title = server_name.includes("Vietsub") ? "Vietsub" : "Lồng tiếng";

  const handleChangePage = (page: number) => {
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;
    setEpisodeDisplay(episodes.slice(start, end));
    setPage(page);
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-gray-50">{title}</h3>
      <Box className="flex flex-wrap gap-2">
        {episodeDisplay?.map((item: any, index: number) => (
          <Link href="#" key={index} className="flex-auto">
            <Button
              size="md"
              className="bg-[#282b3a] flex-auto text-gray-50 w-full shadow hover:text-[#f1c40f] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
              {item?.name}
            </Button>
          </Link>
        ))}
      </Box>

      {episodes?.length >= limitDisplay && (
        <Box className="flex mx-auto my-6">
          <PaginationRoot
            size={windowWidth < 768 ? "xs" : "md"}
            count={Number(episodes?.length)}
            pageSize={Number(limitDisplay)}
            page={page}
            siblingCount={1}
            variant="solid"
            onPageChange={(details) => handleChangePage(details.page)}
          >
            <HStack>
              <PaginationItems className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
            </HStack>
          </PaginationRoot>
        </Box>
      )}
    </Box>
  );
};

export default EpisodesList;
