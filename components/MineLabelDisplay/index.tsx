import { FunctionComponent } from "react";
import styles from "./styles.module.css";
import { MineLabelDisplayProps } from "./types";

const MineLabelDisplay: FunctionComponent<MineLabelDisplayProps> = ({
  label,
  value,
}) => {
  return (
    <div className={styles.diamondsDisplayWrapper}>
      <label className={styles.diamondsLabel}>{label}</label>
      <div className={styles.diamondsDisplay}>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MineLabelDisplay;
