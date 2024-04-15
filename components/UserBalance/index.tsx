"use client";
import useAuth from "@/hooks/useAuth";
// Icons
import { FaBitcoin } from "react-icons/fa";
// Styles
import styles from "./styles.module.css";

const UserBalance = () => {
  const { authUser: user } = useAuth();

  return (
    <>
      {user && (
        <div className={styles.balanceWrapper}>
          <FaBitcoin size={20} /> ${user.balance.toFixed(2)}
        </div>
      )}
    </>
  );
};

export default UserBalance;
