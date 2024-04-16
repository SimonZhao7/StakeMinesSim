import { FunctionComponent } from "react";
// Types
import { MineLabelDisplayProps } from "./types";
// Styles
import styles from "./styles.module.css";

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
