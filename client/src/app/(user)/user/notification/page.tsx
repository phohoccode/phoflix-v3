import { Suspense } from "react";
import Loading from "@/app/loading";
import MainPage from "@/components/pages/user/notification/MainPage";

interface NotificationProps {
  searchParams: { [keyof: string]: string | undefined };
}

const tabs = [
  { id: "community", name: "cộng đồng" },
  { id: "individual", name: "cá nhân" },
];

export async function generateMetadata({ searchParams }: NotificationProps) {
  const params = (await searchParams) ?? {};
  const title =
    tabs.find((tab) => tab.id === params.tab)?.name ?? "Thông báo mới nhất";

  return {
    title: `Thông báo ${title} - PHOFLIX-V3`,
    description: "Xem phim chất lượng cao, miễn phí và cập nhật nhanh nhất.",
  };
}

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
