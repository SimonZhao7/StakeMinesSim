import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
// Types
import { AnswerEntry, MineGameRes } from "../types";
// Firebase
import { db } from "@/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const factorial = [1];
let prod = 1;
for (let i = 1; i <= 25; i++) {
  prod *= i;
  factorial.push(prod);
}

const nCr = (n: number, r: number) => {
  return factorial[n] / (factorial[r] * factorial[n - r]);
};

export async function POST(request: Request, context: { params: Params }) {
  const { id } = context.params;
  const body = await request.json();

  const minesDoc = await getDoc(doc(db, "mines", id));

  if (!minesDoc.exists()) {
    return NextResponse.json(
      { message: `Mines game does not exist with id ${id}` },
      { status: 404 }
    );
  }

  if (body.row === undefined) {
    return NextResponse.json(
      { message: `Missing value for key "row"` },
      { status: 400 }
    );
  }

  if (body.col === undefined) {
    return NextResponse.json(
      { message: `Missing value for key "col"` },
      { status: 400 }
    );
  }

  const { row, col } = body;
  const { board, selected, mines } = minesDoc.data();
  const idx = 5 * row + col;

  if (selected[idx] !== "UNDEF") {
    return NextResponse.json(
      { message: `Row, column pair already selected.` },
      { status: 400 }
    );
  }

  selected[idx] = board[idx];

  const diamondsObtained = selected.filter(
    (v: AnswerEntry) => v === "DIAMOND"
  ).length;

  const newRate =
    board[idx] === "DIAMOND"
      ? (0.99 * nCr(25, diamondsObtained)) / nCr(25 - mines, diamondsObtained)
      : 0;

  const updateData: MineGameRes = {
    prizeRate: newRate,
    selected,
  };

  const responseData: MineGameRes = { ...minesDoc.data(), ...updateData };
  delete responseData.board;
  
  await updateDoc(minesDoc.ref, updateData);
  return NextResponse.json({ id: minesDoc.id, ...responseData }, { status: 200 });
}
