#!/usr/bin/env python3
"""
Parse SAA-C03/new-anwser/quize.md into data/new-questions.json.

The source markdown groups blocks with `---` separators. Each block starts with
a `# Q<label>. <question>` header, may include a `> 정답 : ...` line, and then
options in `- A. ...` or `A. ...` form. This script normalizes those blocks
into a flat JSON list with sequential ids for routing.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "SAA-C03" / "new-anwser" / "quize.md"
OUT = ROOT / "data" / "new-questions.json"

OPTION_RE = re.compile(r"^\s*-?\s*([A-E])[.\s]\s*(.*)$")
LABEL_RE = re.compile(r"^(Q추가\d+|Q\.?\d+|\d+)\.?\s*(.*)$")


def parse_block(block: str):
    lines = block.split("\n")

    label = None
    question_lines = []
    options = {}
    current_option = None
    state = "header"

    for line in lines:
        stripped = line.strip()

        if state == "header":
            if not stripped.startswith("#"):
                continue
            header = stripped.lstrip("#").strip()
            m = LABEL_RE.match(header)
            if m:
                label = m.group(1).rstrip(".")
                if m.group(2):
                    question_lines.append(m.group(2))
            else:
                question_lines.append(header)
            state = "question"
            continue

        if stripped.startswith(">"):
            continue

        opt = OPTION_RE.match(line)
        if opt:
            current_option = opt.group(1)
            options[current_option] = [opt.group(2)]
            state = "option"
            continue

        if state == "question":
            question_lines.append(line)
        elif state == "option" and current_option:
            options[current_option].append(line)

    question = "\n".join(question_lines).strip()
    question = re.sub(r"\n{3,}", "\n\n", question)

    normalized_options = {}
    for letter, chunks in options.items():
        text = " ".join(c.strip() for c in chunks if c.strip()).strip()
        if text:
            normalized_options[letter] = text

    if not label or not question or not normalized_options:
        return None

    return {"label": label, "question": question, "options": normalized_options}


def main():
    text = SRC.read_text(encoding="utf-8")
    blocks = re.split(r"\n-{3,}\s*\n", text)

    questions = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        parsed = parse_block(block)
        if parsed is None:
            continue
        parsed["id"] = len(questions) + 1
        questions.append(parsed)

    OUT.write_text(
        json.dumps(questions, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(questions)} questions to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
