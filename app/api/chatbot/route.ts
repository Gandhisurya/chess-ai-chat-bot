import { NextResponse } from "next/server";
import connectDB from "@/db/db";
import { Message } from "@/db/schema/message.schema";
import { graph } from "@/db/AiModel";
import { v4 as uuid } from "uuid";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { messages, userId, userMessage, refId } = await req.json();
    await connectDB();

    const result = await graph.invoke(
      {
        messages: messages,
        threadId: userId,
      },
      { configurable: { thread_id: userId } }
    );

    const lastMessage = result.messages[result.messages.length - 1];

    const messagesToInsert = [
      {
        message: userMessage,
        isChessRelated: result.isChessRelated,
        userId: refId,
        messageId: uuid(),
        messageType: "USER",
      },
      {
        message: { role: "assistant", content: lastMessage.content },
        isChessRelated: result.isChessRelated,
        userId: refId,
        messageId: lastMessage?.id || uuid(),
        messageType: "AI",
      },
    ];

    await Message.insertMany(messagesToInsert);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
