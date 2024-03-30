import { NextResponse } from "next/server";
// Firebase
import { db } from "@/firebase";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";

type PostRequestBody = {
  mines: number;
  bet: number;
};

type BoardEntry = "DIAMOND" | "BOMB";

export async function POST(request: Request) {
  const uid = request.headers.get("Authorization")?.split(" ")[1];

  if (!uid || !(await getDoc(doc(db, "users", uid))).exists()) {
    return NextResponse.json(
      {
        message:
          "Invalid authentication token. " +
          `Set the Authorization header to the value "Token {token}"`,
      },
      { status: 400 }
    );
  }

  const body: PostRequestBody = await request.json();

  if (!body.mines) {
    return NextResponse.json(
      { message: `Missing value for key "mines"` },
      { status: 400 }
    );
  }

  if (!body.bet) {
    return NextResponse.json({ message: `Missing value for key "bet"` });
  }

  const { mines, bet } = body;

  if (mines <= 0 || mines >= 25) {
    return NextResponse.json(
      { message: `Invalid value for key "mines" ${mines}` },
      { status: 400 }
    );
  }

  const board: BoardEntry[] = new Array(25);
  board.fill("DIAMOND");

  const mineLocations = new Set<number>();

  while (mineLocations.size < mines) {
    const location = Math.floor(Math.random() * 25);
    mineLocations.add(location);
    board[location] = "BOMB";
  }

  /* 
    board         - board showing locations of diamonds and mines, flattened to 1D array.
    mines         - the number of mines set in this game.
    selected      - boolean 1D array showing which locations are selected.
    mineLocations - 1D array with the indices where mines are located
    bet           - the original bet value
    prizeRate     - the increase rate of bet, increases for more diamonds revealed
    active        - true if game is currently active.
  */
  const dbEntry = {
    board,
    mines,
    selected: [],
    mineLocations: Array.from(mineLocations),
    bet,
    prizeRate: 1,
    active: true,
  };
  await addDoc(collection(db, "mines"), dbEntry);
  return NextResponse.json(dbEntry, { status: 200 });
}
