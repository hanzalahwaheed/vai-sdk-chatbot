"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [showQuestions, setShowQuestions] = useState(true);

  const sampleQuestions = [
    "What is Next.js?",
    "Tell me about Vercel.",
    "How does the useChat API work?",
  ];

  const handleQuestionClick = (question: string) => {
    // Update the input value
    handleInputChange({
      target: { value: question },
    } as any);

    // Create a synthetic form event to simulate a form submission
    const event = new Event("submit", {
      bubbles: true,
      cancelable: true,
    }) as unknown as React.FormEvent;

    // Call handleSubmit to submit the form
    handleSubmit(event);

    // Hide the sample questions after one is clicked
    setShowQuestions(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(event);

    // Hide sample questions when form is submitted
    setShowQuestions(false);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <form onSubmit={handleFormSubmit}>
        {showQuestions && (
          <div className="mb-4 space-y-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuestionClick(question)}
                className="block w-full p-2 text-left border-neutral-100"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
