"use client";

import styles from "./styles.module.css";
// Hooks
import useAuth from "@/hooks/useAuth";

const ProfileBtn = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <>
      {user ? (
        <div className={styles.user_btn_wrapper} onClick={signOut}>
          <p>{user.displayName}</p>
        </div>
      ) : (
        <button onClick={signIn}>Login</button>
      )}
    </>
  );
};

export default ProfileBtn;
