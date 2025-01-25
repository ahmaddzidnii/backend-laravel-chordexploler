"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarItem } from "./SidebarItem";
import { CiSettings } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { RiMusicAiLine } from "react-icons/ri";
import { RiFeedbackFill } from "react-icons/ri";
import { IoMdPeople } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebarStore } from "@/store/useSidebarStore";

const sidebars = {
  MID_SECTION: [
    { title: "Dashboard", icon: MdDashboard, href: "/dashboard" },
    { title: "Chords", icon: RiMusicAiLine, href: "/chords" },
    { title: "Analytics", icon: SiGoogleanalytics, href: "/analytics" },
    { title: "Comments", icon: FaComment, href: "/comments" },
    { title: "Subscribers", icon: IoMdPeople, href: "/subscribers" },
  ],
  BOTTOM_SECTION: [
    { title: "Settings", icon: CiSettings, href: "/settings" },
    { title: "Feedback", icon: RiFeedbackFill, href: "/settings" },
  ],
};

const Sidebar = () => {
  return (
    <>
      <SidebarMobile />
      <div className="w-[255px] border-r  flex-col justify-between h-[calc(100vh-56px)] ml-4 hidden xl:flex">
        <div className="w-full h-[208px] flex items-center flex-col justify-center">
          <Avatar className="size-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center mt-2">
            <span className="text-xl font-bold">Channel Anda</span>
            <p className="text-sm">Madz Channel</p>
          </div>
        </div>
        <ul className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin pr-3">
          {sidebars["MID_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
              isActive={sidebar.href === "/chords"}
            />
          ))}
        </ul>
        <ul className="pr-3 border-t">
          {sidebars["BOTTOM_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

const SidebarMobile = () => {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <Sheet
      modal={false}
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetContent
        side="left"
        className="w-[255px] border-r flex-col justify-between  ml-4  flex xl:hidden"
      >
        <VisuallyHidden>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden>
        <div className="w-full h-[208px] flex items-center flex-col justify-center">
          <Avatar className="size-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center mt-2">
            <span className="text-xl font-bold">Channel Anda</span>
            <p className="text-sm">Madz Channel</p>
          </div>
        </div>
        <ul className="flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin pr-3">
          {sidebars["MID_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
              isActive={sidebar.href === "/chords"}
            />
          ))}
        </ul>
        <ul className="pr-3 border-t">
          {sidebars["BOTTOM_SECTION"].map((sidebar, index) => (
            <SidebarItem
              key={index}
              title={sidebar.title}
              icon={sidebar.icon}
              href={sidebar.href}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
