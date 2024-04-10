import { FunctionComponent } from "react";
import { ConfirmBtnProps } from "./types";
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
