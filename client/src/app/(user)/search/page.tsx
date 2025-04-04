import Loading from "@/app/loading";
import MainPage from "@/components/pages/search/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: { [keyof: string]: string | undefined };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const keyword = params.keyword ?? "phohoccode";

  return {
    title: `Xem phim ${keyword} - Thuyết minh, Vietsub mới nhất - PHOFLIX-V3`,
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
