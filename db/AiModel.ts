import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import {
  Annotation,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { Faq } from "./schema/faq.schema";
import cosineSimilarity from "cosine-similarity";

const geminiApi = process.env.NEXT_GEMINI;
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: geminiApi,
});

export const embData = async (text: string) => {
  const data = await embeddings.embedQuery(text);
  return { text: text, embedding: data };
};

const model = new ChatGoogleGenerativeAI({
  apiKey: geminiApi,
  temperature: 0.5,
  model: "gemini-2.0-flash-exp",
});

const StateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  isChessRelated: Annotation<boolean>(),
  threadId: Annotation<string>(),
  next: Annotation<string>(),
});

const init = async (State: typeof StateAnnotation.State) => {
  const IdentifierPrompt = `You are a classifier that determines whether a given message is related to chess or not.  
- If the message is about chess, respond with **"Chess"**.  
- If the message is not about chess, respond with **"Respond"**`;
  const response = await model.invoke([
    { role: "system", content: IdentifierPrompt },
    ...State.messages,
  ]);

  const classification = String(response.content).trim().toLowerCase();
  return {
    ...State,
    isChessRelated: classification === "chess" ? true : false,
  };
};

const responser = async (State: typeof StateAnnotation.State) => {
  const Prompt = `You are an AI assistant that answers Not chess-related questions with precise and accurate information.Please tell them to Ask the Question Chess related Question`;
  const response = await model.invoke([
    { role: "system", content: Prompt },
    ...State.messages,
  ]);
  return {
    ...State,
    messages: [
      ...State.messages,
      { role: "assistant", content: response.content },
    ],
  };
};

const Chessresponder = async (state: typeof StateAnnotation.State) => {
  let Prompt = `You are an AI assistant that answers chess-related questions with precise and accurate information.  
  If the question is related to chess, provide a detailed and helpful response.  
  If the question is not related to chess, respond with: **"I can only answer chess-related questions."**  
  If the question is unclear, respond with: **"I'm sorry, I don't understand the question. Please ask a chess-related question."**`;

  const lastMessage = state.messages[state.messages.length - 1];

  const embQuery = await embData(String(lastMessage.content));
  if (!embQuery?.embedding) {
    return {
      ...state,
      messages: [
        ...state.messages,
        {
          role: "assistant",
          content: "I couldn't process your question. Try again.",
        },
      ],
    };
  }

  const faqs = await Faq.find(
    { userId: state.threadId },
    { embeddings: 1, question: 1, answer: 1 }
  ).lean();

  let bestMatch = null;
  let bestScore = -1;

  for (const faq of faqs) {
    const similarity = cosineSimilarity(embQuery.embedding, faq.embeddings);
    if (similarity > bestScore) {
      bestScore = similarity;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore > 0.5) {
    Prompt = `Use the following related information to generate a response:  
    **Question:** ${bestMatch.question}  
    **Answer:** ${bestMatch.answer}  
  
    If the user’s question is directly related, respond using the provided answer.  
    If clarification is needed, expand upon the provided answer while staying relevant to the topic.`;

    const response = await model.invoke([
      { role: "system", content: Prompt },
      ...state.messages,
    ]);

    return {
      ...state,
      messages: [
        ...state.messages,
        { role: "assistant", content: response?.content || bestMatch?.answer },
      ],
    };
  } else {
    const response = await model.invoke([
      { role: "system", content: Prompt },
      ...state.messages,
    ]);

    return {
      ...state,
      messages: [
        ...state.messages,
        { role: "assistant", content: response.content },
      ],
    };
  }
};

const init_Router = (state: typeof StateAnnotation.State) => {
  return state.isChessRelated ? "Chessresponder" : "responder";
};

const builder = new StateGraph(StateAnnotation)
  .addNode("initial_support", init)
  .addNode("Chessresponder", Chessresponder)
  .addNode("responder", responser)
  .addEdge("__start__", "initial_support")
  .addConditionalEdges("initial_support", init_Router, {
    Chessresponder: "Chessresponder",
    responder: "responder",
  });

const checkpointer = new MemorySaver();

export const graph = builder.compile({
  checkpointer,
});
