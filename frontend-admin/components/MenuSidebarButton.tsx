"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebarStore } from "@/store/useSidebarStore";

export const MenuSidebarButton = () => {
  const { toggle } = useSidebarStore();
  return (
    <div>
      <Button
        onClick={toggle}
        variant="ghost"
        className="xl:hidden pl-0  [&_svg]:size-6"
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
