"use client";
import { useState, useEffect } from "react";
// Firebase
import {
  query,
  onSnapshot,
  collection,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
// Components
import Spinner from "@/components/Spinner";
import MineBtn from "@/components/MineBtn";
import BetInput from "@/components/BetInput";
import ConfirmBtn from "@/components/ConfirmBtn";
import MinesSelect from "@/components/MinesSelect";
import CashoutModal from "@/components/CashoutModal";
import MineLabelDisplay from "@/components/MineLabelDisplay";
// Hooks
import useAuth from "@/hooks/useAuth";
// Types
import { MineGame } from "../types";
// Styles
import styles from "./styles.module.css";

const Mines = () => {
  const [loading, setLoading] = useState(true);
  const [mineGame, setMineGame] = useState<MineGame | null>(null);
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const { authUser: user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (!user) return;
    const q = query(
      collection(db, "mines"),
      where("active", "==", true),
      where("user", "==", user?.id),
      limit(1)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const game = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as MineGame)
      )[0];
      if (game) {
        setMineGame(game);
        setBet(game.bet);
        setMines(game.mines);
        if (!game.selected.includes("UNDEF") && game.prizeRate > 0) {
          setModalOpen(true);
        }
      } else {
        setMineGame(null);
        setModalOpen(false);
      }
    });
    setLoading(false);
    return () => unsub();
  }, [user]);

  const createGame = async () => {
    await fetch("/mines", {
      method: "POST",
      headers: {
        Authorization: `Token ${user!.id}`,
      },
      body: JSON.stringify({
        mines,
        bet: +bet.toFixed(2),
      }),
    });
  };

  const cashout = async () => {
    await fetch(`/mines/${mineGame!.id}/cashout`, {
      method: "POST",
      headers: {
        Authorization: `Token ${user!.id}`,
      },
    });
  };

  return (
    <main className={styles.main}>
      {!loading ? (
        <>
          <aside className={styles.settings}>
            <BetInput
              value={bet}
              setValue={setBet}
              disabled={mineGame !== null}
            />
            <br />
            <div className={styles.minesRowWrapper}>
              <MinesSelect
                value={mines}
                setValue={setMines}
                disabled={mineGame !== null}
              />
              <MineLabelDisplay label={"Diamonds"} value={25 - mines} />
            </div>
            <br />
            {mineGame ? (
              <>
                <MineLabelDisplay
                  label="Cashout Value"
                  value={"$ " + (mineGame.bet * mineGame.prizeRate).toFixed(2)}
                />
                <br />
                {mineGame.prizeRate === 0 || modalOpen ? (
                  <ConfirmBtn label={"Play Again"} onClick={() => cashout()} />
                ) : (
                  <ConfirmBtn
                    label="Cash Out"
                    onClick={() => setModalOpen(true)}
                  />
                )}
              </>
            ) : (
              <ConfirmBtn label={"Begin Game"} onClick={() => createGame()} />
            )}
          </aside>
          <section className={styles.gameWrapper}>
            {mineGame ? (
              <>
                {mineGame.selected.map((v, i) => (
                  <MineBtn mineGame={mineGame} key={i} value={v} i={i} />
                ))}
              </>
            ) : (
              <>
                {new Array(25).fill(0).map((_, i) => (
                  <button className={styles.mineBtn} key={i}></button>
                ))}
              </>
            )}
            {mineGame && modalOpen && <CashoutModal mineGame={mineGame} />}
          </section>
        </>
      ) : (
        <>
          <aside className={styles.settings}>
            <Spinner />
          </aside>
          <section className={styles.gameWrapper}></section>
        </>
      )}
    </main>
  );
};

export default Mines;
