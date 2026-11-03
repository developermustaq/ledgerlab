# Presenter · Recovery rules

## The 60–90 second rule

If Claude has not reached the next checkpoint in 60–90 seconds, move straight to
the prepared checkpoint. Do not fill the time by narrating model output; ask a
[waiting question](waiting-questions.md) instead.

## Prepared fallbacks per demo

| Demo | Live target | Fallback |
|---|---|---|
| Disappearing constraint | 8–10 min | `fallbacks/disappearing-constraint/` |
| Teach Claude the playbook (Skill) | 12–15 min | `workshop/checkpoint-01-investigated` → `reports/triage.md`; checklist in `expected/checklist.md` |
| Fix and verify | — | `workshop/checkpoint-02-tested` (red), `workshop/checkpoint-03-fixed` (green) |
| One problem, three investigators | 12–15 min | Pre-recorded agent run; `reports/triage.md` as the reference |
| Structured tool vs browser | 10–12 min | Recordings of both routes; rehearsal rows in `bench/runs.csv` |

## Common failures and the move

| Failure | Move |
|---|---|
| Claude edits during "investigate only" | Use it: "This is why a prompt is not a boundary." Run `git checkout -- .` and show Plan mode or the Skill. |
| MCP server not connected | `/mcp` → reconnect. Still down: play the recording. |
| Web UI port busy | `PORT=4174 npm run incidents:web` and change the URL in the prompt. |
| Incident already Resolved from a rehearsal | `npm run incidents:reset` |
| Wording differs from rehearsal | Judge behaviour with `expected/checklist.md`, not the text. |
| Tests behave unexpectedly | `git status`, then `git switch` to the matching checkpoint. |

## Reset everything between rehearsals

```bash
git switch main && git checkout -- . && git clean -fd -e node_modules
npm run incidents:reset
```
