"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/hooks/user.hook";

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm a chess-focused AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const { data } = await axios.post(
          "/api/chatbot",
          {
            messages: [...messages, userMessage],
            userId: user?.userId,
            refId: user?.refId,
            userMessage: userMessage,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const lastMessage = data.messages[data.messages.length - 1];

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: lastMessage?.kwargs?.content },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 h-[calc(100vh-110px)] overflow-y-scroll">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2">Thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me about chess..."
            className="flex-1 rounded-md border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
