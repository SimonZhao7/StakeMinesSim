import { db } from "@/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { MineGame } from "../../play/types";
import { User } from "@/app/types";

export async function POST(request: Request, context: { params: Params }) {
  const { id } = context.params;

  const gameRef = await getDoc(doc(db, "mines", id));
  const auth = request.headers.get("Authorization");

  if (auth === null) {
    return NextResponse.json(
      { message: `No auth token provided` },
      { status: 400 }
    );
  }

  const uid = auth.split(" ")[1];
  const userRef = await getDoc(doc(db, "users", uid));

  if (!gameRef.exists()) {
    return NextResponse.json(
      { message: `No mine game with id: ${id}` },
      { status: 404 }
    );
  }

  if (!userRef.exists()) {
    return NextResponse.json(
      { message: `No user with id: ${uid}` },
      { status: 404 }
    );
  }

  const user = { id: userRef.id, ...userRef.data() } as User;
  const mineGame = { id: gameRef.id, ...gameRef.data() } as MineGame;
  const profit = mineGame.bet * mineGame.prizeRate;

  if (mineGame.user !== user.id) {
    return NextResponse.json(
      { message: `User ${id} has no access to specified mine game` },
      { status: 403 }
    );
  }

  await updateDoc(gameRef.ref, {
    active: false,
  });

  await updateDoc(userRef.ref, {
    balance: user.balance + +profit.toFixed(2),
  });
  return NextResponse.json({}, { status: 200 });
}
