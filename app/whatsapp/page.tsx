"use client";

import { useEffect, useRef, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface Message {
  id: number;
  date: string;
  time: string;
  sender: string;
  content: string;
  isSystemMessage: boolean;
}

export default function WhatsAppPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [currentUser, setCurrentUser] = useState("Manushree");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const searchResultRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetch("/whatsapp.txt");
        if (!response.ok) throw new Error("Failed to load chat file");

        const text = await response.text();
        const parsed = parseWhatsAppChat(text);
        console.log("Parsed messages:", parsed.length);
        setMessages(parsed);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  useEffect(() => {
    setSearchIndex(0);
  }, [searchQuery]);

  // Calculate derived variables
  const grouped = groupByDate(messages);
  const senders = Array.from(
    new Set(messages.filter((m) => !m.isSystemMessage).map((m) => m.sender)),
  );

  const filteredMessages = searchQuery.trim()
    ? messages.filter(
        (m) =>
          m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.sender.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : messages;

  const currentSearchResultId =
    searchQuery && filteredMessages.length > 0
      ? filteredMessages[searchIndex]?.id
      : -1;

  useEffect(() => {
    if (searchQuery && filteredMessages.length > 0) {
      const searchResultId = filteredMessages[searchIndex]?.id;
      const element = searchResultRefs.current.get(searchResultId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [searchIndex, searchQuery, filteredMessages]);

  useEffect(() => {
    if (messages.length === 0) return;
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  function parseWhatsAppChat(text: string): Message[] {
    const lines = text.split("\n");
    const messages: Message[] = [];
    let messageId = 0;

    // Format: DD/MM/YY, HH:MM - [Sender:] Message
    const lineRegex = /^(\d{2}\/\d{2}\/\d{2}),\s(\d{2}:\d{2})\s-\s(.+)$/;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const match = trimmed.match(lineRegex);
      if (!match) continue;

      const [, date, time, rest] = match;

      // Try to extract sender and message
      const colonIndex = rest.indexOf(":");
      let sender = "";
      let content = rest;
      let isSystemMessage = false;

      if (colonIndex !== -1) {
        // Has a colon, so it's a regular message with a sender
        sender = rest.substring(0, colonIndex).trim();
        content = rest.substring(colonIndex + 1).trim();
      } else {
        // No colon, it's a system message
        isSystemMessage = true;
        sender = "System";
        content = rest;
      }

      messages.push({
        id: messageId++,
        date,
        time,
        sender,
        content,
        isSystemMessage,
      });
    }

    return messages;
  }

  function formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split("/");
    const fullYear = parseInt(year) > 50 ? `19${year}` : `20${year}`;
    const date = new Date(`${fullYear}-${month}-${day}`);

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "TODAY";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "YESTERDAY";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  function groupByDate(messages: Message[]): Map<string, Message[]> {
    const grouped = new Map<string, Message[]>();
    messages.forEach((msg) => {
      if (!grouped.has(msg.date)) {
        grouped.set(msg.date, []);
      }
      grouped.get(msg.date)!.push(msg);
    });
    return grouped;
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#0b141a] flex items-center justify-center">
        <p className="text-white">Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-[#0b141a] flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-screen bg-[#0b141a] flex items-center justify-center">
        <p className="text-[#8696a0]">No messages found</p>
      </div>
    );
  }

  const handleNextResult = () => {
    if (filteredMessages.length > 0) {
      setSearchIndex((prev) => (prev + 1) % filteredMessages.length);
    }
  };

  const handlePrevResult = () => {
    if (filteredMessages.length > 0) {
      setSearchIndex(
        (prev) =>
          (prev - 1 + filteredMessages.length) % filteredMessages.length,
      );
    }
  };

  const otherUser = senders.find((s) => s !== currentUser) || "Chat";

  const bgColor = isDark ? "bg-[#0b141a]" : "bg-white";
  const headerBgColor = isDark ? "bg-[#202c33]" : "bg-gray-100";
  const messageBgLeft = isDark ? "bg-[#202c33]" : "bg-gray-300";
  const messageBgRight = isDark ? "bg-[#005c4b]" : "bg-green-600";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const secondaryTextColor = isDark ? "text-[#8696a0]" : "text-gray-600";

  return (
    <div className={`h-screen ${bgColor} flex flex-col ${roboto.className}`}>
      {/* Header */}
      <header
        className={`${headerBgColor} px-4 py-3 flex items-center gap-3 border-b ${isDark ? "border-[#202c33]" : "border-gray-300"}`}
      >
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
          {otherUser[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex-1">
          <h1 className={`${textColor} font-medium text-sm`}>{otherUser}</h1>
          <p className={`${secondaryTextColor} text-xs`}>Active now</p>
        </div>
        {/* Toggle Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition ${
              isDark
                ? "bg-[#2a3942] text-yellow-400 hover:bg-[#3a4952]"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            title="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          {/* Perspective Toggle */}
          <button
            onClick={() =>
              setCurrentUser(
                currentUser === "Rishabh Das" ? "Manushree" : "Rishabh Das",
              )
            }
            className={`p-2 rounded-lg transition ${
              isDark
                ? "bg-[#2a3942] text-cyan-400 hover:bg-[#3a4952]"
                : "bg-gray-200 text-cyan-600 hover:bg-gray-300"
            }`}
            title="Switch perspective"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.5 3.5a6 6 0 1 1 8.999 9.999H7.5m6-3.499l3.5 3.5m-3.5-3.5l-3.5-3.5M17.5 20.5a6 6 0 1 1 8.999-9.999H17.5m6 3.499l3.5-3.5m-3.5 3.5l-3.5 3.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div
        className={`${headerBgColor} px-4 py-2 border-b ${isDark ? "border-[#202c33]" : "border-gray-300"}`}
      >
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-full ${isDark ? "bg-[#2a3942]" : "bg-gray-300"}`}
        >
          <svg
            className={`w-5 h-5 ${secondaryTextColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 outline-none text-sm ${isDark ? "bg-[#2a3942] text-white placeholder-[#8696a0]" : "bg-gray-300 text-gray-900 placeholder-gray-600"}`}
          />
          {searchQuery && filteredMessages.length > 0 && (
            <>
              <span className={`text-xs ${secondaryTextColor}`}>
                {searchIndex + 1} / {filteredMessages.length}
              </span>
              <button
                onClick={handlePrevResult}
                className={`p-1 rounded transition ${isDark ? "text-[#8696a0] hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                title="Previous result"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={handleNextResult}
                className={`p-1 rounded transition ${isDark ? "text-[#8696a0] hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                title="Next result"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </>
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={`text-sm font-medium ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className={`flex-1 overflow-y-auto px-4 py-4 space-y-2 ${isDark ? "" : "bg-gray-50"}`}
      >
        {Array.from(grouped.entries()).map(([date, msgs]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex justify-center my-4">
              <div
                className={`${isDark ? "bg-[#202c33] text-[#8696a0]" : "bg-gray-300 text-gray-700"} text-xs px-3 py-1 rounded-full`}
              >
                {formatDate(date)}
              </div>
            </div>

            {/* Messages */}
            {msgs.map((msg) => {
              if (msg.isSystemMessage) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div
                      className={`${isDark ? "bg-[#202c33] text-[#8696a0]" : "bg-gray-300 text-gray-700"} text-xs px-3 py-1 rounded-lg max-w-sm text-center`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              }

              const isSent = msg.sender === currentUser;
              const isCurrentSearchResult =
                searchQuery && msg.id === currentSearchResultId;

              return (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${
                    isSent ? "justify-end" : "justify-start"
                  }`}
                  ref={(el) => {
                    if (el && isCurrentSearchResult) {
                      searchResultRefs.current.set(msg.id, el);
                    }
                  }}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg transition-all ${
                      isCurrentSearchResult
                        ? "ring-2 ring-yellow-400 shadow-lg"
                        : ""
                    } ${
                      isSent
                        ? `${messageBgRight} text-white rounded-br-none`
                        : `${messageBgLeft} ${isDark ? "text-white" : "text-gray-900"} rounded-bl-none`
                    }`}
                  >
                    <p className="text-sm wrap-break-word whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span
                        className={`text-[10px] ${isDark ? "text-[#8696a0]" : "text-gray-600"}`}
                      >
                        {msg.time}
                      </span>
                      {isSent && (
                        <svg
                          className={`w-3 h-3 ${isDark ? "text-[#53bdeb]" : "text-cyan-400"}`}
                          fill="currentColor"
                          viewBox="0 0 16 15"
                        >
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className={`${headerBgColor} px-4 py-3 flex items-center gap-2 border-t ${isDark ? "border-[#202c33]" : "border-gray-300"}`}
      >
        <button
          className={`${secondaryTextColor} transition ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Type a message"
          className={`flex-1 text-sm px-4 py-2 rounded-full outline-none ${
            isDark
              ? "bg-[#2a3942] text-white placeholder-[#8696a0]"
              : "bg-gray-300 text-gray-900 placeholder-gray-600"
          }`}
          disabled
        />
        <button
          className={`${secondaryTextColor} transition ${isDark ? "hover:text-white" : "hover:text-gray-900"}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.9429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.01449848 C3.50612381,-0.1 2.40987166,-0.1 1.77946707,0.52 C0.994623095,1.13399899 0.837654326,2.22661825 1.15159189,3.01211575 L3.03521743,9.45310871 C3.03521743,9.61020505 3.19218622,9.76730139 3.50612381,9.76730139 L16.6915026,10.5527883 C16.6915026,10.5527883 17.1624089,10.5527883 17.1624089,10.0814961 L17.1624089,11.1741346 C17.1624089,11.1741346 17.1624089,10.5527883 16.6915026,10.5527883 Z" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
