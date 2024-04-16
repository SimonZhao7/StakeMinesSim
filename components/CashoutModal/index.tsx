import { FunctionComponent } from "react";
// Types
import { CashoutModalProps } from "./types";
// Styles
import styles from "./styles.module.css";

const CashoutModal: FunctionComponent<CashoutModalProps> = ({ mineGame }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.profitWrapper}>
        <div>
          <h1 className={styles.rateHeader}>
            {mineGame!.prizeRate.toFixed(2)}x
          </h1>
          <hr className={styles.line} />
          <p>${(mineGame.bet * mineGame.prizeRate).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CashoutModal;
