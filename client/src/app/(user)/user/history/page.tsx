import Spinner from "@/app/loading";
import { auth } from "@/auth";
import { getUserMovies } from "@/lib/actions/userActionServer";
import { Suspense } from "react";
import MovieSection from "@/components/csr/user/MovieSection";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const sesstion = await auth();
  const params = await searchParams;
  const currentPage = params?.page ? Number(params?.page) : 1;
  const limit = 18;
  const response = await getUserMovies({
    userId: sesstion?.user?.id as string,
    type: "history",
    page: currentPage,
    limit,
  });
  const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <Suspense fallback={<Spinner />}>
      <h3 className="text-lg text-gray-50">Lịch sử xem</h3>
      <MovieSection
        movies={movies}
        totalItems={totalItems}
        totalItemsPerPage={totalItemsPerPage}
        currentPage={currentPage}
        limit={limit}
        sesstion={sesstion}
        type="history"
      />
    </Suspense>
  );
};

export default Page;
