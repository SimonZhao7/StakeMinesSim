import { NextResponse } from "next/server";
// Types
import { BoardEntry, AnswerEntry } from "./types";
// Firebase
import { db } from "@/firebase";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";

type PostRequestBody = {
  mines: number;
  bet: number;
};

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

  const board = new Array<BoardEntry>(25).fill('DIAMOND');
  const selected = new Array<AnswerEntry>(25).fill('UNDEF');

  const mineLocations = new Set<number>();
  while (mineLocations.size < mines) {
    const location = Math.floor(Math.random() * 25);
    mineLocations.add(location);
    board[location] = "BOMB";
  }
 
  const dbEntry = {
    selected,
    mines,
    bet,
    prizeRate: 1,
    active: true,
  };
  const ref = await addDoc(collection(db, "mines"), { board, ...dbEntry });
  return NextResponse.json({ id: ref.id, ...dbEntry }, { status: 200 });
}
