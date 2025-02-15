import React from "react";

import { Playlayout } from "@/modules/play/ui/layouts/PlayLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Playlayout>{children}</Playlayout>;
};

export default Layout;
