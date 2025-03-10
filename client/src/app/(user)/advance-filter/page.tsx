import AdvanceFilter from "@/components/csr/advance-filter/AdvanceFilter";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: `Lọc phim nâng cao - PHOFLIX-V3`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdvanceFilter />
    </Suspense>
  );
};

export default Page;
