"use client";

import { FunctionComponent, MouseEventHandler, useState } from "react";
import styles from "./page.module.css";
// Components
import Input from "@/components/Input";
// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const SetupAccount: FunctionComponent<Props> = ({ params: { id } }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submitForm: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (username.trim().length < 8) {
      setError("Username must be at least 8 characters long.");
      return;
    }

    const now = new Date();
    await setDoc(doc(db, "users", id), {
      username,
      balance: 100.0,
      lastLogin: new Date(now.getFullYear(), now.getMonth(), now.getDay()),
    });

    router.replace('/');
  };

  return (
    <main className={styles.main_wrapper}>
      <form className={styles.form}>
        <h1 className={styles.form_title}>Complete Account Setup</h1>
        <Input label={"Username"} changeHandler={setUsername} error={error} />
        <button onClick={submitForm} className={styles.button}>
          Create Account
        </button>
      </form>
    </main>
  );
};

export default SetupAccount;
