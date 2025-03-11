"use client";

import { Box, Button, Tabs } from "@chakra-ui/react";
import TabEpisodes from "./TabEpisodes";
import TabTrailer from "./TabTrailer";
import MovieSuggesstions from "@/components/movie/MovieSuggestions";
import Link from "next/link";
import PlayIcon from "@/components/icons/PlayIcon";
import SectionControls from "@/components/movie/SectionControls";
import { useParams } from "next/navigation";

const MovieMain = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <Box className="relative z-[10] flex flex-col gap-4 p-8 lg:rounded-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <Box className="flex flex-col gap-8">
        <Box className="flex gap-6 lg:flex-row lg:items-start items-center flex-col">
          <Link
            href={`/watching/${slug}`}
            className="xl:w-60 lg:w-72 md:w-[70%] w-[80%]"
          >
            <Button
              className="w-full h-14 text-lg shadow-lg hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              rounded="full"
              colorPalette="yellow"
              variant="solid"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <SectionControls />
        </Box>
        <Box>
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
                Gợi ý
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
        </Box>
      </Box>
    </Box>
  );
};

export default MovieMain;
