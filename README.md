# LedgerLab

A small, **fictional** invoice application used in the workshop *AI Engineering
Masterclass: From Prompting to Production*. It is not based on any real
company's code, and all data in it is synthetic.

> **Missed the session, or want to relive it?** Start at
> **[walkthrough/00-start-here.md](walkthrough/00-start-here.md)**. Thirteen short
> chapters follow the session in order. Each explains one concept, lets you
> reproduce it step by step, and shows the real recorded result to compare with yours.

## The story in one paragraph

Release v0.8.0 is blocked. A rule lets a `PAID` invoice go back to `DRAFT`. All
7 unit tests pass, because none of them covers that transition, but a downstream
reconciliation check fails, only for batches that contain a reopened invoice.
The walkthrough uses Claude Code to investigate before editing, prove the cause,
make the smallest fix, and verify it, adding one capability and one control per
chapter: context, skills, agents, parallelism, MCP and permissions.

## Quick start

You need Git, Node.js 20+, npm, and Claude Code signed in with your own account.

```bash
git clone https://github.com/developermustaq/ledgerlab.git
cd ledgerlab
npm ci
npm run where    # tells you which step of the story this checkout is at
```

On a fresh clone `npm run where` reports **STEP 1 · The blocked release**:
7/7 unit tests pass, and the contract check fails 1 of 2.

## Commands

| Command | What it does |
|---|---|
| `npm run where` | Your compass: runs both checks and names the current step |
| `npm test` | Unit tests (7 on `main`, 8 once the regression test exists) |
| `npm run ci:contract` | The downstream reconciliation check that fails on `main` |
| `npm run measure:haystack` | Re-runs the "read the whole log vs search it" measurement (chapter 03) |
| `npm run measure:recovery` | Fresh-session recovery from files (chapter 04) |
| `npm run measure:agents` | One agent vs three parallel subagents (chapter 08) |
| `npm run incidents:web` / `incidents:reset` | The fictional incident system's web UI, and a reset (chapter 10) |
| `npm run typecheck` | TypeScript check |

The `measure:*` scripts run Claude Code headless and read-only (plan mode), and
use real tokens on your account. Pin a model for fair comparisons:
`MODEL=claude-opus-5-5 npm run measure:haystack`.

## The story's checkpoints (git branches)

| Branch | State | `npm test` | `npm run ci:contract` |
|---|---|---|---|
| `main` = `workshop/checkpoint-00-start` | Bug present, no test covers it | 7/7 pass | 1 of 2 fails |
| `workshop/checkpoint-01-investigated` | + reference triage report `reports/triage.md` | 7/7 pass | 1 of 2 fails |
| `workshop/checkpoint-02-tested` | + regression test (red) | 1 fails | 1 of 2 fails |
| `workshop/checkpoint-03-fixed` | + smallest fix (green) | 8/8 pass | 2/2 pass |

## What's in the repo

| Path | What it is | Chapter |
|---|---|---|
| [`walkthrough/`](walkthrough/00-start-here.md) | **The self-guided session**, plus a [glossary](walkthrough/glossary.md) | all |
| `src/`, `tests/` | The invoice code and its unit tests (`tests/fixtures.ts` is generated: do not edit) | 01, 06 |
| `contract/` | The downstream reconciliation check and its two replay batches | 01, 06 |
| `logs/` | The short CI log and a 2,000-line noisy one (`ci-full.log`) | 01, 03 |
| `CLAUDE.md`, `progress.md` | Durable project rules and task state | 04, 05 |
| `.claude/skills/release-triage/` | The triage procedure, packaged as a skill | 05, 06 |
| `.claude/agents/` | Three read-only investigators | 07, 08 |
| `.claude/settings.json` | Permission rules: deny, ask, allow | 11 |
| `mcp/incident-server/`, `.mcp.json`, `incidents/` | A fictional incident system: MCP server and web UI on the same data | 10 |
| `expected/checklist.md` | How to judge a triage run by behaviour, not wording | 06 |
| `fallbacks/` | The lossy-summary illustration and the recovery prompt | 04 |
| `bench/` | Measurement scripts and guidance | 03, 08, 10 |
| `slides/diagrams/`, `slides/recorded-runs/` | The session's diagrams, and images of real captured runs with how to reproduce them | all |
| [`prompts/`](prompts/README.md) | The presenters' kit: every prompt in running order, timings, fallbacks | presenters |
| `scripts/` | `where-am-i.mjs` and the log generator | 00, 03 |

## Safety rules for this sandbox

- Fictional data only. Never paste real client data, credentials or API keys into this repo or into a prompt.
- Prefer permission rules and modes over turning permissions off. Avoid `--dangerously-skip-permissions`.
- "Claude says the tests pass" is not evidence. The test output, the diff and the
  incident audit log (`/audit`) are.

## Licence

MIT. See `LICENSE`.
