import AdvanceFilter from "@/components/csr/advance-filter/AdvanceFilter";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdvanceFilter />
    </Suspense>
  );
};

export default Page;
