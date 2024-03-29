"use client";

import styles from "./styles.module.css";
// Hooks
import useAuth from "@/hooks/useAuth";

const ProfileBtn = () => {
  const { authUser, signIn, signOut } = useAuth();

  return (
    <>
      {authUser ? (
        <div className={styles.user_btn_wrapper} onClick={signOut}>
          <p>{authUser.displayName}</p>
        </div>
      ) : (
        <button onClick={signIn}>Login</button>
      )}
    </>
  );
};

export default ProfileBtn;
