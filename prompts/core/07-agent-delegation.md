# 07 · Agent delegation

**Time:** 01:02–01:13 · **Lead:** Mustaq · **Branch:** `main`

## Goal

A subagent is not "a better prompt". It has its own context window, a role,
and its own tool limits, and it returns only its final report to the parent.
Delegate a bounded question, not the whole problem.

## Show the agent first

```bash
cat .claude/agents/qa-investigator.md
```

Point at `tools: Read, Grep, Glob`. That list is enforced: this agent cannot
edit files or run commands.

## Part 1: main session only (baseline)

```text
Investigate the PAID -> DRAFT defect: look at the implementation and the test coverage.
Do not modify files.
```

Afterwards run `/context` and note how much of the window the file reads used.

## Part 2: delegate one bounded task (`/clear` first)

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

## Compare

| Question | Main only | With subagent |
|---|---|---|
| Did the test-file reads land in the main context? | yes | no, only the report |
| Did the QA work stay read-only by construction? | prompt only | enforced by `tools` |
| Was there a clear output contract? | no | max five findings, evidence vs inference |

## When NOT to delegate

Simple tasks, tightly sequential work and single-file edits, where continuity
of context matters more than isolation.
