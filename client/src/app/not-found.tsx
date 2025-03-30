import { Button } from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="bg-transparent text-gray-50 min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-[1440px] lg:py-16 lg:px-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl tracking-tight font-extrabold lg:text-4xl text-[#ffd875]">
            404 - Không tìm thấy trang
          </h1>
          <p className="mb-4 text-lg tracking-tight font-bold text-gray-200 md:text-xl">
            🔍 Xin lỗi, trang bạn đang tìm không tồn tại!
          </p>
          <p className="mb-4 text-md font-light text-gray-500 dark:text-gray-400">
            Có thể trang này đã bị xóa, đường dẫn không đúng hoặc trang chưa
            được tạo.
          </p>
          <Link href="/">
            <Button
              size="sm"
              className="bg-[#ffd875] box text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
            >
              Trở về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
