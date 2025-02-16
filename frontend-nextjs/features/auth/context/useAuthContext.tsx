"use client";

import { createContext, useState } from "react";
import { CookieValueTypes, getCookie } from "cookies-next";

import { AuthContextType } from "@/types";
import { COOKIE_NAME_ACCESS_TOKEN } from "@/config/cookies";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getCookie(COOKIE_NAME_ACCESS_TOKEN);
  const [token, setToken] = useState<CookieValueTypes | Promise<CookieValueTypes>>(accessToken);

  const contextValue: AuthContextType = {
    isAuthenticated: !!token,
    getAccessToken: () => (token as string) ?? null,
    setToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
