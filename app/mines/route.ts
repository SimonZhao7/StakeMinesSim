import { NextResponse } from "next/server";
// Firebase
import { db } from "@/firebase";
import { doc, addDoc, collection, getDoc, updateDoc } from "firebase/firestore";
// Types
import { User } from "../types";
import { BoardEntry, AnswerEntry } from "./types";

type PostRequestBody = {
  mines: number;
  bet: number;
};

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (authHeader === null) {
    return NextResponse.json(
      { message: `No auth token provided` },
      { status: 400 }
    );
  }

  const uid = authHeader.split(" ")[1];
  const userRef = await getDoc(doc(db, "users", uid));

  if (!uid || !userRef.exists()) {
    return NextResponse.json(
      {
        message:
          "Invalid authentication token. " +
          `Set the Authorization header to the value "Token {token}"`,
      },
      { status: 400 }
    );
  }

  const user = { id: userRef.id, ...userRef.data() } as User;
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

  if (user.balance < bet) {
    return NextResponse.json({ message: "Insufficient balance." });
  }

  if (mines <= 0 || mines >= 25) {
    return NextResponse.json(
      { message: `Invalid value for key "mines" ${mines}` },
      { status: 400 }
    );
  }

  const board = new Array<BoardEntry>(25).fill("DIAMOND");
  const selected = new Array<AnswerEntry>(25).fill("UNDEF");

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
    user: user.id,
  };
  const ref = await addDoc(collection(db, "mines"), { board, ...dbEntry });
  await updateDoc(userRef.ref, {
    balance: +(user.balance - bet).toFixed(2),
  });
  return NextResponse.json({ id: ref.id, ...dbEntry }, { status: 200 });
}
