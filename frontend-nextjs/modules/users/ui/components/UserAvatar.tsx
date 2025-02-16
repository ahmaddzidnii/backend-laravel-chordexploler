import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userAvatarVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "size-6",
      lg: "size-9",
      sm: "size-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatar extends VariantProps<typeof userAvatarVariants> {
  imageUrl: string;
  name: string;
  className?: string;
}

export const UserAvatar = ({ name, className, size, imageUrl }: UserAvatar) => {
  return (
    <Avatar className={cn(userAvatarVariants({ size }), className)}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
