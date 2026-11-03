# 10 · MCP vs browser experiment ("Structured tool vs browser")

**Time:** 01:36–01:48 · **Lead:** James (MCP intro) → both: Mustaq runs the MCP route, James the browser route · **Branch:** `workshop/checkpoint-03-fixed` · **Fallback:** a recording of each route, plus the rehearsal results in `bench/runs.csv`

## Goal

MCP and browser use solve different interface problems. MCP exposes named tools
with typed arguments. Browser use works through page structure and screenshots.
Speed, tokens and success rate are **measurement hypotheses**. Do not announce
a winner before you have the numbers.

## Setup (before the segment)

By this point in the story the fix has landed. Run the demo on the fixed
checkpoint: INC-104's note says the regression test passed, and Claude can
(and often does) check that claim against the repo. On `main` the fix is
missing, so Claude correctly refuses to resolve the incident, which makes a good
slide-24 moment but an unfair comparison between the two routes.

```bash
git switch workshop/checkpoint-03-fixed
npm run incidents:reset
npm run incidents:web          # leave running: http://localhost:4173/incidents/INC-104
```

In Claude Code, check that the server is connected (approve the project server the first time):

```text
/mcp
```

Then press `Shift+Tab` until the mode shows **Manual**. Recent Claude Code
versions start interactive sessions in **Auto** mode, where a classifier
approves or blocks actions instead of asking you. In Manual mode the incident
write will stop and ask, which is the approval gate you want the room to see.

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

Expected: `get_incident` runs without asking (it is in the allow list in
`.claude/settings.json`). `update_incident_status` is not in the allow list, so in
Manual mode it **asks you**. Approve it on stage: that prompt is the human approval gate.

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

## Bonus: the claim that doesn't match the repo (use in 11 · security)

Run Route A again on `main`, where the fix is missing. A careful run reads the
note, checks `src/transitions.ts` and `tests/`, finds the claim unsupported and
does **not** resolve the incident. A tool result is a claim, not proof.

## Recording results

Use [`bench/README.md`](../../bench/README.md). The MCP route can run headless:

```bash
bench/run-mcp.sh mcp-01
```

Fill `bench/runs.csv` from at least 5 rehearsal runs per route. Leave the
scoreboard slide blank if you have no data.
