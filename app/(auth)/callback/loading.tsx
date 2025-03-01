import { Loader2 } from "lucide-react";
import React from "react";

const AuthLoading = () => {
  // const auth = await onAuthenticateUser();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Loader2 className="text-2xl animate-spin" />
    </div>
  );
};

export default AuthLoading;
