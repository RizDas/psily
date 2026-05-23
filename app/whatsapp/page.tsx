"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
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
  const [isDark, setIsDark] = useState(false);
  const [currentUser, setCurrentUser] = useState("Manushree");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "links">("chat");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [stickyDate, setStickyDate] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const searchResultRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const dateHeaderRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  useLayoutEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  // Calculate derived variables
  const grouped = groupByDate(messages);
  const senders = Array.from(
    new Set(messages.filter((m) => !m.isSystemMessage).map((m) => m.sender)),
  );

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredMessages = normalizedSearchQuery
    ? messages.filter((m) => {
        const formattedDate = formatDate(m.date).toLowerCase();
        return (
          m.content.toLowerCase().includes(normalizedSearchQuery) ||
          m.sender.toLowerCase().includes(normalizedSearchQuery) ||
          m.date.toLowerCase().includes(normalizedSearchQuery) ||
          formattedDate.includes(normalizedSearchQuery)
        );
      })
    : messages;

  const currentSearchResultId =
    searchQuery && filteredMessages.length > 0
      ? filteredMessages[searchIndex]?.id
      : -1;

  const linkPattern = /\b(?:https?:\/\/|www\.)[^\s<>]+/gi;
  const linkMessages = messages.filter((msg) => {
    if (msg.isSystemMessage) return false;
    return Boolean(msg.content.match(linkPattern));
  });
  const groupedLinkMessages = groupByDate(linkMessages);
  const linkMessageCount = linkMessages.length;

  useEffect(() => {
    if (searchQuery && filteredMessages.length > 0) {
      const searchResultMsg = filteredMessages[searchIndex];
      const isDateMatch = searchResultMsg
        ? searchResultMsg.date.toLowerCase().includes(normalizedSearchQuery) ||
          formatDate(searchResultMsg.date)
            .toLowerCase()
            .includes(normalizedSearchQuery)
        : false;
      const element = isDateMatch
        ? dateHeaderRefs.current.get(searchResultMsg.date)
        : searchResultRefs.current.get(searchResultMsg.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchIndex, searchQuery, filteredMessages, normalizedSearchQuery]);

  useEffect(() => {
    if (messages.length === 0) return;
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
      setIsAtBottom(true);
    }
    setStickyDate(messages[0]?.date ?? "");
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      setIsAtBottom(isBottom);

      const containerRect = container.getBoundingClientRect();
      let currentDate = "";
      dateHeaderRefs.current.forEach((el, date) => {
        const top = el.getBoundingClientRect().top - containerRect.top;
        if (top <= 10) {
          currentDate = date;
        }
      });

      if (!currentDate && messages.length > 0) {
        currentDate = messages[0].date;
      }
      setStickyDate(currentDate);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
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

  function renderMessageText(text: string) {
    const urlPattern = /\b(?:https?:\/\/|www\.)[^\s<>]+/i;
    const parts = text.split(/(\b(?:https?:\/\/|www\.)[^\s<>]+)/gi);

    return parts.map((part, index) => {
      if (!part) return null;
      const isUrl = urlPattern.test(part);

      if (isUrl) {
        const href = part.startsWith("www.") ? `https://${part}` : part;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2f8b5a] underline decoration-[#2f8b5a] hover:text-[#196b45]"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  }

  function parseMessageStatus(text: string) {
    const editedPattern =
      /\s*(?:<\s*this message was edited\s*>|\(?edited\)?)\s*$/i;
    const deletedPattern =
      /\s*(?:<\s*this message was deleted\s*>|this message was deleted)\s*$/i;

    let displayText = text;
    let edited = false;
    let deleted = false;

    if (editedPattern.test(displayText)) {
      edited = true;
      displayText = displayText.replace(editedPattern, "").trim();
    }

    if (deletedPattern.test(displayText)) {
      deleted = true;
      displayText = displayText.replace(deletedPattern, "").trim();
    }

    return { displayText, edited, deleted };
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

  const bgColor = isDark ? "bg-[#0b141a]" : "bg-transparent";
  const headerBgColor = isDark ? "bg-[#111b21]/95" : "bg-white/95";
  const headerBorderColor = isDark ? "border-[#111b21]" : "border-[#d1d5db]";
  const messageBgLeft = isDark ? "bg-[#2f343b]" : "bg-white";
  const messageTextLeft = isDark ? "text-[#d1d5db]" : "text-[#111827]";
  const messageBgRight = isDark ? "bg-[#054640]" : "bg-[#a9feb3]";
  const messageTextRight = isDark ? "text-white" : "text-[#111827]";
  const textColor = isDark ? "text-white" : "text-[#111827]";
  const secondaryTextColor = isDark ? "text-[#bdc3c8]" : "text-[#657786]";

  return (
    <div
      className={`h-screen relative w-full max-w-full ${bgColor} flex flex-col overflow-x-hidden ${roboto.className}`}
      style={{
        overflowX: "hidden",
        backgroundImage: `url(${isDark ? "/whatsapp-dark.png" : "/whatsapp-light.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <header
        className={`${headerBgColor} px-4 py-3 flex items-center gap-3 border-b ${headerBorderColor} absolute top-0 left-0 right-0 z-30`}
      >
        <div className="w-11 h-11 sm:w-10 sm:h-10 relative rounded-full overflow-hidden bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
          {otherUser === "Rishabh Das" ? (
            <Image
              src="/rishabhdas.jpeg"
              alt="Rishabh Das"
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : otherUser === "Manushree" ? (
            <Image
              src="/manushree.png"
              alt="Manushree"
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            otherUser[0]?.toUpperCase() || "?"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className={`${textColor} font-medium text-sm truncate`}>
            {otherUser}
          </h1>
          <p className={`${secondaryTextColor} text-xs`}>
            last seen today at 20:24
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setActiveTab(activeTab === "links" ? "chat" : "links")
            }
            className={`p-2 rounded-full transition ${
              activeTab === "links"
                ? "bg-[#25d366] text-white"
                : isDark
                  ? "bg-[#1f2a31] text-white/90 hover:bg-[#25303a]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={activeTab === "links" ? "Back to chat" : "Links"}
          >
            <FolderCopyOutlinedIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSearchBar(true)}
            className={`p-2 rounded-full transition ${
              isDark
                ? "bg-[#1f2a31] text-white/90 hover:bg-[#25303a]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Search messages"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition ${
              isDark
                ? "bg-[#1f2a31] text-yellow-400 hover:bg-[#25303a]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Toggle theme"
          >
            {isDark ? (
              <LightModeIcon className="w-5 h-5" />
            ) : (
              <DarkModeIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() =>
              setCurrentUser(
                currentUser === "Rishabh Das" ? "Manushree" : "Rishabh Das",
              )
            }
            className={`p-2 rounded-full transition ${
              isDark
                ? "bg-[#1f2a31] text-white/90 hover:bg-[#25303a]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Switch perspective"
          >
            <SwitchAccountIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      {activeTab === "chat" && showSearchBar && (
        <div
          className={`mt-16 ${headerBgColor} px-4 pb-3 border-b ${headerBorderColor} backdrop-blur-sm`}
        >
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full border ${isDark ? "border-[#1f2a31] bg-[#111b21]" : "border-[#d1d5db] bg-white"}`}
          >
            <SearchIcon className={`w-5 h-5 ${secondaryTextColor}`} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 text-sm outline-none ${isDark ? "bg-transparent text-white placeholder-[#8899a6]" : "bg-transparent text-gray-900 placeholder-gray-500"}`}
            />
            {searchQuery && filteredMessages.length > 0 && (
              <div className="flex items-center gap-1">
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
              </div>
            )}
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className={`text-sm font-medium ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}
              >
                Clear
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowSearchBar(false);
                  setSearchQuery("");
                }}
                className={`text-sm font-medium ${isDark ? "text-[#bdc3c8] hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "chat" ? (
        <div
          ref={messagesContainerRef}
          className={`flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-4 sm:py-5 pt-20 space-y-2 ${isDark ? "" : "bg-transparent"}`}
        >
          {stickyDate && (
            <div className="sticky top-0 z-20 flex justify-center pb-2 bg-transparent">
              <div
                className={`${isDark ? "bg-[#202c33] text-[#8696a0]" : "bg-gray-300 text-gray-700"} text-xs px-3 py-1 rounded-full shadow-sm`}
              >
                {formatDate(stickyDate)}
              </div>
            </div>
          )}
          {Array.from(grouped.entries()).map(([date, msgs]) => (
            <div key={date}>
              {/* Date separator */}
              <div className="flex justify-center my-4">
                <div
                  ref={(el) => {
                    if (el) {
                      dateHeaderRefs.current.set(date, el);
                    } else {
                      dateHeaderRefs.current.delete(date);
                    }
                  }}
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
                        className={`${isDark ? "bg-[#1c2428] text-[#b0b8c0]" : "bg-[#f2f3f5] text-[#6b7280]"} text-xs px-3 py-1 rounded-lg max-w-[85%] sm:max-w-sm text-center`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                const isSent = msg.sender === currentUser;
                const isCurrentSearchResult =
                  searchQuery && msg.id === currentSearchResultId;
                const {
                  displayText: rawDisplayText,
                  edited,
                  deleted,
                } = parseMessageStatus(msg.content);
                const displayText = deleted
                  ? isSent
                    ? "You deleted this message"
                    : "This message was deleted"
                  : rawDisplayText;

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
                      className={`max-w-[85%] sm:max-w-xs min-w-0 overflow-hidden px-3 py-2 rounded-xl transition-all ${
                        isCurrentSearchResult
                          ? "ring-2 ring-yellow-400 shadow-lg"
                          : ""
                      } ${
                        isSent
                          ? `${messageBgRight} ${messageTextRight} rounded-br-none`
                          : `${messageBgLeft} ${messageTextLeft} rounded-bl-none`
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm break-all whitespace-pre-wrap leading-5 w-full overflow-hidden">
                        {deleted && (
                          <DoNotDisturbIcon
                            className={`w-4 h-4 ${isDark ? "text-[#8696a0]" : "text-gray-500"}`}
                          />
                        )}
                        <span
                          className={`${deleted ? (isDark ? "text-[#d1d5d9]" : "text-[#374151]") : ""} break-all`}
                        >
                          {deleted
                            ? displayText
                            : renderMessageText(displayText)}
                        </span>
                      </div>
                      <div className="flex justify-end items-center gap-1 mt-0.5">
                        {edited && (
                          <span
                            className={`text-[10px] ${isDark ? "text-[#8696a0]" : "text-gray-500"}`}
                          >
                            Edited
                          </span>
                        )}
                        <span
                          className={`text-[10px] ${isDark ? "text-[#8696a0]" : "text-gray-500"}`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={messagesContainerRef}
          className={`flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-4 sm:py-5 ${isDark ? "" : "bg-transparent"}`}
        >
          <div className="mb-4">
            <div
              className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Links
            </div>
            <p className={`text-xs ${secondaryTextColor}`}>
              {linkMessageCount} message{linkMessageCount === 1 ? "" : "s"} with
              links
            </p>
          </div>
          {linkMessageCount === 0 ? (
            <div
              className={`rounded-2xl p-6 text-center ${
                isDark
                  ? "bg-[#202c33] text-[#8696a0]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              No link-containing messages found.
            </div>
          ) : (
            <div className="space-y-2">
              {Array.from(groupedLinkMessages.entries()).map(([date, msgs]) => (
                <div key={date}>
                  <div className="flex justify-center my-4">
                    <div
                      className={`${isDark ? "bg-[#202c33] text-[#8696a0]" : "bg-gray-300 text-gray-700"} text-xs px-3 py-1 rounded-full`}
                    >
                      {formatDate(date)}
                    </div>
                  </div>
                  {msgs.map((msg) => {
                    const isSent = msg.sender === currentUser;
                    return (
                      <div
                        key={msg.id}
                        className={`flex mb-2 ${isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-xs px-3 py-2 rounded-lg ${
                            isSent
                              ? `${messageBgRight} text-white rounded-br-none`
                              : `${messageBgLeft} ${isDark ? "text-white" : "text-gray-900"} rounded-bl-none`
                          }`}
                        >
                          <p className="text-sm wrap-break-word whitespace-pre-wrap">
                            {renderMessageText(msg.content)}
                          </p>
                          <div
                            className={`mt-2 text-[10px] ${secondaryTextColor}`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scroll to Bottom Button */}
      {activeTab === "chat" && !isAtBottom && (
        <button
          onClick={() => {
            const container = messagesContainerRef.current;
            if (container) {
              container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25d366] hover:bg-[#1fa755] text-white flex items-center justify-center shadow-lg transition-all active:scale-95"
          title="Scroll to bottom"
          aria-label="Scroll to bottom"
        >
          <KeyboardArrowDownIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Footer */}
      {activeTab === "chat" && (
        <footer
          className={`${headerBgColor} px-3 sm:px-4 py-3 flex items-center gap-2 border-t ${isDark ? "border-[#202c33]" : "border-gray-300"}`}
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
      )}
    </div>
  );
}
