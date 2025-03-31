import Loading from "@/app/loading";
import UserProfile from "@/components/csr/user/profile/UserProfile";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile />
    </Suspense>
  );
};

export default Page;
