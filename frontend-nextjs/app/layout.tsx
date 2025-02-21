import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Bounce, ToastContainer } from "react-toastify";

import { cn } from "@/lib/utils";
import ModalProvider from "@/providers/ModalProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TanstackProvider } from "@/providers/TanstackProvider";
import { AuthContextProvider } from "@/modules/auth/context/useAuthContext";

import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(roboto.className)}
        suppressHydrationWarning
      >
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <AuthContextProvider>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
              />
              <NextTopLoader showSpinner={false} />
              <ModalProvider />
              <TooltipProvider>
                <div className="max-w-screen-2xl mx-auto margin-container">{children}</div>
              </TooltipProvider>
            </AuthContextProvider>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
