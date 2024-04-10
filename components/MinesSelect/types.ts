import { Dispatch, SetStateAction } from "react";

export type MinesSelectProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};
