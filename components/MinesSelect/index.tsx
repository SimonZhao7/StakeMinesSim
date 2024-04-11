import { FunctionComponent, useState, useRef, useEffect } from "react";
import { MinesSelectProps } from "./types";
// Icons
import { TiArrowSortedDown } from "react-icons/ti";
import styles from "./styles.module.css";

const MinesSelect: FunctionComponent<MinesSelectProps> = ({
  value,
  disabled,
  setValue,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSelectOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  return (
    <div className={styles.selectWrapper} ref={dropdownRef}>
      <label className={styles.label}>Mines</label>
      <div
        className={styles.selectDisplay}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        onClick={() => setSelectOpen(true)}
      >
        <p>{value}</p>
        <TiArrowSortedDown size={20} />
      </div>
      {!disabled && selectOpen && (
        <div className={styles.selectDropdown}>
          {new Array(24).fill(0).map((_, i) => (
            <button
              className={styles.optionBtn}
              onClick={(_) => {
                setValue(i + 1);
                setSelectOpen(false);
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinesSelect;
