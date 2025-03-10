"use client";

import EpisodesList from "@/components/movie/EpisodeList";
import { RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const TabEpisodes = () => {
  const { episodes } = useSelector((state: RootState) => state.movie.movieInfo);

  return (
    <Box className="flex flex-col gap-6">
      {episodes?.map((episode: any, index: number) => (
        <EpisodesList
          key={index}
          server_name={episode?.server_name}
          server_data={episode?.server_data}
        />
      ))}
    </Box>
  );
};

export default TabEpisodes;
