"use client";

import React from "react";

import { useLoginWithGoogle } from "@/modules/auth/hooks/useLoginWithGoogle";
import { useSearchParams } from "next/navigation";

const SocialLoginComponent = () => {
  const searchParams = useSearchParams();
  const { login } = useLoginWithGoogle();
  const handleGoogleLogin = () => {
    const state = searchParams.get("state");

    if (state) {
      sessionStorage.setItem("auth_redirect_state", state);
    }

    login();
  };
  return (
    <div className="w-full flex gap-5">
      <button
        onClick={handleGoogleLogin}
        className="w-full border rounded-sm p-3 flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <div className="bg-cover bg-center bg-[url('/img/google.png')] size-6" />
      </button>
      <button
        disabled={true}
        className="w-full border rounded-sm p-3 flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <div className="bg-cover bg-center bg-[url('/img/github.png')] size-6" />
      </button>
    </div>
  );
};

export default SocialLoginComponent;
