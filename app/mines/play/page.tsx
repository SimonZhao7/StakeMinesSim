"use client";
import { useState } from "react";
import BetInput from "@/components/BetInput";
import styles from "./styles.module.css";

const Mines = () => {
  const [bet, setBet] = useState(0);

  return (
    <main className={styles.main}>
      <aside className={styles.settings}>
        <BetInput value={bet} setValue={setBet} />
      </aside>
      <section className={styles.gameWrapper}>
        {new Array(25).fill(0).map((_, i) => (
          <button className={styles.mineBtn} key={i}></button>
        ))}
      </section>
    </main>
  );
};

export default Mines;
