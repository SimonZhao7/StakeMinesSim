import { FunctionComponent } from "react";
// Types
import { ConfirmBtnProps } from "./types";
// Styles
import styles from "./styles.module.css";

const ConfirmBtn: FunctionComponent<ConfirmBtnProps> = ({
  label,
  onClick,
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default ConfirmBtn;
