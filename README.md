# LedgerLab

A small, **fictional** invoice application for the workshop *AI Engineering
Masterclass: From Prompting to Production*. It is not based on any real
company's code, and all data in it is synthetic.

**The story:** release v0.8.0 is blocked. A rule lets a `PAID` invoice go back
to `DRAFT`. The unit tests all pass, because none of them covers that
transition. A downstream reconciliation job fails from time to time because it
assumes invoice status only ever moves forward. Your job is to diagnose the
problem, add the right test, make the smallest fix, and verify it, using Claude
Code in a controlled way.

## Before the workshop (preflight, about 10 minutes)

You need Git, Node.js 20 or newer, npm, and Claude Code signed in with your
approved account. No production credentials are needed or allowed.

```bash
git clone https://github.com/developermustaq/ledgerlab.git
cd ledgerlab
npm ci
npm test            # expected: 7 passed
claude --version    # Claude Code launches
```

Then run `claude` in the folder once and type `/doctor` if anything looks wrong.
Create a branch for your own work: `git switch -c my-work`.

## What's in the repo

| Path | What it is |
|---|---|
| `CLAUDE.md` | Durable project rules Claude reads every session |
| `progress.md` | Durable task state: constraints that must survive |
| `src/`, `tests/` | The invoice code and its tests (`tests/fixtures.ts` is generated: do not edit) |
| `logs/ci-failure.log` | The failing CI run for v0.8.0 |
| `.claude/skills/release-triage/` | A reusable triage procedure (Skill) |
| `.claude/agents/` | Three read-only investigators: `developer-reviewer`, `qa-investigator`, `ops-reviewer` |
| `.claude/settings.json` | Permission rules: what Claude may run without asking |
| `mcp/incident-server/` | A fake incident system with an MCP server and a web UI |
| `expected/checklist.md` | How to judge a triage run by behaviour, not wording |
| `bench/` | How to measure MCP vs browser (no results until measured) |
| `prompts/` | Every prompt used in the session, in running order |
| `fallbacks/` | Prepared artefacts for when a live demo stalls |

## Prompt library

Every prompt in the session, in running order, with who runs it, the expected
result and the fallback, is in **[`prompts/`](prompts/README.md)**:

- `prompts/core/`: the 120-minute session, segment by segment
- `prompts/extensions/`: optional 15–30 minute modules
- `prompts/presenter/`: recovery rules, waiting questions, rehearsal checklist

## Exercises

The hands-on parts at a glance. Each gives you a **task**, a **prompt**, a
**success checkpoint** and a **recovery route**.

### 1. First investigation (5 min)

- **Task:** find out why the release is blocked, without changing anything.
- **Prompt:** `Why is release v0.8.0 blocked? Investigate only. Do not edit files.`
- **Success:** Claude points at `logs/ci-failure.log` and `src/transitions.ts`.
- **Stuck?** `git switch workshop/checkpoint-00-start`

### 2. Skill-driven triage (5 min)

- **Task:** investigate why a PAID invoice can become DRAFT.
- **Prompt:**
  ```text
  /release-triage
  Investigate why a PAID invoice can become DRAFT.
  Do not edit files.
  Identify the violated rule, relevant test and smallest safe fix.
  ```
- **Success:** you can name (1) the faulty transition, (2) the missing
  regression test, (3) the proposed minimal change. Check against
  `expected/checklist.md`.
- **Stuck?** `git switch workshop/checkpoint-01-investigated` and read `reports/triage.md`.

### 3. Delegation to one agent

- **Prompt:**
  ```text
  Investigate the PAID -> DRAFT defect.

  Delegate test-coverage analysis to qa-investigator.
  You remain responsible for implementation analysis.

  Do not modify files.
  When both investigations are complete, produce:
  1. common findings
  2. disagreements
  3. evidence still required
  ```

### 4. Three investigators in parallel

- **Prompt:**
  ```text
  We need a release decision for the invoice-status defect.

  Run these independent investigations in parallel where appropriate:

  - developer-reviewer:
    inspect the state-transition implementation and identify the likely defect.

  - qa-investigator:
    inspect current tests and identify the smallest missing regression test.

  - ops-reviewer:
    inspect logs/ci-failure.log and identify the operational symptom and blast radius.

  Do not edit any files.

  After all three return, synthesise a release recommendation.
  Explicitly mark each conclusion as:
  FACT / INFERENCE / UNKNOWN.
  ```
- **Ask yourself:** which conclusions are evidence, and which are assertion?

### 5. Fix and verify

- **Task:** add the regression test first, watch it fail, then make the smallest fix.
- **Success:** `npm test` goes red with the new test, then green after the fix,
  with no other test changed.
- **Stuck?** `workshop/checkpoint-02-tested` (failing test added) or
  `workshop/checkpoint-03-fixed` (fixed).

### 6. MCP vs browser (presenter-led, optional for you)

Same task, two interfaces, one fake incident system. Run it on the fixed
checkpoint, because the incident note claims the fix has landed:

```bash
git switch workshop/checkpoint-03-fixed
npm run incidents:reset
npm run incidents:web     # web UI at http://localhost:4173/incidents/INC-104
```

The MCP server is registered in `.mcp.json` as `incidents`, with tools
`get_incident(id)` and `update_incident_status(id, status, resolution_note)`.
Claude Code asks you to approve project MCP servers the first time. Reading is
pre-approved in `.claude/settings.json`; **writing still asks you**, on purpose.

Prompt (both routes): see `bench/task.txt`. Measure, don't assume:
`bench/README.md`.

## Checkpoints

| Branch | State |
|---|---|
| `main` / `workshop/checkpoint-00-start` | Bug present, 7 tests pass |
| `workshop/checkpoint-01-investigated` | Adds a reference triage report in `reports/` |
| `workshop/checkpoint-02-tested` | Adds the regression test; it fails |
| `workshop/checkpoint-03-fixed` | Minimal fix; all tests pass |

## Safety rules for this sandbox

- Fictional data only. Never paste real client data, credentials or API keys into this repo or into a prompt.
- Prefer permission rules and modes over turning permissions off. Avoid `--dangerously-skip-permissions`.
- "Claude says the tests pass" is not evidence. The test output, the diff and the
  incident audit log (`/audit`) are.

## Licence

MIT. See `LICENSE`.
