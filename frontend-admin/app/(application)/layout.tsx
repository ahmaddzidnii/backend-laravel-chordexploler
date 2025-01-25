import { PropsWithChildren } from "react";

import { Navbar, NavbarSpacer } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const ApplicationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Navbar />
      <NavbarSpacer />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ApplicationLayout;
