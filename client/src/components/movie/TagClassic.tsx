"use client";

import Link from "next/link";

interface TagClassicProps {
  text: string;
  isRedirect?: boolean;
  href?: string;
}

export const TagClassic = ({
  text,
  isRedirect,
  href = "#",
}: TagClassicProps) => {
  return (
    <>
      {!isRedirect ? (
        <span className="p-1 h-6 rounded-md bg-[rgba(255,255,255,0.06)] text-gray-50 inline-flex items-center text-xs border border-[#ffffff10]">
          {text}
        </span>
      ) : (
        <Link
          href={href as string}
          className="p-1 h-6 rounded-md bg-[rgba(255,255,255,0.1)] text-gray-50 inline-flex items-center text-xs transition-all hover:text-[#f1c40f]"
        >
          {text}
        </Link>
      )}
    </>
  );
};