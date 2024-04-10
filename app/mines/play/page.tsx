"use client";
import { useState } from "react";
import BetInput from "@/components/BetInput";
import styles from "./styles.module.css";
import MinesSelect from "@/components/MinesSelect";
import DiamondsDisplay from "@/components/DiamondsDisplay";
import ConfirmBtn from "@/components/ConfirmBtn";

const Mines = () => {
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(1);

  return (
    <main className={styles.main}>
      <aside className={styles.settings}>
        <BetInput value={bet} setValue={setBet} />
        <br />
        <div className={styles.minesRowWrapper}>
          <MinesSelect value={mines} setValue={setMines} />
          <DiamondsDisplay mines={mines} />
        </div>
        <br />
        <ConfirmBtn label={"Begin Game"} onClick={() => {}} />
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
