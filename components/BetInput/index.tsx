import { ChangeEventHandler, FunctionComponent } from "react";
// Types
import { BetInputProps } from "./types";
// Styles
import styles from "./styles.module.css";

const BetInput: FunctionComponent<BetInputProps> = ({
  value,
  disabled,
  setValue,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number.parseFloat(e.target.value));
  };

  return (
    <>
      <div className={styles.labelRow}>
        <label>Bet Amount</label>
        <label>${value ? value.toFixed(2) : Number(0).toFixed(2)}</label>
      </div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={value}
          type="number"
          min={0}
          step={0.01}
          disabled={disabled}
          onChange={handleChange}
        />
        <button
          className={styles.inputBtn}
          onClick={() => {
            if (!disabled) {
              setValue(0.5 * value);
            }
          }}
        >
          1/2
        </button>
        <button
          className={styles.inputBtn}
          onClick={() => {
            if (!disabled) {
              setValue(2 * value);
            }
          }}
        >
          2x
        </button>
      </div>
    </>
  );
};

export default BetInput;
