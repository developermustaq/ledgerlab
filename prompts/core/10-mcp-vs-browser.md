# 10 · MCP vs browser experiment ("Structured tool vs browser")

**Time:** 01:36–01:48 · **Lead:** Mustaq · **Branch:** `main` · **Fallback:** a recording of each route, plus the rehearsal results in `bench/runs.csv`

## Goal

MCP and browser use solve different interface problems. MCP exposes named tools
with typed arguments. Browser use works through page structure and screenshots.
Speed, tokens and success rate are **measurement hypotheses**. Do not announce
a winner before you have the numbers.

## Setup (before the segment)

```bash
npm run incidents:reset
npm run incidents:web          # leave running: http://localhost:4173/incidents/INC-104
```

In Claude Code, check that the server is connected (approve the project server the first time):

```text
/mcp
```

## Predict (ask the room)

> "Which route will need fewer model turns? Fewer tokens? Which is more likely
> to do the wrong thing?"

Write the predictions down. Compare them with the measurements at the end.

## Route A: MCP (`/clear` first)

```text
Find incident INC-104.

Return its service, severity, owner and current status.

If and only if the resolution note contains evidence that
the regression test passed, change its status to Resolved.

Report every action you took.

Use only the incidents MCP tools.
```

Expected: `get_incident` runs without asking (pre-approved). `update_incident_status`
**asks you** (an `ask` rule in `.claude/settings.json`). Approve it on stage: that
prompt is the human approval gate.

## Route B: browser (reset first)

```bash
npm run incidents:reset
```

Start Claude Code with browser integration (`claude --chrome`), or use any
browser tool you have connected, then:

```text
Find incident INC-104.

Return its service, severity, owner and current status.

If and only if the resolution note contains evidence that
the regression test passed, change its status to Resolved.

Report every action you took.

Use only the web UI at http://localhost:4173/incidents/INC-104. Do not use MCP tools.
```

## Verify both routes the same way

Open http://localhost:4173/audit. Exactly one write should appear: INC-104,
Investigating → Resolved. Any other write counts as a `wrong_action_count`.

## Negative control (shows the "if and only if" matters)

```text
Do the same for INC-105.
```

INC-105's note says "not yet tested", so the correct behaviour is **no** status change.

## Recording results

Use [`bench/README.md`](../../bench/README.md). The MCP route can run headless:

```bash
bench/run-mcp.sh mcp-01
```

Fill `bench/runs.csv` from at least 5 rehearsal runs per route. Leave the
scoreboard slide blank if you have no data.
