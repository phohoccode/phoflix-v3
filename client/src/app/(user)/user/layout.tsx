import SideBar from "@/components/csr/user/SideBar";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="max-w-[1620px] mx-auto px-4 py-32 min-h-[calc(100vh-360px)]">
      <Box className="flex gap-12 lg:flex-row flex-col">
        <SideBar />
        <Box className="flex-1">{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
