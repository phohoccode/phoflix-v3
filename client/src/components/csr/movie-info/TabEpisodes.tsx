"use client";

import PlayIcon from "@/components/icons/PlayIcon";
import { RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const TabEpisodes = () => {
  const { episodes } = useSelector((state: RootState) => state.movie.movieInfo);

  return (
    <Box className="flex flex-col gap-6">
      {episodes?.map((episode: any, index: number) => (
        <Box key={index}>
          <h3 className="text-sm font-semibold text-gray-50">
            {episode?.server_name}
          </h3>
          <Box className="flex flex-wrap gap-2 mt-3">
            {episode?.server_data?.map((item: any, index: number) => (
              <Link href="#" key={index}>
                <Button
                  size="md"
                  className="bg-[#282b3a] flex-auto text-gray-50 shadow hover:text-[#f1c40f] transition-all"
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
        </Box>
      ))}
    </Box>
  );
};

export default TabEpisodes;
