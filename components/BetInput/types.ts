import { Dispatch, SetStateAction } from "react";

export type BetInputProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
};
