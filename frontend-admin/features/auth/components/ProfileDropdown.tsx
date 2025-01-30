"use client";

import { LogOut, Moon, MessageSquarePlus, ChevronRight, User, Youtube } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUser } from "@/types";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/navigation";
import { createElement } from "react";

export default function ProfileDropdown({
  children,
  user,
}: React.PropsWithChildren<{
  user: AuthUser | null;
}>) {
  const { logout } = useLogout();
  const router = useRouter();
  const menus = [
    [
      {
        icon: User,
        title: "Channel Anda",
        onClick: () => {
          router.push("/dashboard");
        },
      },
      {
        icon: Youtube,
        title: "ChordExploler",
        onClick: () => {
          const a = document.createElement("a");
          a.href = "https://www.youtube.com/";
          a.target = "_blank";
          a.click();
        },
      },
      {
        icon: User,
        title: "Profile Settings",
        onClick: () => {},
      },
      {
        icon: LogOut,
        title: "Logout",
        onClick: () => logout({}),
      },
    ],
    [
      {
        icon: Moon,
        title: "Tampilan: Gelap",
        onClick: () => {},
      },
      {
        icon: MessageSquarePlus,
        title: "Kirim masukan",
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
          {menus[0].map((menu, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer"
              onClick={menu.onClick}
            >
              <menu.icon className="mr-2 h-4 w-4" />
              <span>{menu.title}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          {menus[1].map((menu, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer"
              onClick={menu.onClick}
            >
              <menu.icon className="mr-2 h-4 w-4" />
              <span>{menu.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
