"use client";

import { use, useEffect } from "react";
import { Loader2Icon } from "lucide-react";

import { useLoginWithGoogle } from "@/modules/auth/hooks/useLoginWithGoogle";

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

  const { isLoading, isError, error } = handleCallback(resolvedCode.code);

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      const errorObject = error as unknown as any;
      const errors = btoa(
        JSON.stringify({
          status_code: errorObject.status,
          message: errorObject.code,
        })
      );
      window.location.href = `${
        process.env.NEXT_PUBLIC_PATH_LOGIN_PAGE ?? "/auth/login"
      }?error=${errors}`;
      return;
    }

    // Decode state dan redirect
    if (savedState) {
      const redirectPath = decodeURIComponent(atob(savedState));
      sessionStorage.removeItem("auth_redirect_state");
      window.location.href = redirectPath;
    } else {
      window.location.href =
        process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/studio/dashboard";
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
