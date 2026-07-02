"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import questions from "../../data/questions.json";
import essentialIds from "../../data/essential-ids.json";
import newQuestions from "../../data/new-questions.json";

const MODE_KEY = "saa-quiz-mode";
const essentialSet = new Set(essentialIds);
const MODES = new Set(["all", "essential", "new"]);

export default function Home() {
  const [mode, setMode] = useState("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(MODE_KEY);
    if (MODES.has(saved)) setMode(saved);
    setReady(true);
  }, []);

  function pickMode(next) {
    setMode(next);
    localStorage.setItem(MODE_KEY, next);
  }

  const visible =
    mode === "new"
      ? newQuestions
      : mode === "essential"
      ? questions.filter((q) => essentialSet.has(q.id))
      : questions;
  const firstId = visible[0]?.id ?? 1;
  const hrefFor = (id) => (mode === "new" ? `/new/${id}` : `/${id}`);

  const tabStyle = (active) => ({
    padding: "6px 14px",
    background: active ? "#1a1a1a" : "transparent",
    border: "1px solid #333",
    color: active ? "#fff" : "#888",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
  });

  return (
    <main
      style={{
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
        visibility: ready ? "visible" : "hidden",
      }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => pickMode("all")} style={tabStyle(mode === "all")}>
          전체 {questions.length}
        </button>
        <button
          onClick={() => pickMode("essential")}
          style={tabStyle(mode === "essential")}
        >
          실전 {essentialIds.length}
        </button>
        <button
          onClick={() => pickMode("new")}
          style={tabStyle(mode === "new")}
        >
          신규 {newQuestions.length}
        </button>
      </div>

      <Link
        href={hrefFor(firstId)}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#1a1a1a",
          border: "1px solid #333",
          color: "#fff",
          borderRadius: 6,
          marginBottom: 28,
          fontSize: 14,
        }}
      >
        시작 →
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
          gap: 6,
        }}
      >
        {visible.map((q) => (
          <Link
            key={q.id}
            href={hrefFor(q.id)}
            style={{
              textAlign: "center",
              padding: "10px 4px",
              color: "#bbb",
              fontSize: 13,
            }}
          >
            {q.id}
          </Link>
        ))}
      </div>
    </main>
  );
}
