"""Render the masterclass diagrams as 1920x1080 slide images in the deck's style.

Usage: python3 -I build.py <out_dir> <footer text>
Writes one .html and one .png per diagram. Needs Google Chrome (headless).
"""

import html
import subprocess
import sys
from pathlib import Path

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

BLUE = "#014BAA"
CREAM = "#F8F3F0"
INK = "#14284B"
MUTED = "#5B6B85"
CARD = "#FFFFFF"
SOFT = "#E6EEF8"
GREEN = "#2E7D4F"
RED = "#C0394B"
ARROW = "#A8620F"
CYAN = "#3CC6D8"


def esc(s):
    return html.escape(s, quote=True)


def box(x, y, w, h, title, lines=(), fill=CARD, title_color=BLUE, text_color=INK, stroke="none", size=30, line_size=24):
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{fill}" stroke="{stroke}" stroke-width="3"/>']
    ty = y + 52
    out.append(f'<text x="{x + 28}" y="{ty}" font-size="{size}" font-weight="800" fill="{title_color}">{esc(title)}</text>')
    for i, line in enumerate(lines):
        out.append(f'<text x="{x + 28}" y="{ty + 42 + i * (line_size + 10)}" font-size="{line_size}" fill="{text_color}">{esc(line)}</text>')
    return "\n".join(out)


def diamond(cx, cy, w, h, label, fill=SOFT):
    pts = f"{cx},{cy - h / 2} {cx + w / 2},{cy} {cx},{cy + h / 2} {cx - w / 2},{cy}"
    return (f'<polygon points="{pts}" fill="{fill}" stroke="{BLUE}" stroke-width="3"/>'
            f'<text x="{cx}" y="{cy + 9}" font-size="26" font-weight="800" fill="{BLUE}" text-anchor="middle">{esc(label)}</text>')


def arrow(points, label=None, label_at=None, color=ARROW, dashed=False, head=True):
    d = " ".join(f"{x},{y}" for x, y in points)
    dash = ' stroke-dasharray="12 10"' if dashed else ""
    end = ' marker-end="url(#head)"' if head else ""
    out = [f'<polyline points="{d}" fill="none" stroke="{color}" stroke-width="5" stroke-linejoin="round"{dash}{end}/>']
    if label:
        lx, ly = label_at
        out.append(f'<text x="{lx}" y="{ly}" font-size="22" font-weight="700" fill="{color}" text-anchor="middle">{esc(label)}</text>')
    return "\n".join(out)


def text(x, y, s, size=24, color=INK, weight=400, anchor="start"):
    return f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}">{esc(s)}</text>'


def page(label, title, body, caption, number, footer, dark=False):
    bg = BLUE if dark else CREAM
    title_color = "#FFFFFF" if dark else BLUE
    label_color = "#FFFFFF" if dark else MUTED
    return f"""<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=block" rel="stylesheet">
<style>html,body{{margin:0;width:1920px;height:1080px;overflow:hidden;background:{bg};}}
svg{{font-family:'Plus Jakarta Sans',sans-serif;}}</style></head>
<body><svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="head" markerWidth="4" markerHeight="4" refX="3.2" refY="2" orient="auto" markerUnits="strokeWidth">
<path d="M0,0 L4,2 L0,4 Z" fill="{ARROW}"/></marker></defs>
<rect width="1920" height="1080" fill="{bg}"/>
<rect x="90" y="70" width="270" height="7" fill="{CYAN}"/>
{text(90, 122, label, 24, label_color, 800)}
{text(90, 232, title, 76, title_color, 800)}
{body}
{text(90, 1010, caption, 30, ARROW, 700)}
{text(90, 1050, footer, 18, label_color, 700)}
{text(1830, 1050, number, 18, label_color, 700, "end")}
</svg></body></html>"""


