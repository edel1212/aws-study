import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const LOG_FILE = path.join(process.cwd(), "wrong-answers.txt");

async function readStats() {
  try {
    const content = await fs.readFile(LOG_FILE, "utf-8");
    const stats = {};
    for (const line of content.split("\n")) {
      const m = line.match(
        /^Q(\d+):\s*틀림\s*(\d+)회,\s*모르겠음\s*(\d+)회(?:\s*\(마지막 선택:\s*([^)]+)\))?/
      );
      if (m) {
        stats[m[1]] = {
          wrong: parseInt(m[2], 10),
          dontknow: parseInt(m[3], 10),
          lastSelected: m[4] || "",
        };
      }
    }
    return stats;
  } catch {
    return {};
  }
}

async function writeStats(stats) {
  const ids = Object.keys(stats)
    .map(Number)
    .sort((a, b) => a - b);
  const lines = ids.map((id) => {
    const s = stats[id];
    const tail = s.lastSelected
      ? ` (마지막 선택: ${s.lastSelected})`
      : "";
    return `Q${id}: 틀림 ${s.wrong}회, 모르겠음 ${s.dontknow}회${tail}`;
  });
  await fs.writeFile(LOG_FILE, lines.join("\n") + "\n", "utf-8");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, kind, selected } = body;
    if (typeof id !== "number" || !["wrong", "dontknow"].includes(kind)) {
      return Response.json({ ok: false, error: "bad request" }, { status: 400 });
    }
    const stats = await readStats();
    const key = String(id);
    if (!stats[key]) stats[key] = { wrong: 0, dontknow: 0, lastSelected: "" };
    if (kind === "wrong") {
      stats[key].wrong += 1;
      if (selected) stats[key].lastSelected = selected;
    } else {
      stats[key].dontknow += 1;
    }
    await writeStats(stats);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function GET() {
  const stats = await readStats();
  return Response.json({ stats });
}
