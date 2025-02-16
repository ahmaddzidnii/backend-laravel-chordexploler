import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { AuthContextProvider } from "@/features/auth/context/useAuthContext";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/providers/ThemeProvider";
import ModalProvider from "@/providers/ModalProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ChordXploler Studio",
    default: "ChordXploler Studio",
  },
  description: "ChordXploler Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(roboto.className)}
        suppressHydrationWarning
      >
        <TanstackProvider>
          <GoogleOAuthProvider clientId="941907082804-4j59igvjeps6fgagur3m47okvngr28lu.apps.googleusercontent.com">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <AuthContextProvider>
                <Toaster />
                <NextTopLoader showSpinner={false} />
                <ModalProvider />
                <TooltipProvider>
                  <div className="max-w-screen-2xl mx-auto margin-container">{children}</div>
                </TooltipProvider>
              </AuthContextProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
