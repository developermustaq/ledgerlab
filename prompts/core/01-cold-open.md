# 01 · Cold open: "Release is blocked"

**Time:** 00:00–00:07 · **Lead:** James · **Branch:** `main`

## Goal

Create tension, and surface the room's assumptions before any terminology appears.

## Setup (on screen)

```bash
cat logs/ci-failure.log | tail -12
```

Say it plainly: LedgerLab is a fictional sandbox, not a real company's codebase.

## Audience vote: which prompt would you send first?

Point at each option and ask for hands. Do not reveal an answer yet.

| | Prompt |
|---|---|
| **A** | `Fix the failing tests.` |
| **B** | `Why is v0.8.0 blocked? Investigate only, don't edit.` |
| **C** | `Read the CI log and tell me what failed.` |

Do not run any of them here. They are for discussion.

## What could go wrong with each

**A · "Fix the failing tests."**
- Nothing fails locally (7 tests pass), so it aims Claude at the wrong target.
- Claude may hunt for something to change, weaken or skip a test to get green,
  or edit the CI job or the generated fixtures.
- It may report "fixed" with no evidence. Nothing limits what it may edit.

**B · "Why is v0.8.0 blocked? Investigate only, don't edit."**
- The right instinct: evidence before edits (`src/transitions.ts`, `git log`, the CI log).
- But a prompt is a request, not a boundary. Claude can still edit unless the
  permission mode or tool rules enforce it (Plan mode, or the release-triage skill plus approval).
- It may stop at a plausible guess unless you ask for files and evidence.

**C · "Read the CI log and tell me what failed."**
- Finds the symptom fast (INV-1007, `StatusRegressionError`), but that is the symptom, not the cause.
- A long log pasted into context is noise ("you imported the haystack").
- Claude may call it flaky and retry, or patch the CI check instead of the code.

**Land it:** B is the best start, using C's log as evidence, in a mode that
actually blocks edits. The rest of the session builds exactly that. Come back to
this vote in [12-final-retrieval.md](12-final-retrieval.md).
