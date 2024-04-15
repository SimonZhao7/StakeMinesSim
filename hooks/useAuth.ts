import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Firebase
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
// Types
import { User } from "@/app/types";

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
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          router.push(`/setup/${user.uid}`);
        }
        setAuthUser({ id: userDoc.id, ...userDoc.data() } as User);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authUser) return;
    const unsub = onSnapshot(doc(db, "users", authUser.id), (userDoc) => {
      setAuthUser({ id: userDoc.id, ...userDoc.data() } as User);
    });
    return () => unsub();
  }, [authUser]);
  return { authUser, signIn: googleSignIn, signOut: googleSignOut };
};

export default useAuth;
