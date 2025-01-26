import { NextResponse } from "next/server";
import { authMiddleware } from "@/helpers/authMiddleware";
import { createRouteMatcher } from "./helpers/createRouteMatcher";
import { decodeBase64, encodeBase64 } from "./helpers/base64";

export default authMiddleware(async (auth, req) => {
  const isPublicRoutes = createRouteMatcher([
    "/",
    "/auth(.*)",
    "/api/auth(.*)",
    "/chords(.*)",
    "/dashboard(.*)",
  ]);
  const isAuthRoutes = createRouteMatcher(["/auth(.*)"]);

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(
        process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/dashboard",
        req.nextUrl
      )
    );
  }

  // Get state from search params
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get("state");
  const decodedState = state ? decodeBase64(state) : null;

  // Handle state parameter for unauthenticated users
  if (!auth.isAuthenticated && !isPublicRoutes(req)) {
    const loginUrl = new URL(process.env.NEXT_PUBLIC_PATH_LOGIN_PAGE ?? "/auth/login", req.nextUrl);

    // Add the current URL as encoded state if none is provided
    if (!state) {
      loginUrl.searchParams.set("state", encodeBase64(req.nextUrl.pathname + req.nextUrl.search));
    } else {
      loginUrl.searchParams.set("state", state);
    }

    return NextResponse.redirect(loginUrl);
  }

  // Handle state parameter for authenticated users
  if (auth.isAuthenticated && isAuthRoutes(req)) {
    // If state exists and is valid, redirect to decoded URL
    if (decodedState) {
      try {
        const redirectUrl = new URL(decodedState, req.nextUrl.origin);

        // Only allow redirects to same origin
        if (redirectUrl.origin === req.nextUrl.origin) {
          return NextResponse.redirect(redirectUrl);
        }
      } catch (error) {
        console.error("Invalid redirect URL from state:", error);
      }
    }

    // Default redirect if no valid state parameter
    return NextResponse.redirect(
      new URL(
        process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/dashboard",
        req.nextUrl
      )
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

// import { NextResponse } from "next/server";

// import { authMiddleware } from "@/helpers/authMiddleware";
// import { createRouteMatcher } from "./helpers/createRouteMatcher";

// export default authMiddleware(async (auth, req) => {
//   const isPublicRoutes = createRouteMatcher(["/", "/auth(.*)", "/api/auth(.*)"]);
//   const isAuthRoutes = createRouteMatcher(["/auth(.*)"]);

//   if (!auth.isAuthenticated && !isPublicRoutes(req)) {
//     return NextResponse.redirect(
//       new URL(process.env.NEXT_PUBLIC_PATH_LOGIN_PAGE ?? "/auth/login", req.nextUrl)
//     );
//   }

//   if (auth.isAuthenticated && isAuthRoutes(req)) {
//     return NextResponse.redirect(
//       new URL(
//         process.env.NEXT_PUBLIC_REDIRECT_PATH_IF_USER_IS_AUTHENTICATED ?? "/dashboard",
//         req.nextUrl
//       )
//     );
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
