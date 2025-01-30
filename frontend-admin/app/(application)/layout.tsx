import { PropsWithChildren } from "react";

import { Navbar, NavbarSpacer } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getAuth } from "@/helpers/getAuth";

const ApplicationLayout = async ({ children }: PropsWithChildren) => {
  const { user } = await getAuth();
  return (
    <div className="h-screen w-full overflow-hidden">
      <Navbar user={user!} />
      <NavbarSpacer />
      <div className="flex">
        <Sidebar user={user} />
        <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ApplicationLayout;
