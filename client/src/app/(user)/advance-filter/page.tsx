import Loading from "@/app/loading";
import MainPage from "@/components/csr/advance-filter/MainPage";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: `Lọc phim nâng cao - PHOFLIX-V3`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
