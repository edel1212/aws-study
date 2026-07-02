"use client";

import Link from "next/link";

export default function NewQuizClient({ question, total }) {
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
          신규 {question.id} / {total} · {question.label}
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
        {Object.entries(question.options).map(([letter, text]) => (
          <div
            key={letter}
            style={{
              padding: "4px 0",
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
                background: "transparent",
                border: "1px solid #555",
                flexShrink: 0,
                marginTop: 7,
              }}
            />
            <span>
              <span style={{ marginRight: 8 }}>{letter}.</span>
              {text}
            </span>
          </div>
        ))}
      </div>

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 36,
          fontSize: 14,
        }}
      >
        {prevId ? (
          <Link href={`/new/${prevId}`} style={{ color: "#888" }}>
            ← 이전
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link href={`/new/${nextId}`} style={{ color: "#888" }}>
            다음 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
