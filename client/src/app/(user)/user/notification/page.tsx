import { auth } from "@/auth";
import { getNotifications } from "@/lib/actions/notificationActionServer";
import { Suspense } from "react";
import Loading from "@/app/loading";
import NotificationTabs from "@/components/pages/user/notification/NotificationTabs";
import NotificationList from "@/components/notification/NotificationList";
import Link from "next/link";
import SeeMoreNotifications from "@/components/pages/user/notification/SeeMoreNotifications";
import MainPage from "@/components/pages/user/notification/MainPage";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <MainPage />
    </Suspense>
  );
};

export default Page;
