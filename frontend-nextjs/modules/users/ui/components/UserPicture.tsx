"use client";

import { useEffect, useState } from "react";

import { useUser } from "@/modules/auth/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const UserPicture = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, isError, user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className="size-9 rounded-full  ">&nbsp;</Skeleton>;
  }

  if (isError) {
    return (
      <Avatar className="size-9">
        <AvatarImage src="https://is3.cloudhost.id/chordexploler/chordexploler/images/124599.jpeg" />
        <AvatarFallback>{"Err"}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="size-9">
      <AvatarImage src={user?.avatar} />
      <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
