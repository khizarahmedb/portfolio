"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { useMemo, useState, useEffect } from "react";

const PRESET_QA = [
  {
    question: "What kind of developer is Khizar?",
    answer:
      "I’m a product-focused full-stack developer who ships fast, reliable web apps and loves clean architecture.",
  },
  {
    question: "Which projects should I check out?",
    answer:
      "Start with the real-time collaboration suite and the AI onboarding platform. See more at <a class='underline text-zinc-100' href='/projects'>Projects</a>.",
  },
  {
    question: "What’s Khizar’s recent experience?",
    answer:
      "Recently led a platform rebuild, improved API latency by 42%, and mentored two junior engineers. Full timeline on <a class='underline text-zinc-100' href='/experience'>Experience</a>.",
  },
  {
    question: "What skills stand out?",
    answer:
      "React, Next.js, TypeScript, Node, SQL, and cloud-native delivery. Full list on <a class='underline text-zinc-100' href='/skills'>Skills</a>.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Email is best for quick replies. See <a class='underline text-zinc-100' href='/contact'>Contact</a> for details.",
  },
];

const MAX_MESSAGES = 40;

type ChatMessage = UIMessage<{ isHtml?: boolean }>;

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatError = (error: Error) => {
  const message = error.message.toLowerCase();

  if (message.includes("rate") || message.includes("429")) {
    return "Rate limit reached. Please wait a bit and try again.";
  }

  if (message.includes("timeout")) {
    return "Response timed out. Please try again.";
  }

  return "Something went wrong. Please try again.";
};

export default function ChatPanel() {
  const initialMessages: ChatMessage[] = [
    {
      id: createMessageId(),
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hi! I’m Khizar’s portfolio assistant. Ask anything about projects, skills, or experience.",
        },
      ],
    },
  ];

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { messages, setMessages, sendMessage, status, error } = useChat<ChatMessage>({
    transport: new DefaultChatTransport<ChatMessage>({ api: "/api/chat" }),
    messages: initialMessages,
    onError: (err) => setErrorMessage(formatError(err)),
    onFinish: () => setErrorMessage(null),
  });

  const [input, setInput] = useState("");
  const isLoading = status !== "ready";

  useEffect(() => {
    if (!error) return;
    setErrorMessage(formatError(error));
  }, [error]);

  const presetMap = useMemo(() => {
    return new Map(
      PRESET_QA.map((item) => [item.question.toLowerCase(), item.answer])
    );
  }, []);

  const isLimitReached = messages.length >= MAX_MESSAGES;

  const handlePreset = (question: string) => {
    if (isLoading || isLimitReached) return;
    const answer = presetMap.get(question.toLowerCase());
    if (!answer) return;
    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        id: createMessageId(),
        role: "user",
        parts: [{ type: "text", text: question }],
      },
      {
        id: createMessageId(),
        role: "assistant",
        parts: [{ type: "text", text: answer }],
        metadata: { isHtml: true },
      },
    ];
    setMessages(nextMessages);
    setInput("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLimitReached || isLoading) return;

    const presetAnswer = presetMap.get(trimmed.toLowerCase());
    if (presetAnswer) {
      const nextMessages: ChatMessage[] = [
        ...messages,
        {
          id: createMessageId(),
          role: "user",
          parts: [{ type: "text", text: trimmed }],
        },
        {
          id: createMessageId(),
          role: "assistant",
          parts: [{ type: "text", text: presetAnswer }],
          metadata: { isHtml: true },
        },
      ];
      setMessages(nextMessages);
      setInput("");
      return;
    }

    setInput("");
    await sendMessage({ text: trimmed });
  };

  const showGreeting = messages.length <= 1;

  return (
    <section className="flex h-[calc(100vh-160px)] flex-col gap-4">
      {showGreeting ? (
        <header className="border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-400">
          <div className="flex items-center justify-between">
            <span># Greeting and quick check-in</span>
            <span>{messages.length} / {MAX_MESSAGES}</span>
          </div>
          <p className="mt-2 text-xs text-zinc-300">Hi! How can I help today?</p>
        </header>
      ) : null}

      <div className="flex-1 space-y-3 overflow-y-auto border border-zinc-800 bg-zinc-950/60 p-3">
        {errorMessage ? (
          <div className="border-l-2 border-red-500 bg-zinc-900 px-3 py-2 text-xs text-red-200">
            {errorMessage}
          </div>
        ) : null}
        {messages.map((message) => {
          const text = message.parts
            ?.filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("")
            .trim();

          return (
            <div
              key={message.id}
              className={`border-l-2 px-3 py-2 text-xs leading-relaxed ${
                message.role === "user"
                  ? "border-purple-500 bg-zinc-900 text-purple-200"
                  : "border-cyan-500 bg-zinc-950 text-zinc-200"
              }`}
            >
              <div className="text-[11px] text-zinc-500">
                {message.role === "user" ? "> question" : "• answer"}
              </div>
              {message.metadata?.isHtml ? (
                <div
                  className="space-y-2 text-zinc-200"
                  dangerouslySetInnerHTML={{ __html: text ?? "" }}
                />
              ) : (
                <p>{text}</p>
              )}
            </div>
          );
        })}

      </div>

      <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
        {PRESET_QA.map((item) => (
          <button
            key={item.question}
            type="button"
            onClick={() => handlePreset(item.question)}
            className="border border-zinc-800 px-2 py-1 text-xs text-zinc-300 transition hover:border-purple-500 hover:text-purple-200"
          >
            {item.question}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-2">
        <div className="border border-zinc-800 bg-zinc-950 px-3 py-2">
          <div className="text-xs text-zinc-500">$ ask</div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              isLimitReached
                ? "Chat limit reached. Refresh to start again."
                : "Ask about recent work, stack choices, or impact metrics..."
            }
            className="h-20 w-full resize-none bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-600"
            disabled={isLoading || isLimitReached}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>
            {isLimitReached
              ? "Limit reached to prevent abuse."
              : "Responses are AI-generated; verify critical details."}
          </span>
          <button
            type="submit"
            disabled={isLoading || isLimitReached}
            className="border border-zinc-700 px-3 py-1 text-[11px] text-zinc-200 transition hover:border-purple-500 hover:text-purple-200 disabled:cursor-not-allowed disabled:text-zinc-600"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
