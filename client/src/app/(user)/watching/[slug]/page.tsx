import Spinner from "@/app/loading";
import MainPage from "@/components/csr/watching/MainPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
