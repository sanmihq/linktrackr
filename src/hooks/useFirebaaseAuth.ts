"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@/lib/firebase";
import { signInWithCustomToken, signOut } from "firebase/auth";

export function useFirebaseAuth() {
  const { userId, getToken } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  useEffect(() => {
    const signIntoFirebase = async () => {
      if (userId) {
        try {
          const token = await getToken({ template: "integration_firebase" });
          const userCredentials = await signInWithCustomToken(
            auth,
            token || ""
          );
          setFirebaseUser(userCredentials.user);
          console.log("Signed into Firebase:", userCredentials.user);
        } catch (error) {
          console.error("Firebase sign-in failed:", error);
        }
      } else {
        // If Clerk logs out, sign out from Firebase
        await signOut(auth);
        setFirebaseUser(null);
        console.log("Signed out of Firebase");
      }
    };

    signIntoFirebase();
  }, [userId, getToken]);

  return { firebaseUser };
}
