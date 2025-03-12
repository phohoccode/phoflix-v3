"use client";

import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import RootLayout from "./RootLayout";
import Link from "next/link";
import GithubIcon from "../icons/GithubIcon";
import TelegramIcon from "../icons/TelegramIcon";
import FacebookIcon from "../icons/FacebookIcon";

const Footer = () => {
  return (
    <footer className="mt-32 px-4 py-12 bg-[#282b3a]">
      <RootLayout>
        <SimpleGrid
          columns={12}
          gap={{
            base: 4,
            md: 4,
            lg: 12,
          }}
        >
          <GridItem
            colSpan={{
              base: 12,
              md: 12,
              lg: 6,
              xl: 4,
            }}
          >
            <h3 className="text-2xl font-bold text-[#f9ca24]">Giới thiệu</h3>
            <p className="text-gray-100 mt-3 text-justify break-words">
              Chào mừng bạn đến với PHOFLIX-V3, nơi trải nghiệm điện ảnh trực
              tuyến trở nên dễ dàng và thú vị hơn bao giờ hết! Tại đây, bạn sẽ
              khám phá hàng ngàn bộ phim đa dạng từ bom tấn Hollywood đến các
              tác phẩm nghệ thuật quốc tế và phim bộ truyền hình hấp dẫn. Với
              giao diện thân thiện, tốc độ tải nhanh và chất lượng HD sắc nét.
            </p>
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              md: 12,
              lg: 6,
              xl: 4,
            }}
          >
            <h3 className="text-2xl font-bold text-[#f9ca24]">Bản quyền</h3>
            <p className="text-gray-100 mt-3 text-justify break-words">
              Tất cả nội dung của trang web này đều được tìm kiếm và thu thập ở
              các trang web phát video trực tuyến chính thống trên Internet,
              cũng như không cung cấp phát trực tuyến chính hãng. Nếu quyền lợi
              của bạn bị vi phạm, hãy liên hệ với chúng tôi. Chúng tôi sẽ xử lý
              và xóa các nội dung liên quan đó kịp thời. Xin cảm ơn!
            </p>
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              md: 12,
              lg: 12,
              xl: 4,
            }}
          >
            <h3 className="text-2xl font-bold text-[#f9ca24]">
              Liên hệ với tôi
            </h3>
            <Box className="flex flex-col gap-4 mt-3">
              <Link
                href="https://github.com/phohoccode"
                target="_blank"
                className="text-sm text-gray-50 inline-flex gap-2 items-center transition duration-300 ease-in-out hover:text-[#f9ca24] hover:underline"
              >
                <GithubIcon />
                <span>Github</span>
              </Link>
              <Link
                href="https://t.me/phohoccode_04"
                target="_blank"
                className="text-sm text-gray-50 inline-flex gap-2 items-center transition duration-300 ease-in-out hover:text-[#f9ca24] hover:underline"
              >
                <TelegramIcon />
                <span>Telegram</span>
              </Link>
              <Link
                href="https://www.facebook.com/phohoccode.2004"
                target="_blank"
                className="text-sm text-gray-50 inline-flex gap-2 items-center transition duration-300 ease-in-out hover:text-[#f9ca24] hover:underline"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </Link>
            </Box>
          </GridItem>
          <GridItem colSpan={12}>
            <p className="text-center text-sm  text-gray-100 mt-2">
              © 2025 - Phát triển bởi phohoccode
            </p>
          </GridItem>
        </SimpleGrid>
      </RootLayout>
    </footer>
  );
};

export default Footer;
