import Link from "next/link";
import questions from "../../data/questions.json";

export default function Home() {
  return (
    <main
      style={{
        padding: "32px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <Link
        href="/1"
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
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/${q.id}`}
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
