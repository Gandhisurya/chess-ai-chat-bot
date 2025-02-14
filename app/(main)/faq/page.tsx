"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import axios from "axios";
import { useUser } from "@/hooks/user.hook";

const FAQPage = () => {
  const { user } = useUser();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/faq", {
      question,
      answer,
      userId: user?.userId,
    });
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8 flex items-center gap-2">
        <HelpCircle className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Add New FAQ</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <label
              htmlFor="question"
              className="text-sm font-medium text-foreground"
            >
              Question
            </label>
            <Input
              id="question"
              placeholder="Enter the FAQ question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="answer"
              className="text-sm font-medium text-foreground"
            >
              Answer
            </label>
            <Textarea
              id="answer"
              placeholder="Enter the answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add FAQ</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FAQPage;
