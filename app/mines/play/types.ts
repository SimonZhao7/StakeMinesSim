import { AnswerEntry, BoardEntry } from "../types";

export type MineGame = {
  id: string;
  board: BoardEntry[];
  selected: AnswerEntry[];
  bet: number;
  mines: number;
  prizeRate: number;
  active: boolean;
  user: string;
};
