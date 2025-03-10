import MainPage from "@/components/csr/movie-detail/MainPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
