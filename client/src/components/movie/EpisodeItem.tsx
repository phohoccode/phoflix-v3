"use client";

import { formatTypeMovie, getIdFromLinkEmbed } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsPlayFill } from "react-icons/bs";
import { useSelector } from "react-redux";

interface EpisodeItemProps {
  item: any;
  server_name: string;
  redirect?: boolean;
  handleSetCurrentEpisode(item: any): void;
}

const EpisodeItem = ({
  item,
  redirect,
  server_name,
  handleSetCurrentEpisode,
}: EpisodeItemProps) => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const params = useParams();

  const id = getIdFromLinkEmbed(item?.link_embed, 8);
  const type = formatTypeMovie(server_name);
  const episode = item?.slug;
  const href = `/watching/${params?.slug}?id=${id}&episode=${episode}&type=${type}`;

  return (
    <Link
      href={redirect ? href : "#"}
      onClick={() => handleSetCurrentEpisode(item)}
    >
      <Button
        size="md"
        className={`w-full lg:h-[50px] h-[42px] shadow transition-all ${
          currentEpisode?.link_embed === item?.link_embed
            ? "bg-[#ffd875] text-[#282b3a]"
            : "text-gray-50 bg-[#2a314e] hover:text-[#ffd875]"
        }`}
      >
        <BsPlayFill />
        {item?.name}
      </Button>
    </Link>
  );
};

export default EpisodeItem;
