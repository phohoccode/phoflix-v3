import MainPage from "@/components/csr/search/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface MoviePageProps {
  searchParams: { [keyof: string]: string | undefined };
}

export async function generateMetadata({
  searchParams,
}: MoviePageProps): Promise<Metadata> {
  const keyword = searchParams.keyword ?? "hihihi";
  return {
    title: `Xem phim ${keyword} - Thuyết minh, Vietsub mới nhất - PHOFLIX-V3`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
