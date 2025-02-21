import Link from "next/link";
import { Metadata } from "next";

import { Card } from "@/components/ui/card";
import LoginForm from "@/modules/auth/ui/forms/LoginForm";
import SocialLoginComponent from "@/modules/auth/ui/components/SocialLoginComponent";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Login Page",
  abstract: "Login page for Next.js + Laravel Oauth2",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const resolvedError = (await searchParams).error;
  let decodedError = null;
  try {
    decodedError = resolvedError ? JSON.parse(atob(resolvedError)) : null;
  } catch (error) {
    decodedError = { status_code: 400, message: "ERR_BAD_REQUEST" };
  }

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-screen-lg overflow-hidden rounded-[25px]">
        <div className="grid grid-cols-12 md:h-[550px]">
          <div className="col-span-12 md:col-span-7 px-12 py-6 flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold">Sign in to your Account</h1>
            {resolvedError && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Oauth Error</AlertTitle>
                <AlertDescription>{`${decodedError?.status_code ?? ""} - ${
                  decodedError.message
                }`}</AlertDescription>
              </Alert>
            )}

            <LoginForm />
            <div className="flex items-center justify-center w-full space-x-4">
              <div className="flex-grow h-[1px] bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or continue with</span>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            <Suspense>
              <SocialLoginComponent />
            </Suspense>
            <p className="text-sm">
              Don't have any account? &nbsp;
              <Link
                className=" text-primary font-bold"
                href="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="col-span-5 justify-center items-center  bg-gradient-to-br from-[#f77c08] to-[#fbad61] hidden md:flex">
            <div className="bg-cover bg-center bg-[url('/img/login-vector.png')] aspect-square size-64" />
          </div>
        </div>
      </Card>
    </div>
  );
}
