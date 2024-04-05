export type BoardEntry = "DIAMOND" | "BOMB";

export type AnswerEntry = BoardEntry | "UNDEF";

/*
  board         - board showing locations of diamonds and mines, flattened to 1D array. DON'T SHOW TO CLIENT
  selected      - boolean 1D array, exposing answers for selected locations. (DIAMOND, BOMB, UNDEF)
  bet           - the original bet value
  mines         - the number of mines set in this game.
  prizeRate     - the increase rate of bet, increases for more diamonds revealed
  active        - true if game is currently active.
*/
export type MineGame = {
  board: BoardEntry[];
  selected: AnswerEntry[];
  bet: number;
  mines: number;
  prizeRate: number;
  active: boolean;
}

export type MineGameRes = Partial<MineGame>;