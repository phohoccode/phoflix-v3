import MovieDetail from "@/components/csr/movie-detail/MovieDetail";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MovieDetail />
    </Suspense>
  );
};

export default Page;
