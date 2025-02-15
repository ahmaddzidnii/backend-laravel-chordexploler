import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "@/modules/home/ui/components/HomeNavbar";
import { HomeSidebar } from "@/modules/home/ui/components/HomeSidebar/Index";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const Playlayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
