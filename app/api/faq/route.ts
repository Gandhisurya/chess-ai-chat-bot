import { NextResponse } from "next/server";
import connectDB from "@/db/db";
import { embData } from "@/db/AiModel";
import { Faq } from "@/db/schema/faq.schema";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { question, answer, userId } = await req.json();
    await connectDB();

    const Text = `Question : ${question} /n
    Answer : ${answer}
    `;
    const result = await embData(Text);

    const faq = await Faq.create({
      question: question,
      answer: answer,
      embeddings: result.embedding,
      userId: userId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Faq error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
