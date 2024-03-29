import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const googleSignOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  });
  return { user, signIn: googleSignIn, signOut: googleSignOut };
};

export default useAuth;
