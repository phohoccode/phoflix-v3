"use client";

import HeartIcon from "@/components/icons/HeartIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import SendIcon from "@/components/icons/SendIcon";
import { Box, Button, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TabTrailer from "../csr/movie-info/TabTrailer";
import TabEpisodes from "../csr/movie-info/TabEpisodes";

const MovieBar = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <Box className="flex flex-col gap-8">
      <Box className="flex gap-6 lg:flex-row lg:items-start items-center flex-col">
        <Link href={`/watching/${slug}`}>
          <Button
            className="lg:w-40 w-full h-14 text-lg shadow-lg hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
            rounded="full"
            colorPalette="yellow"
            variant="solid"
          >
            <PlayIcon />
            Xem ngay
          </Button>
        </Link>
        <Box className="flex gap-4">
          <Box className="p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center flex-col gap-2 text-gray-50 transition-all hover:bg-[#ffffff05]">
            <HeartIcon />
            <span className="text-xs">Yêu thích</span>
          </Box>
          <Box className="p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center flex-col gap-2 text-gray-50 transition-all hover:bg-[#ffffff05]">
            <PlusIcon />
            <span className="text-xs">Thêm vào</span>
          </Box>
          <Box className="p-2 min-w-16 cursor-pointer rounded-lg flex justify-center items-center flex-col gap-2 text-gray-50 transition-all hover:bg-[#ffffff05]">
            <SendIcon />
            <span className="text-xs">Chia sẻ</span>
          </Box>
        </Box>
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
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default MovieBar;
