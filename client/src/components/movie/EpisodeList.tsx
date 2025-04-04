"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { PaginationItems, PaginationRoot } from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  changeQuery,
  formatTypeMovie,
  getIdFromLinkEmbed,
  handleShowToaster,
} from "@/lib/utils";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import EpisodeItem from "./EpisodeItem";

type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

interface EpisodesListProps {
  server_name: string;
  server_data: Episode[];
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
  };
  redirect?: boolean;
  showToaster?: boolean;
}

const limitDisplay = 24;

const EpisodesList = ({
  server_data: episodes,
  server_name,
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  showToaster = true,
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState(
    episodes.slice(0, limitDisplay)
  );
  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const [page, setPage] = useState(1);
  const title = server_name.includes("Vietsub") ? "Vietsub" : "Lồng tiếng";

  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );

  const handleChangePage = (page: number) => {
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;
    setEpisodeDisplay(episodes.slice(start, end));
    setPage(page);
  };

  const handleSetCurrentEpisode = (item: Episode) => {
    if (!redirect) {
      if (currentEpisode?.link_embed === item.link_embed) return;

      const id = getIdFromLinkEmbed(item.link_embed, 8);
      const type = formatTypeMovie(server_name);

      const newQuery = [
        { key: "id", value: id },
        { key: "episode", value: item.slug },
        { key: "type", value: type },
      ];

      changeQuery(newQuery);

      dispatch(setCurrentEpisode(item));

      if (showToaster) {
        handleShowToaster(
          `Bạn đang xem ${item?.filename}`,
          "Chúc bạn xem phim vui vẻ!"
        );
      }
    }
  };

  return (
    <Box className="flex flex-col gap-4">
      <h3 className="text-gray-50 text-sm font-semibold">{title}</h3>
      <Box
        className={`grid grid-cols-${colums.base ?? 2} md:grid-cols-${
          colums.md ?? 4
        } lg:grid-cols-${colums.lg ?? 6} xl:grid-cols-${
          colums.xl ?? 8
        } lg:gap-4 gap-2`}
      >
        {episodeDisplay?.map((item: any, index: number) => (
          <EpisodeItem
            key={index}
            item={item}
            server_name={server_name}
            redirect={redirect}
            handleSetCurrentEpisode={handleSetCurrentEpisode}
          />
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
