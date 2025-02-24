"use client";

import { useUser, SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.replace("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!user && (
        <SignUp
          fallbackRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
        />
      )}
    </div>
  );
}
