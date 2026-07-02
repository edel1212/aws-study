import { notFound } from "next/navigation";
import questions from "../../../../data/new-questions.json";
import NewQuizClient from "./client";

export function generateStaticParams() {
  return questions.map((q) => ({ id: String(q.id) }));
}

export default function NewQuizPage({ params }) {
  if (!/^\d+$/.test(params.id)) notFound();
  const id = Number(params.id);
  const question = questions.find((q) => q.id === id);
  if (!question) notFound();
  return (
    <NewQuizClient
      key={question.id}
      question={question}
      total={questions.length}
    />
  );
}
