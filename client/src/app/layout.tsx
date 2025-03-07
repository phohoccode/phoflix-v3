import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { StoreProvider } from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import App from "@/components/App";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHOFLIX-V3",
  description: "WEBSITE XEM PHIM MIỄN PHÍ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#f1c40f" showSpinner={false} height={2} />

        <StoreProvider>
          <Provider>
            <App>{children}</App>
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
