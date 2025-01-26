import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { TanstackProvider } from "@/providers/TanstackProvider";
import { AuthContextProvider } from "@/features/auth/context/useAuthContext";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
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
    <html lang="en">
      <body className={cn(poppins.className)}>
        <TanstackProvider>
          <GoogleOAuthProvider clientId="941907082804-4j59igvjeps6fgagur3m47okvngr28lu.apps.googleusercontent.com">
            <AuthContextProvider>
              <Toaster />
              <div className="max-w-screen-2xl mx-auto margin-container">{children}</div>
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
