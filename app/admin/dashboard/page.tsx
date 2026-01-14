"use client";

import { useEffect, useState } from "react";

type Conversation = {
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
};

export default function AdminDashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const res = await fetch("/api/conversations");
        if (!res.ok) {
          throw new Error("Failed to fetch conversations");
        }

        const data = await res.json();
        setConversations(data.conversations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    setError(null);
    fetchConversations();
  }, []);

  return (
    <div className="border border-zinc-800 bg-zinc-950/60 px-4 py-6">
      <header className="border-b border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs text-zinc-400">
        <span># Admin Dashboard</span>
      </header>
      <main className="space-y-4">
        {loading ? (
          <p className="text-xs text-zinc-400">Loading conversations...</p>
        ) : error ? (
          <div className="border-l-2 border-red-500 bg-zinc-900 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.length === 0 ? (
              <p className="text-xs text-zinc-400">No conversations found.</p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.conversationId}
                  className="border border-zinc-800 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-xs">ID: {conv.conversationId}</span>
                    <span className="text-xs">
                      {new Date(conv.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="text-xs">
                      Updated: {new Date(conv.updatedAt).toLocaleString()}
                    </span>
                    <span className="text-xs">
                      {conv.messagesCount} messages
                    </span>
                  </div>
                  <a
                    href={`/api/conversations/${conv.conversationId}`}
                    className="block mt-2 border border-zinc-800 px-2 py-1 text-center text-xs text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    View conversation
                  </a>
                </div>
              ))
            )}
          </div>
        )}
        <form action="/admin/logout" method="POST">
          <button
            type="submit"
            className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800"
          >
            Logout
          </button>
        </form>
      </main>
    </div>
  );
}
