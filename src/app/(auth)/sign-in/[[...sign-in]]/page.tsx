"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.replace("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {!user && (
        <SignIn
          fallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
        />
      )}
    </div>
  );
}
