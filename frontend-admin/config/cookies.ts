export const COOKIE_NAME_ACCESS_TOKEN =
  (process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_DEV
    : process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN_PROD) ?? "access_token";

export const COOKIE_NAME_REFRESH_TOKEN =
  (process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_DEV
    : process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_PROD) ?? "refresh_token";
