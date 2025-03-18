import Spinner from "@/app/loading";
import UserProfile from "@/components/csr/user/profile/UserProfile";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile />
    </Suspense>
  );
};

export default Page;
