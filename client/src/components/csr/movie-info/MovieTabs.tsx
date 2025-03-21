"use client";

import MovieSuggesstions from "@/components/movie/MovieSuggestions";
import { Box, Tabs } from "@chakra-ui/react";
import TabEpisodes from "./TabEpisodes";
import TabTrailer from "./TabTrailer";

const MovieTabs = () => {
  return (
    <Tabs.Root defaultValue="episodes" colorPalette="yellow">
      <Tabs.List>
        <Tabs.Trigger
          _selected={{
            color: "#fde047",
          }}
          className="text-gray-50"
          value="episodes"
        >
          Tập phim
        </Tabs.Trigger>
        <Tabs.Trigger
          _selected={{
            color: "#fde047",
          }}
          className="text-gray-50"
          value="trailer"
        >
          Trailer
        </Tabs.Trigger>
        <Tabs.Trigger
          _selected={{
            color: "#fde047",
          }}
          className="text-gray-50"
          value="suggest"
        >
          Đề xuất
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
        value="episodes"
      >
        <TabEpisodes />
      </Tabs.Content>
      <Tabs.Content
        value="trailer"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <TabTrailer />
      </Tabs.Content>
      <Tabs.Content
        value="suggest"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <Box className="mt-3">
          <MovieSuggesstions title="Có thể bạn sẽ thích" />
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
}
 
export default MovieTabs;