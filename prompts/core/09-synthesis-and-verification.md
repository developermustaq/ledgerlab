# 09 · Result synthesis and verification

**Time:** 01:26–01:36 · **Lead:** James · **Branch:** `main`

## Goal

Decide which findings are **evidence** and which are **assertions**. "If Claude
says tests passed, the task is done" is a misconception: test output, diffs and
observable state are the evidence.

## Prompt: challenge the synthesis (same session as 08)

```text
For each FACT in your release recommendation, give the exact file and line,
or the command and its output, that proves it.
Downgrade anything you cannot prove to INFERENCE.
List what we would need to check to turn each UNKNOWN into a FACT.
```

## Audience exercise: evidence or assertion?

| Statement | Verdict | How to check |
|---|---|---|
| "`PAID` allows `DRAFT` in `ALLOWED_TRANSITIONS`." | Evidence | `src/transitions.ts` |
| "The defect came from the LL-142 change." | Evidence | `git log -p -- src/transitions.ts` |
| "No existing test covers PAID → DRAFT." | Evidence | read `tests/invoice.test.ts`; 7 tests, none from PAID |
| "Reconciliation fails only when a batch has a reopened invoice." | Inference | the log suggests it; the reconciliation code is not in this repo |
| "No customer was affected." | Unknown | no production data available, and none should be |
| "The fix is done, all tests pass." | Assertion until you run it | `npm test` yourself |

## Verify it yourself, live

```bash
git log --oneline -- src/transitions.ts
git show 8374a38 -- src/transitions.ts
npm test
```

## Debrief line

"Claude says the bug is fixed. Excellent. Now we ask the less optimistic member
of the team: the test suite."
