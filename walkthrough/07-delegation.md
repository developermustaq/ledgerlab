# 07 · Delegation

> **The idea:** delegate a bounded question, not the chaos. A good subagent has a
> task, a boundary and an output contract.

## The concept

A **subagent** is not "a better prompt". It runs in **its own context window**,
with its own instructions and **enforced tool limits**, and only its final
report comes back to the main session. The main session stays small and focused
(chapter 03); the subagent reads the haystack in its own context.

Look at [`.claude/agents/qa-investigator.md`](../.claude/agents/qa-investigator.md):

```yaml
tools:
  - Read
  - Grep
  - Glob
```

That list is an allowlist. This agent *cannot* edit files or run commands, by
construction, not by request. (Contrast a skill's `allowed-tools`, which only
pre-approves tools; it does not restrict them.)

## Reproduce it

**1. Baseline, main session only** (`claude`):

```text
Investigate the PAID -> DRAFT defect: look at the implementation and the test coverage.
Do not modify files.
```

Then `/context`: note how much of the window the file reads used.

**2. Delegate one bounded task** (`/clear` first):

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

Compare: the test-file reads happen in the subagent's context, and you get back
a short report with at most five findings, evidence separated from inference.

## When not to delegate

Simple, tightly sequential, or single-file work, where keeping one continuous
context matters more than isolation.

## Misconception

> "An agent is just a model with a role label." A subagent is a harness feature:
> separate context, separate tool permissions, and a result handed back.

**Next →** [08 · Parallelism and its cost](08-parallelism-and-its-cost.md)
