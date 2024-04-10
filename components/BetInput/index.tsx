import { BetInputProps } from "./types";
import styles from "./styles.module.css";
import { ChangeEventHandler, FunctionComponent } from "react";

const BetInput: FunctionComponent<BetInputProps> = ({ value, setValue }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number.parseFloat(e.target.value));
  };

  return (
    <>
      <div className={styles.labelRow}>
        <label>Bet Amount</label>
        <label>${value ? value.toFixed(2) : 0}</label>
      </div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={value}
          defaultValue={0}
          type="number"
          min={0}
          step={0.01}
          onChange={handleChange}
        />
        <button
          className={styles.inputBtn}
          onClick={() => setValue(0.5 * value)}
        >
          1/2
        </button>
        <button className={styles.inputBtn} onClick={() => setValue(2 * value)}>
          2x
        </button>
      </div>
    </>
  );
};

export default BetInput;
