import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarItemProps {
  title: string;
  icon: any;
  href: string;
  isActive?: boolean;
}

export const SidebarItem = ({ title, icon: Icon, href, isActive = false }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <li
        className={cn(
          "w-full flex items-center justify-start h-12 rounded-lg cursor-pointer hover:bg-muted",
          isActive && "bg-muted"
        )}
      >
        <Icon className="size-6 mr-3 ml-2" />
        <span>{title}</span>
      </li>
    </Link>
  );
};
