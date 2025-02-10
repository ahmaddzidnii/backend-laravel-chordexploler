import { HomeLayout } from "@/modules/home/ui/layouts/HomeLayout";

interface LayoutProps extends React.PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
