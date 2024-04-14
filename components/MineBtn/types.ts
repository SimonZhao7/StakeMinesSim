import { AnswerEntry } from "@/app/mines/types";
import { MineGame } from "@/app/mines/play/types";

export type MineBtnProps = {
  mineGame: MineGame;
  value: AnswerEntry;
  i: number;
};
