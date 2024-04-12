"use client";
import { useState, useEffect, MouseEventHandler } from "react";
// Firebase
import {
  getDocs,
  query,
  onSnapshot,
  collection,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
// Components
import BetInput from "@/components/BetInput";
import MinesSelect from "@/components/MinesSelect";
import MineLabelDisplay from "@/components/MineLabelDisplay";
import ConfirmBtn from "@/components/ConfirmBtn";
import styles from "./styles.module.css";
import useAuth from "@/hooks/useAuth";
import { MineGame } from "./types";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import diamond from "@/public/images/diamond.png";
import bomb from "@/public/images/bomb.png";

const Mines = () => {
  const [loading, setLoading] = useState(true);
  const [mineGame, setMineGame] = useState<MineGame | null>(null);
  const [bet, setBet] = useState(0);
  const [mines, setMines] = useState(1);
  const { authUser: user } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (!user) return;
    const q = query(
      collection(db, "mines"),
      where("active", "==", true),
      where("user", "==", user?.uid),
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
      }
    });
    setLoading(false);
    return () => unsub();
  }, [user]);

  const guessCell = async (cellIdx: number) => {
    // Only allow guess if game not over
    if (mineGame!.prizeRate > 0) {
      const r = Math.floor(cellIdx / 5);
      const c = cellIdx % 5;

      await fetch(`/mines/${mineGame!.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          row: r,
          col: c,
        }),
      });
    }
  };

  const createGame = async () => {
    await fetch("/mines", {
      method: "POST",
      headers: {
        Authorization: `Token ${user!.uid}`,
      },
      body: JSON.stringify({
        mines,
        bet,
      }),
    });
  };

  const cashout = async () => {
    await fetch(`/mines/${mineGame!.id}/cashout`, {
      method: "POST",
      headers: {
        Authorization: `Token ${user!.uid}`,
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
                <ConfirmBtn label={"Play Again"} onClick={() => cashout()} />
              </>
            ) : (
              <ConfirmBtn label={"Begin Game"} onClick={() => createGame()} />
            )}
          </aside>
          <section className={styles.gameWrapper}>
            {mineGame ? (
              <>
                {mineGame.selected.map((v, i) => {
                  if (v === "DIAMOND") {
                    return (
                      <div className={styles.minesAnsWrapper}>
                        <Image
                          className={styles.diamond}
                          src={diamond}
                          alt={"Green diamond"}
                        />
                      </div>
                    );
                  }
                  if (v === "BOMB") {
                    return (
                      <div className={styles.minesAnsWrapper}>
                        <Image
                          className={styles.diamond}
                          src={bomb}
                          alt={"Red bomb"}
                        />
                      </div>
                    );
                  }
                  return (
                    <button
                      className={styles.mineBtn}
                      onClick={() => guessCell(i)}
                      key={i}
                    ></button>
                  );
                })}
              </>
            ) : (
              <>
                {new Array(25).fill(0).map((_, i) => (
                  <button className={styles.mineBtn} key={i}></button>
                ))}
              </>
            )}
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
