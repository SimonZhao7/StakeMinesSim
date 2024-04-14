import { FunctionComponent, useState } from "react";
import { MineBtnProps } from "./types";
import Image from "next/image";
import styles from "./styles.module.css";
import diamond from "@/public/images/diamond.png";
import bomb from "@/public/images/bomb.png";

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

  if (value === "UNDEF") {
    return (
      <button
        className={`${styles.mineBtn} ${loading && styles.btnLoading}`}
        onClick={() => guessCell(i)}
      ></button>
    );
  }

  const imgSrc = value === "DIAMOND" ? diamond : bomb;
  const imgAlt = value === "DIAMOND" ? "Green diamond" : "Red bomb";
  return (
    <div className={styles.minesAnsWrapper}>
      <Image className={styles.diamond} src={imgSrc} alt={imgAlt} />
    </div>
  );
};

export default MineBtn;
