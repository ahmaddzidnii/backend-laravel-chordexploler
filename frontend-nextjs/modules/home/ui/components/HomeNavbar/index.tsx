import React from "react";
import Link from "next/link";

import ApplicationLogo from "@/components/Logo";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { AuthButton } from "@/modules/auth/ui/components/AuthButton";

import { SearchInput } from "./SearchInput";

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0 ">
          <SidebarTrigger />
          <Link
            href="/"
            legacyBehavior
          >
            <div className="pl-4">
              <ApplicationLogo />
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        {/* Auth Button */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
