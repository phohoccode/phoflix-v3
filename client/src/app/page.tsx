import Home from "@/components/csr/home/Home";
import { Suspense } from "react";
import Spinner from "./loading";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Home />
    </Suspense>
  );
};

export default Page;
