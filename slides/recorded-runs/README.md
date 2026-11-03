# Recorded runs

Slide images made from **real runs** on 2026-11-03, not mock-ups. Every terminal
line and every number comes from an actual run; lines removed for length are
marked `…`. Reproduce them yourself:

| Image | What ran | Reproduce |
|---|---|---|
| `02b-reproduce.png` | `npm test` (7 pass) and `npm run ci:contract` (INV-1007 batch fails) on `main` | same commands on `main` |
| `10b-haystack.png` | Claude Code asked the same question twice: A may only read the whole `logs/ci-full.log`, B may only search it | `claude -p` with `--disallowedTools "Grep,Glob,Bash,Agent"` (A) or `"Read,Bash,Agent"` (B), `--permission-mode plan` |
| `15b-recovery.png` | A fresh session rebuilds the task's constraints from `progress.md`, `CLAUDE.md`, tests and `git diff` | prompt in `fallbacks/disappearing-constraint/recovery-prompt.md` |
| `22b-evidence.png` | `git log` / `git show 8374a38` for the commit that introduced the bug | same commands on `main` |
| `22c-verified.png` | The minimal fix, then `npm test` (8 pass) and `npm run ci:contract` (2 pass) | `git switch workshop/checkpoint-03-fixed` |
| `27b-agents-measured.png` | Same investigation with one agent vs three parallel subagents; totals include subagent tokens | prompts in `prompts/core/08-parallel-investigation.md` |

Token counts and timings come from `claude -p --output-format json` (`usage`,
`modelUsage`, `num_turns`, `duration_ms`). They are **one run each**: results vary
between runs and models, so treat them as an illustration, not a benchmark.
