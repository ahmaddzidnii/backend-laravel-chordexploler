import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UserButton } from "./UserButton";

export const AuthButton = () => {
  return (
    <>
      {false ? (
        <UserButton />
      ) : (
        <Button
          variant="outline"
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
        >
          <UserCircleIcon className="[&_svg]:size-6" />
          Signin
        </Button>
      )}
    </>
  );
};
