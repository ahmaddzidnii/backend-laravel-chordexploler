import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { COOKIE_NAME_ACCESS_TOKEN } from "@/config/cookies";

export function useLogout() {
  const router = useRouter();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const queryClient = useQueryClient();

  const logout = ({ onError }: { onError?: (error: unknown) => void }) => {
    setIsLoadingLogout(true);

    const logoutPromise = axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${getCookie(COOKIE_NAME_ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });

    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    });

    logoutPromise
      .then(() => {
        setIsLoadingLogout(false);
        queryClient.removeQueries(); // Remove all queries from the cache
        router.refresh();
      })
      .catch((error) => {
        setIsLoadingLogout(false);
        console.error("Failed to logout:", error);
        onError?.(error);
      });
  };

  return { logout, isLoadingLogout };
}
