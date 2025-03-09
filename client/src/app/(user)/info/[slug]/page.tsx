import MoviePage from "@/components/csr/movie-info/MainPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviePage />
    </Suspense>
  );
};

export default Page;
