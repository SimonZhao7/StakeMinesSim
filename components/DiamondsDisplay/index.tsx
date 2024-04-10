import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { DiamondsDisplayProps } from "./types";

const DiamondsDisplay: FunctionComponent<DiamondsDisplayProps> = ({
  mines,
}) => {
  return (
    <div className={styles.diamondsDisplayWrapper}>
      <label className={styles.diamondsLabel}>Diamonds</label>
      <div className={styles.diamondsDisplay}>
        <p>{24 - mines + 1}</p>
      </div>
    </div>
  );
};

export default DiamondsDisplay;