def harness():
    b = []
    inputs = [("Your instruction", "the prompt you type"),
              ("CLAUDE.md", "project rules, every session"),
              ("Skill descriptions", "body loads only when used"),
              ("Tools + permissions", "allow / ask / deny rules")]
    for i, (t, l) in enumerate(inputs):
        y = 300 + i * 150
        b.append(box(90, y, 420, 120, t, [l], size=28, line_size=22))
        b.append(arrow([(510, y + 60), (555, y + 60)], head=False))
    b.append(arrow([(555, 360), (555, 810)], head=False))
    b.append(arrow([(555, 545), (600, 545)]))
    b.append(box(610, 380, 400, 330, "CLAUDE CODE", ["HARNESS", "", "assembles the request", "checks permissions", "runs tools", "compacts context"],
                 fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=34, line_size=26))
    b.append(arrow([(1010, 545), (1100, 545)]))
    b.append(box(1110, 440, 300, 210, "CLAUDE", ["MODEL", "", "reasons, picks", "the next step"], fill=SOFT, size=34, line_size=26))
    b.append(arrow([(1410, 545), (1480, 545)]))
    b.append(diamond(1590, 545, 210, 150, "Action?"))
    b.append(arrow([(1590, 470), (1590, 400)], "answer", (1660, 445)))
    b.append(box(1440, 290, 400, 105, "ANSWER → YOU", [], fill=CARD, title_color=GREEN, size=30))
    b.append(arrow([(1590, 620), (1590, 700)], "tool call", (1665, 670)))
    b.append(box(1400, 705, 440, 140, "TOOL CALL", ["File · Bash · Agent · MCP"], fill=CARD, title_color=ARROW, size=30))
    b.append(arrow([(1620, 845), (1620, 920), (810, 920), (810, 718)], "result joins the context", (1215, 905)))
    return page("THE ARCHITECTURE", "WHAT THE HARNESS ASSEMBLES",
                "\n".join(b), "The model is only one component of the engineering system.", "04b", FOOTER)


