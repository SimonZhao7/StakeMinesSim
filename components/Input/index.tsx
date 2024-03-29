import { FunctionComponent, Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  changeHandler: Dispatch<SetStateAction<string>>;
};

const Input: FunctionComponent<Props> = ({
  label,
  placeholder,
  type,
  error,
  changeHandler,
}) => {
  return (
    <div className={styles.input_wrapper}>
      <label>{label}</label>
      <input
        className={styles.input}
        onChange={(e) => changeHandler(e.target.value)}
        placeholder={placeholder}
        type={type}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
