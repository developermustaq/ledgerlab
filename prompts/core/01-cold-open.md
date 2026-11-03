# 01 · Cold open: "Release is blocked"

**Time:** 00:00–00:07 · **Lead:** James · **Branch:** `main`

## Goal

Create tension, and surface the room's assumptions before any terminology appears.

## Setup (on screen)

```bash
cat logs/ci-failure.log | tail -12
```

Say it plainly: LedgerLab is a fictional sandbox, not a real company's codebase.

## Audience vote

> "Something is wrong, the release is due, and we need to know what changed
> before we let an AI modify anything. What do we do first?"
>
> A. Let Claude edit the code immediately
> B. Investigate first
> C. Inspect CI first

Do not reveal an answer. Come back to the vote in [12-final-retrieval.md](12-final-retrieval.md).

## The tempting prompt (show it, do NOT run it)

```text
Fix the failing tests.
```

Ask: "What could go wrong with this prompt?" Answers to draw out:
- No tests are failing locally (7 pass), so "fix the tests" is aimed at the wrong place.
- It invites weakening tests to get green.
- It gives no boundary on what may be edited.
