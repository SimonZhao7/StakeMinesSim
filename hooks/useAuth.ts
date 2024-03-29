import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Firebase
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

const useAuth = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const googleSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          router.push(`/setup/${user.uid}`);
        }
      }
    });
    return () => unsub();
  });
  return { authUser, signIn: googleSignIn, signOut: googleSignOut };
};

export default useAuth;
