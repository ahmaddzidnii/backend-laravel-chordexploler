"use client";

import { useState, useEffect } from "react";
import { UserCircleIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

import { Button } from "@/components/ui/button";
import { UserButton } from "./UserButton";
import { useUser } from "@/modules/auth/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthButton = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignin = () => {
    const origin =
      typeof window !== "undefined" && window.location.href ? window.location.href : "";
    const url = `/auth/login?state=${btoa(origin)}`;
    router.push(url.toString());
  };

  if (!isMounted) {
    return <Skeleton className="size-10 rounded-full">&nbsp;</Skeleton>;
  }

  if (isLoading) {
    return <Skeleton className="size-10 rounded-full">&nbsp;</Skeleton>;
  }

  return (
    <>
      {user ? (
        <UserButton />
      ) : (
        <Button
          variant="outline"
          onClick={handleSignin}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
        >
          <UserCircleIcon className="[&_svg]:size-6" />
          Signin
        </Button>
      )}
    </>
  );
};
