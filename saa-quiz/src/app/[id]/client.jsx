"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuizClient({ question, total }) {
  const answerLetters = question.answer.split(",");
  const isMulti = answerLetters.length > 1;

  const [selected, setSelected] = useState(() => new Set());
  const [result, setResult] = useState(null);
  const [logged, setLogged] = useState(false);

  function toggle(letter) {
    if (result) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) {
        next.delete(letter);
      } else {
        if (!isMulti) next.clear();
        next.add(letter);
      }
      return next;
    });
  }

  async function logEvent(kind, extra = {}) {
    if (logged) return;
    setLogged(true);
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: question.id, kind, ...extra }),
      });
    } catch (e) {}
  }

  function submit() {
    if (selected.size === 0 || result) return;
    const correct =
      selected.size === answerLetters.length &&
      answerLetters.every((l) => selected.has(l));
    if (correct) {
      setResult("correct");
    } else {
      setResult("wrong");
      logEvent("wrong", { selected: [...selected].sort().join(",") });
    }
  }

  function dontKnow() {
    if (result) return;
    setResult("dontknow");
    logEvent("dontknow");
  }

  const prevId = question.id > 1 ? question.id - 1 : null;
  const nextId = question.id < total ? question.id + 1 : null;

  return (
    <main style={{ padding: "32px 24px", maxWidth: 900, margin: "0 auto" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          fontSize: 13,
          color: "#888",
        }}
      >
        <Link href="/" style={{ color: "#888" }}>
          ← 목록
        </Link>
        <span>
          {question.id} / {total}
          {isMulti && ` · 다중 선택 ${answerLetters.length}개`}
        </span>
      </nav>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 8,
          whiteSpace: "pre-wrap",
        }}
      >
        {question.question}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 20,
        }}
      >
        {Object.entries(question.options).map(([letter, text]) => {
          const isSelected = selected.has(letter);
          return (
            <button
              key={letter}
              onClick={() => toggle(letter)}
              disabled={!!result}
              style={{
                background: "transparent",
                border: "none",
                padding: "4px 0",
                textAlign: "left",
                cursor: result ? "default" : "pointer",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#ddd",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: isSelected ? "#fff" : "transparent",
                  flexShrink: 0,
                  marginTop: 8,
                }}
              />
              <span>
                <span style={{ marginRight: 8 }}>{letter}.</span>
                {text}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 24, fontSize: 14 }}>
        <button
          onClick={submit}
          disabled={!!result || selected.size === 0}
          style={{
            background: "transparent",
            border: "none",
            color:
              result || selected.size === 0 ? "#555" : "#8ab4f8",
            cursor:
              result || selected.size === 0 ? "default" : "pointer",
            padding: 0,
          }}
        >
          제출
        </button>
        <button
          onClick={dontKnow}
          disabled={!!result}
          style={{
            background: "transparent",
            border: "none",
            color: result ? "#555" : "#aaa",
            cursor: result ? "default" : "pointer",
            padding: 0,
          }}
        >
          모르겠음
        </button>
      </div>

      {result === "correct" && (
        <p style={{ marginTop: 20, color: "#7bd87b", fontSize: 14 }}>
          정답 ({question.answer})
        </p>
      )}
      {result === "wrong" && (
        <p style={{ marginTop: 20, color: "#ff6b6b", fontSize: 14 }}>
          오답 · 정답: {question.answer}
        </p>
      )}
      {result === "dontknow" && (
        <p style={{ marginTop: 20, color: "#aaa", fontSize: 14 }}>
          정답: {question.answer}
        </p>
      )}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 36,
          fontSize: 14,
        }}
      >
        {prevId ? (
          <Link href={`/${prevId}`} style={{ color: "#888" }}>
            ← 이전
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link href={`/${nextId}`} style={{ color: "#888" }}>
            다음 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
