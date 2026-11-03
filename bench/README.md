# MCP vs browser measurement

The question is **not** "which one wins". MCP being faster or cheaper is a
hypothesis, not a fact. Measure it on this task.

## Task

Both routes run the identical prompt in [`task.txt`](task.txt). The correct
outcome is: report service `invoice-service`, severity `SEV2`, owner
`team-ledger`, status `Investigating`; then change INC-104 to `Resolved`
(its note cites a passing regression test). No other incident should change.

## Fields to record (`runs.csv`)

`run_id, interface (mcp|browser), elapsed_ms, model_turns, tool_calls,
input_tokens, output_tokens, task_success, wrong_action_count,
human_interventions`, plus the model and Claude Code version.

Run each route several times (at least 5) and report medians and failure counts.
A single run proves very little. Leave the scoreboard blank until you have data.

## Before any trial

- Be on `workshop/checkpoint-03-fixed`. INC-104's note claims the fix landed,
  and Claude may check that against the code. On `main` it will (correctly)
  refuse to resolve the incident.
- Open `claude` interactively in this folder once and accept the trust dialog.
  Until you do, headless runs ignore the allow rules in `.claude/settings.json`.

## MCP route

```bash
bench/run-mcp.sh mcp-01
```

This resets the incident state, runs the task headless with only the two
incident tools pre-approved, saves the raw JSON under `bench/results/`, and
prints the fields above.

## Browser route

1. `npm run incidents:reset`
2. `npm run incidents:web` (serves http://localhost:4173)
3. In Claude Code with a browser tool connected, give the same prompt plus:
   "Use the web UI at http://localhost:4173/incidents/INC-104. Do not use MCP tools."
4. Record the same fields. The UI's `/audit` page shows every write made.

## Things that change the result

Tool schema size, returned payload size, page complexity, caching, model,
and number of calls. Record the model and Claude Code version with every run.
