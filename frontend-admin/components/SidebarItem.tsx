import Link from "next/link";

interface SidebarItemProps {
  title: string;
  icon: any;
  href: string;
}

export const SidebarItem = ({ title, icon: Icon, href }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <li className="w-full flex items-center justify-start h-12 rounded-lg cursor-pointer hover:bg-gray-100">
        <Icon className="size-6 mr-3 ml-2" />
        <span>{title}</span>
      </li>
    </Link>
  );
};
