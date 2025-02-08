"use client";

import { use, useEffect } from "react";
import { Loader2Icon } from "lucide-react";

import { useLoginWithGoogle } from "@/features/auth/hooks/useLoginWithGoogle";

const CallbackPage = ({
  searchParams,
}: {
  searchParams: Promise<{
    code: string;
  }>;
}) => {
  const { handleCallback } = useLoginWithGoogle();

  const resolvedCode = use(searchParams);

  // Ambil state yang tersimpan
  const savedState =
    typeof window !== "undefined" ? sessionStorage.getItem("auth_redirect_state") : null;

  const { isLoading, isError } = handleCallback(resolvedCode.code);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      window.location.href =
        process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/auth/login";
      return;
    }

    // Decode state dan redirect
    if (savedState) {
      const redirectPath = decodeURIComponent(atob(savedState));
      sessionStorage.removeItem("auth_redirect_state");
      window.location.href = redirectPath;
    } else {
      window.location.href =
        process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/dashboard";
    }
  }),
    [isLoading, isError];

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center flex-col space-y-4">
        <Loader2Icon className="animate-spin size-16" />
        <p>Please wait patiently...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col space-y-4">
      <p>Redirecting to application..</p>
    </div>
  );
};

export default CallbackPage;
