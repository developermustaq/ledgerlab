# 00 · Start here

> **The whole session in one line:** a prompt gives you an answer; an engineered
> workflow gives you a result you can repeat and check.

This walkthrough lets you relive the workshop *AI Engineering Masterclass: From
Prompting to Production* without having been in the room. It follows one story
from start to finish. Each chapter adds one capability to how we work with
Claude Code, and one control to keep it honest.

## The story

LedgerLab is a small, **fictional** invoice application (all data is synthetic).
Release v0.8.0 is blocked: CI is red. All 7 unit tests pass, yet a downstream
reconciliation check fails because an invoice that was already **PAID** was moved
back to **DRAFT**. We use Claude Code to find out why, prove it, fix it with the
smallest safe change, and verify the result, getting more rigorous with every chapter.

## How each chapter works

Every chapter has the same parts:

1. **The idea**: one sentence to remember.
2. **The concept**: plain-language explanation.
3. **Reproduce it**: exact commands, and the real output you should see.
4. **What it shows**: why it matters for engineering work.
5. **Misconception**: the wrong belief this chapter corrects.
6. **Recorded run / diagram**: the real captured result from the session, so you
   can compare yours.

## Setup (10 minutes)

You need Git, Node.js 20+, npm, and [Claude Code](https://code.claude.com/docs)
signed in with your own account. No credentials or real data are used anywhere.

```bash
git clone https://github.com/developermustaq/ledgerlab.git
cd ledgerlab
npm ci
npm run where
```

`npm run where` is your compass. It runs the unit tests and the contract check,
looks at the code, and tells you which step of the story your checkout is at.
On a fresh clone it should say **STEP 1 · The blocked release**.

Then open Claude Code in the folder once (`claude`) and accept the trust prompt,
so the project's permission rules in `.claude/settings.json` apply.

## The checkpoints (git branches)

The story's states are saved as branches, so you can jump to any point:

| Branch | `npm run where` says | State | `npm test` | `npm run ci:contract` |
|---|---|---|---|---|
| `main` = `workshop/checkpoint-00-start` | STEP 1 · The blocked release | Bug present, no test covers it | 7/7 pass | **1 fails** |
| `workshop/checkpoint-01-investigated` | STEP 2 · Investigated | + a reference triage report in `reports/` | 7/7 pass | 1 fails |
| `workshop/checkpoint-02-tested` | STEP 3 · Red | + the regression test | **1 fails** | 1 fails |
| `workshop/checkpoint-03-fixed` | STEP 4 · Green | + the smallest fix | 8/8 pass | 2/2 pass |

Switch with `git switch workshop/checkpoint-03-fixed`, then run `npm run where` again.

> These are *workshop* checkpoints (git branches). Claude Code also has its own
> checkpoints (`/rewind`) that undo file edits inside a session; they are different things.

## Chapters

| # | Chapter | The idea |
|---|---|---|
| 01 | [The blocked release](01-the-blocked-release.md) | "Fix the failing tests" aims at the wrong target |
| 02 | [Model vs harness](02-model-vs-harness.md) | The model is one component; the harness runs the loop |
| 03 | [Context is a budget](03-context-is-a-budget.md) | Every tool result is paid for on every later turn |
| 04 | [Compaction and durable state](04-compaction-and-durable-state.md) | Conversation is working memory; files are durable memory |
| 05 | [CLAUDE.md, skill or agent?](05-claude-md-skill-or-agent.md) | Facts, procedures and delegated roles live in different places |
| 06 | [A skill-driven triage](06-skill-driven-triage.md) | Evidence before edits, then red → green |
| 07 | [Delegation](07-delegation.md) | Delegate a bounded question, not the chaos |
| 08 | [Parallelism and its cost](08-parallelism-and-its-cost.md) | Parallelise independence, and measure it |
| 09 | [Verification](09-verification.md) | Fact, inference, unknown: proof beats confidence |
| 10 | [MCP vs browser](10-mcp-vs-browser.md) | Same task, two interfaces; a tool result is a claim |
| 11 | [Permissions and trust](11-permissions-and-trust.md) | Asked is not enforced: deny → ask → allow |
| 12 | [Recap](12-recap.md) | Rebuild the workflow from memory |

New to the vocabulary? Keep the [glossary](glossary.md) open.

**Next →** [01 · The blocked release](01-the-blocked-release.md)
