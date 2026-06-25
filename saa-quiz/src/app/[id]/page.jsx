import { notFound } from "next/navigation";
import questions from "../../../data/questions.json";
import QuizClient from "./client";

export function generateStaticParams() {
  return questions.map((q) => ({ id: String(q.id) }));
}

export default function QuizPage({ params }) {
  if (!/^\d+$/.test(params.id)) notFound();
  const id = Number(params.id);
  const question = questions.find((q) => q.id === id);
  if (!question) notFound();
  return (
    <QuizClient
      key={question.id}
      question={question}
      total={questions.length}
    />
  );
}
