# 08 · Parallel investigation ("One problem, three investigators")

**Time:** 01:13–01:26 · **Lead:** Mustaq · **Branch:** `main` · **Fallback:** `workshop/checkpoint-01-investigated` (`reports/triage.md`)

## Goal

Parallelise independence, not dependency. The three investigations below need
none of each other's results, and all three are read-only.

## Prediction first (ask the room)

> "Which of these three could safely run at the same time? Which steps of the
> fix must stay sequential?"

Answer: all three investigations are independent. Writing the test → watching
it fail → fixing → re-running is sequential and belongs to one worker.

## The prompt (`/clear` first)

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

## YOUR TURN: 8 MINUTES

**Task** Run the prompt above.
**Success checkpoint** You have three separate reports plus one synthesis in
which every conclusion carries FACT, INFERENCE or UNKNOWN.
**Stuck?** Read `reports/triage.md` on `workshop/checkpoint-01-investigated` and
label each of its statements yourself.

## Debrief points

- Wall-clock time can fall when tasks are truly independent. Total tokens can
  **rise** (duplicate reads, coordination). Do not claim a number you did not measure.
- Where did the agents duplicate work? (Often all three read `src/transitions.ts`.)
- "We have three agents investigating. This is either sophisticated orchestration or we have reinvented a meeting."

## Anti-pattern to show (do not run)

```text
Spawn 14 agents to rename the variable `amountPence` to `amountInPence`.
```

Ask: is this an optimisation? (No. It is a single sequential edit with shared files.)
