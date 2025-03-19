import Spinner from "@/app/loading";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <h3 className="text-lg text-gray-50">Danh sách</h3>
    </Suspense>
  );
};

export default Page;
