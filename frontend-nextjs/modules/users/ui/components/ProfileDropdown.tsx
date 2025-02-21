"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { LogOut, Moon, MessageSquarePlus, User, Youtube, SunIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useUser } from "@/modules/auth/hooks/useUser";

export default function ProfileDropdown({ children }: React.PropsWithChildren<{}>) {
  const { logout } = useLogout();
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const menus = [
    [
      {
        icon: User,
        title: "Channel Anda",
        isLink: true,
        href: "/dashboard",
        onClick: () => {},
      },
      {
        icon: Youtube,
        title: "ChordExploler",
        isLink: true,
        href: "https://www.youtube.com/",
        onClick: () => {},
      },
      {
        icon: User,
        title: "Profile Settings",
        isLink: true,
        href: "/dashboard",
        onClick: () => {},
      },
      {
        icon: LogOut,
        title: "Logout",
        isLink: false,
        href: null,
        onClick: () => logout({}),
      },
    ],
    [
      {
        icon: theme === "dark" ? Moon : SunIcon,
        title: `Mode : ${theme === "dark" ? "Gelap" : "Terang"}`,
        isLink: false,
        href: null,
        onClick: () => {
          setTheme((theme) => (theme === "dark" ? "light" : "dark"));
        },
      },
      {
        icon: MessageSquarePlus,
        title: "Kirim masukan",
        isLink: false,
        href: null,
        onClick: () => {},
      },
    ],
  ];
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menus[0].map((menu, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer py-2"
                onClick={menu.isLink ? () => () => {} : menu.onClick}
              >
                {menu.isLink ? (
                  <Link
                    href={menu.href as string}
                    className="flex items-center gap-2 w-full"
                  >
                    <menu.icon className="mr-2 h-4 w-4" />
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <menu.icon className="mr-2 h-4 w-4" />
                    <span>{menu.title}</span>
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />
          {menus[1].map((menu, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer py-2"
                onClick={menu.isLink ? () => () => {} : menu.onClick}
              >
                {menu.isLink ? (
                  <Link
                    href={menu.href as string}
                    className="flex items-center gap-2 w-full"
                  >
                    <menu.icon className="mr-2 h-4 w-4" />
                    <span>{menu.title}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <menu.icon className="mr-2 h-4 w-4" />
                    <span>{menu.title}</span>
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
