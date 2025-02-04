import "server-only";
import axios from "axios";
import * as jose from "jose";
import { cookies } from "next/headers";
import { AuthUser } from "@/types";

import { COOKIE_NAME_ACCESS_TOKEN, COOKIE_NAME_REFRESH_TOKEN } from "@/config/cookies";
import { cache } from "react";

type AuthObject = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  getAccessToken: () => Promise<string | null>;
};

const createAuthObject = (isAuthenticated: boolean, user: AuthUser | null): AuthObject => ({
  isAuthenticated,
  user,
  getAccessToken: async () => {
    const accessToken = (await cookies()).get(COOKIE_NAME_ACCESS_TOKEN)?.value;
    return accessToken ?? null;
  },
});

async function attemptTokenRefresh(refreshToken: string) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auth/refresh", {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Refresh token failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
}

export const getAuth = cache(async (): Promise<AuthObject> => {
  try {
    const accessToken = (await cookies()).get(COOKIE_NAME_ACCESS_TOKEN)?.value;
    const refreshToken = (await cookies()).get(COOKIE_NAME_REFRESH_TOKEN)?.value;

    // Jika tidak ada kedua token, return unauthenticated
    if (!accessToken && !refreshToken) {
      return createAuthObject(false, null);
    }

    // Jika ada refresh token tapi tidak ada access token, coba refresh
    if (!accessToken && refreshToken) {
      try {
        console.log("Access token missing, attempting refresh...");
        const newAccessToken = await attemptTokenRefresh(refreshToken);

        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return createAuthObject(true, {
          id: response.data.data.id as string,
          name: response.data.data.name as string,
          email: response.data.data.email as string,
          avatar: response.data.data.avatar as string,
          role: response.data.data.role as string,
        });
      } catch (refreshError) {
        console.error("Refresh attempt failed:", refreshError);
        return createAuthObject(false, null);
      }
    }

    // Normal flow with access token verification
    try {
      console.log("hit api /users from getAuth");
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return createAuthObject(true, {
        id: response.data.data.id as string,
        name: response.data.data.name as string,
        email: response.data.data.email as string,
        avatar: response.data.data.avatar as string,
        role: response.data.data.role as string,
      });
    } catch (error: any) {
      // Handle expired token
      if (error.code === "ERR_JWT_EXPIRED" && refreshToken) {
        console.log("Access token expired, refreshing...");

        try {
          const newAccessToken = await attemptTokenRefresh(refreshToken);

          const { payload } = await jose.jwtVerify(
            newAccessToken,
            new TextEncoder().encode(process.env.JWT_SECRET),
            { algorithms: ["HS256"] }
          );

          return createAuthObject(true, {
            id: payload.sub as string,
            name: payload.username as string,
            email: payload.email as string,
            avatar: payload.avatar as string,
            role: payload.role as string,
          });
        } catch (refreshError) {
          console.error("Refresh attempt failed:", refreshError);
          return createAuthObject(false, null);
        }
      }

      // Handle other errors

      return createAuthObject(false, null);
    }
  } catch (error) {
    //  Handle other errors
    return createAuthObject(false, null);
  }
});
// export async function getAuth(): Promise<AuthObject> {
//   try {
//     const accessToken = (await cookies()).get(COOKIE_NAME_ACCESS_TOKEN)?.value;
//     const refreshToken = (await cookies()).get(COOKIE_NAME_REFRESH_TOKEN)?.value;

//     // Jika tidak ada kedua token, return unauthenticated
//     if (!accessToken && !refreshToken) {
//       return createAuthObject(false, null);
//     }

//     // Jika ada refresh token tapi tidak ada access token, coba refresh
//     if (!accessToken && refreshToken) {
//       try {
//         console.log("Access token missing, attempting refresh...");
//         const newAccessToken = await attemptTokenRefresh(refreshToken);

//         const response = await axios.get("http://127.0.0.1:8000/api/users", {
//           headers: {
//             Authorization: `Bearer ${newAccessToken}`,
//           },
//         });

//         return createAuthObject(true, {
//           id: response.data.data.id as string,
//           name: response.data.data.name as string,
//           email: response.data.data.email as string,
//           avatar: response.data.data.avatar as string,
//           role: response.data.data.role as string,
//         });
//       } catch (refreshError) {
//         console.error("Refresh attempt failed:", refreshError);
//         return createAuthObject(false, null);
//       }
//     }

//     // Normal flow with access token verification
//     try {
//       console.log("hit api /users from getAuth");
//       const response = await axios.get("http://127.0.0.1:8000/api/users", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       return createAuthObject(true, {
//         id: response.data.data.id as string,
//         name: response.data.data.name as string,
//         email: response.data.data.email as string,
//         avatar: response.data.data.avatar as string,
//         role: response.data.data.role as string,
//       });
//     } catch (error: any) {
//       // Handle expired token
//       if (error.code === "ERR_JWT_EXPIRED" && refreshToken) {
//         console.log("Access token expired, refreshing...");

//         try {
//           const newAccessToken = await attemptTokenRefresh(refreshToken);

//           const { payload } = await jose.jwtVerify(
//             newAccessToken,
//             new TextEncoder().encode(process.env.JWT_SECRET),
//             { algorithms: ["HS256"] }
//           );

//           return createAuthObject(true, {
//             id: payload.sub as string,
//             name: payload.username as string,
//             email: payload.email as string,
//             avatar: payload.avatar as string,
//             role: payload.role as string,
//           });
//         } catch (refreshError) {
//           console.error("Refresh attempt failed:", refreshError);
//           return createAuthObject(false, null);
//         }
//       }

//       // Handle other errors

//       return createAuthObject(false, null);
//     }
//   } catch (error) {
//     //  Handle other errors
//     return createAuthObject(false, null);
//   }
// }
