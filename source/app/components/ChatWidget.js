"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const GREETING = {
  role: "bot",
  text: "Hi! Ask me anything about Sharif — experience, skills, certifications, education.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendQuestion(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      const text =
        data.found && data.answer
          ? data.answer
          : data.answer ||
            "I couldn't find that in the resume. Try asking about experience, skills, or certifications.";

      setMessages((prev) => [
        ...prev,
        { role: "bot", text, page: data.found ? data.page : null },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatWidget">
      {open && (
        <div className="chatPanel" role="dialog" aria-label="Ask about Sharif's resume">
          <div className="chatHeader">
            <span>Ask about me</span>
            <button type="button" className="chatCloseBtn" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="chatMessages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatMsg chatMsg-${m.role}`}>
                <p>{m.text}</p>
                {m.page && <span className="chatMsgPage">page {m.page}</span>}
              </div>
            ))}
            {loading && (
              <div className="chatMsg chatMsg-bot chatMsg-loading">
                <span className="chatDot" />
                <span className="chatDot" />
                <span className="chatDot" />
              </div>
            )}
          </div>

          <form className="chatInputRow" onSubmit={sendQuestion}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. How many years of experience?"
              maxLength={300}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send question">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatBubble"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
