"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { PaginationItems, PaginationRoot } from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import {
  changeQuery,
  formatTypeMovie,
  getIdFromLinkEmbed,
  updateSearchParams,
} from "@/lib/utils";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import { toaster } from "../ui/toaster";

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
  redirect?: boolean;
}

const limitDisplay = 24;

const EpisodesList = ({
  server_data: episodes,
  server_name,
  redirect = false,
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState(
    episodes.slice(0, limitDisplay)
  );
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
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

      // Show toast
      toaster.create({
        title: `Bạn đang xem ${item?.filename}`,
        description: "Chúc bạn xem phim vui vẻ!",
        placement: "top-end",
        duration: 2500,
      });
    }
  };

  return (
    <Box className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-50">{title}</h3>
      <Box className="flex flex-wrap gap-2">
        {episodeDisplay?.map((item: any, index: number) => (
          <Link
            onClick={() => handleSetCurrentEpisode(item)}
            href={
              redirect
                ? `/watching/${params?.slug}?id=${getIdFromLinkEmbed(
                    item?.link_embed,
                    8
                  )}&episode=${item?.slug}&type=${formatTypeMovie(server_name)}`
                : "#"
            }
            key={index}
            className={episodeDisplay?.length > 1 ? "flex-auto" : ""}
          >
            <Button
              size="md"
              className={`w-full shadow transition-all ${
                currentEpisode?.link_embed === item?.link_embed
                  ? "bg-[#f1c40f] text-[#282b3a]"
                  : "text-gray-50 bg-[#282b3a] hover:text-[#f1c40f]"
              }`}
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
