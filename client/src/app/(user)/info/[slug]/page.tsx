import Spinner from "@/app/loading";
import MoviePage from "@/components/csr/info/MainPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface MoviePageProps {
  searchParams: { [keyof: string]: string | undefined };
}

export async function generateMetadata({
  searchParams,
}: MoviePageProps): Promise<Metadata> {
  const params = await searchParams ?? {};
  const name = params.name?.replace(/-/g, " ") ?? "hihihi";

  return {
    title: `${name} - PHOFLIX-V3`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MoviePage />
    </Suspense>
  );
};

export default Page;
