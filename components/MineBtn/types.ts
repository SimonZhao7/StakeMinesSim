import { MineGame } from "@/app/mines/types";
import { AnswerEntry } from "@/app/mines/types";

export type MineBtnProps = {
  mineGame: MineGame;
  value: AnswerEntry;
  i: number;
};
