import { PropsWithChildren } from "react";

import Sidebar from "@/components/Sidebar";
import ClientProvider from "@/providers/ClientProvider";
import { Navbar, NavbarSpacer } from "@/components/Navbar";

const ApplicationLayout = async ({ children }: PropsWithChildren) => {
  return (
    <ClientProvider>
      <div className="h-screen w-full overflow-hidden">
        <Navbar />
        <NavbarSpacer />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-thin">
            {children}
          </main>
        </div>
      </div>
    </ClientProvider>
  );
};

export default ApplicationLayout;
