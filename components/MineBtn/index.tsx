import { FunctionComponent, useState } from "react";
import Image from "next/image";
// Types
import { MineBtnProps } from "./types";
// Images
import diamond from "@/public/images/diamond.png";
import bomb from "@/public/images/bomb.png";
// Styles
import styles from "./styles.module.css";

const MineBtn: FunctionComponent<MineBtnProps> = ({ mineGame, value, i }) => {
  const [loading, setLoading] = useState(false);

  const guessCell = async (cellIdx: number) => {
    // Only allow guess if game not over
    if (mineGame!.prizeRate > 0) {
      const r = Math.floor(cellIdx / 5);
      const c = cellIdx % 5;

      setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <button
      className={`${styles.mineBtn} ${loading && styles.btnLoading} ${
        value !== "UNDEF" && styles.minesAnsWrapper
      }`}
      onClick={() => guessCell(i)}
    >
      {value === "DIAMOND" && (
        <Image className={styles.diamond} src={diamond} alt={"Green diamond"} />
      )}
      {value === "BOMB" && (
        <Image className={styles.diamond} src={bomb} alt={"Red bomb"} />
      )}
    </button>
  );
};

export default MineBtn;