def context():
    b = []
    b.append(box(90, 330, 330, 150, "SESSION STARTS", ["CLAUDE.md, skill list"], size=28, line_size=22))
    b.append(arrow([(420, 405), (480, 405)]))
    b.append(box(490, 330, 380, 150, "WORK HAPPENS", ["files, tool results, chat"], size=28, line_size=22))
    b.append(arrow([(870, 405), (930, 405)]))
    b.append(box(940, 330, 360, 150, "CONTEXT GROWS", ["working memory fills"], fill=SOFT, size=28, line_size=22))
    b.append(arrow([(1300, 405), (1390, 405)]))
    b.append(diamond(1510, 405, 230, 160, "Room left?"))
    b.append(arrow([(1510, 325), (1510, 280), (1120, 280), (1120, 325)], "yes: keep working", (1315, 268)))
    b.append(arrow([(1510, 485), (1510, 540), (1190, 540), (1190, 572)]))
    b.append(arrow([(1510, 540), (1640, 540), (1640, 572)]))
    b.append(text(1530, 528, "no", 22, ARROW, 700))
    b.append(box(990, 580, 400, 170, "/compact <focus>", ["same conversation, summarised", "may lose early detail"], fill=CARD, title_color=RED, size=28, line_size=22))
    b.append(box(1450, 580, 380, 170, "/clear + fresh", ["new session re-reads", "state from files"], fill=CARD, title_color=GREEN, size=28, line_size=22))
    b.append(arrow([(1640, 750), (1640, 800), (1190, 800)], head=False))
    b.append(arrow([(1190, 750), (1190, 800), (910, 800), (910, 828)]))
    b.append(box(490, 835, 840, 125, "DURABLE STATE", ["code · tests · progress.md · CLAUDE.md · git diff"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=28, line_size=24))
    b.append(arrow([(490, 897), (420, 897)]))
    b.append(box(90, 835, 320, 125, "CONTINUE", ["same constraints"], fill=SOFT, title_color=GREEN, size=28, line_size=22))
    return page("CONTEXT ENGINEERING", "WHEN CONTEXT FILLS UP",
                "\n".join(b), "Context is working memory, not permanent truth.", "12b", FOOTER)


def skill():
    b = []
    b.append(box(90, 300, 520, 200, "SESSION START", ["only the description is loaded:", "“release-triage: investigate a", "release-blocking defect…”"], size=28, line_size=22))
    b.append(arrow([(610, 400), (690, 400)]))
    b.append(box(700, 300, 480, 200, "TRIGGER", ["/release-triage", "or a matching task"], fill=SOFT, size=28, line_size=24))
    b.append(arrow([(1180, 400), (1260, 400)]))
    b.append(box(1270, 300, 560, 200, "BODY LOADS", [".claude/skills/release-triage/", "SKILL.md, stays for later turns"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=28, line_size=22))
    b.append(arrow([(1550, 500), (1550, 560), (330, 560), (330, 610)]))
    b.append(box(90, 615, 480, 230, "A · EVIDENCE", ["symptom, implementation,", "tests, logs", "facts / hypotheses / gaps", "NO EDITS"], size=28, line_size=22))
    b.append(arrow([(570, 730), (640, 730)]))
    b.append(box(650, 615, 420, 230, "B · SMALLEST FIX", ["violated invariant", "minimal change", "test that should fail"], size=28, line_size=22))
    b.append(arrow([(1070, 730), (1140, 730)]))
    b.append(diamond(1250, 730, 200, 150, "Approved?"))
    b.append(arrow([(1350, 730), (1410, 730)], "yes", (1380, 715)))
    b.append(box(1420, 615, 410, 230, "C · VERIFY", ["narrow test first", "minimal fix", "focused test → suite", "report + uncertainty"], fill=CARD, title_color=GREEN, size=28, line_size=22))
    b.append(text(1250, 850, "no: stop, report", 22, RED, 700, "middle"))
    return page("SKILLS", "HOW A SKILL LOADS AND RUNS",
                "\n".join(b), "A reusable procedure: not fine-tuning, not guaranteed compliance.", "19b", FOOTER)


def agents():
    b = []
    b.append(box(90, 420, 380, 260, "COORDINATOR", ["main session", "owns the objective", "keeps constraints", "makes the decision"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=30, line_size=24))
    names = [("developer-reviewer", "transition logic"), ("qa-investigator", "missing regression test"), ("ops-reviewer", "CI log, blast radius")]
    for i, (n, f) in enumerate(names):
        y = 290 + i * 190
        b.append(arrow([(470, 550), (600, y + 75)]))
        b.append(box(610, y, 520, 150, n, [f, "own context · Read, Grep, Glob"], size=28, line_size=22))
        b.append(arrow([(1130, y + 75), (1262, 480 + i * 70)], "≤5 findings" if i == 0 else None, (1210, y + 50)))
    b.append(box(1270, 430, 560, 240, "SYNTHESIS", ["FACT / INFERENCE / UNKNOWN", "", "→ release decision"], fill=SOFT, title_color=GREEN, size=30, line_size=26))
    b.append(box(610, 875, 1220, 95, "SEQUENTIAL, ONE WORKER:", [], fill=CARD, title_color=RED, size=26))
    b.append(text(1060, 931, "failing test → minimal fix → run tests", 26, INK, 700))
    return page("AGENTS", "THREE INVESTIGATORS, ONE DECISION",
                "\n".join(b), "Parallelise independence, not dependency.", "23b", FOOTER)


def mcp_browser():
    b = []
    b.append(box(90, 420, 360, 250, "CLAUDE CODE", ["same prompt", "same model", "(bench/task.txt)"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=32, line_size=24))
    b.append(text(560, 300, "MCP ROUTE", 26, GREEN, 800))
    b.append(arrow([(450, 480), (540, 380)]))
    b.append(box(550, 320, 470, 150, "MCP CLIENT → SERVER", ["named tools, typed arguments"], size=26, line_size=22))
    b.append(arrow([(1020, 395), (1100, 395)]))
    b.append(box(1110, 320, 420, 150, "get_incident(id)", ["update_incident_status(…)"], fill=SOFT, size=26, line_size=22))
    b.append(text(560, 640, "BROWSER ROUTE", 26, ARROW, 800))
    b.append(arrow([(450, 610), (540, 720)]))
    b.append(box(550, 660, 470, 150, "BROWSER TOOL", ["page structure, clicks, typing"], size=26, line_size=22))
    b.append(arrow([(1020, 735), (1100, 735)]))
    b.append(box(1110, 660, 420, 150, "WEB UI :4173", ["/incidents/INC-104 form"], fill=SOFT, size=26, line_size=22))
    b.append(arrow([(1530, 395), (1600, 530)]))
    b.append(arrow([(1530, 735), (1600, 620)]))
    b.append(box(1610, 470, 240, 210, "SAME DATA", ["incident store", "+ /audit log"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=26, line_size=22))
    b.append(box(90, 870, 1760, 90, "MEASURE:", [], fill=CARD, title_color=RED, size=26))
    b.append(text(300, 926, "turns · tokens · elapsed time · tool calls · wrong actions · success  (5+ runs each, medians)", 26, INK, 700))
    return page("MCP & TOOLS", "SAME TASK. TWO INTERFACES.",
                "\n".join(b), "“MCP always saves tokens” is a hypothesis. Measure it.", "28b", FOOTER)


def permissions():
    b = []
    b.append(box(90, 430, 300, 200, "TOOL CALL", ["Edit, Bash,", "MCP write…"], fill=BLUE, title_color="#FFFFFF", text_color="#FFFFFF", size=30, line_size=24))
    steps = [(560, "Deny rule?", "BLOCKED", RED), (900, "Ask rule?", "ASK A HUMAN", ARROW), (1240, "Allow rule?", "RUNS", GREEN)]
    b.append(arrow([(390, 530), (455, 530)]))
    for i, (cx, q, result, color) in enumerate(steps):
        b.append(diamond(cx, 530, 210, 160, q))
        b.append(arrow([(cx, 450), (cx, 370)], "yes", (cx + 35, 420)))
        b.append(box(cx - 150, 280, 300, 90, result, [], fill=CARD, title_color=color, size=28))
        nx = steps[i + 1][0] - 105 if i < 2 else 1440
        b.append(arrow([(cx + 105, 530), (nx - 10, 530)], "no", (cx + 140, 515)))
    b.append(box(1440, 400, 400, 300, "MODE DECIDES", ["Manual: asks you", "Auto: classifier reviews", "Plan: no source edits", "acceptEdits: edits ok", "dontAsk: denies prompts"], fill=SOFT, size=28, line_size=24))
    b.append(box(90, 830, 1300, 130, "LEDGERLAB .claude/settings.json", ["deny: Edit(/tests/fixtures.ts), Read(/.env), Bash(curl *)  ·  allow: npm test, get_incident"], fill=CARD, size=26, line_size=22))
    return page("TRUST BOUNDARIES", "HOW A TOOL CALL GETS PERMISSION",
                "\n".join(b), "First match wins: deny → ask → allow.", "31b", FOOTER)


DIAGRAMS = {"04b-harness": harness, "12b-context": context, "19b-skill": skill,
            "23b-agents": agents, "28b-mcp-browser": mcp_browser, "31b-permissions": permissions}

if __name__ == "__main__":
    out = Path(sys.argv[1])
    FOOTER = sys.argv[2]
    out.mkdir(parents=True, exist_ok=True)
    for name, fn in DIAGRAMS.items():
        page_html = out / f"{name}.html"
        page_html.write_text(fn())
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--disable-gpu",
                        "--window-size=1920,1080", "--virtual-time-budget=8000",
                        f"--screenshot={out / (name + '.png')}", page_html.as_uri()],
                       check=True, capture_output=True)
        print("rendered", name)
