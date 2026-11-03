---
name: release-triage
description: Investigate a release-blocking defect without editing files until evidence has been gathered.
---

# Release Triage

Use this workflow for defects that may block a release.

## Phase A — establish evidence

1. Restate the reported symptom in one sentence.
2. Inspect the relevant implementation.
3. Inspect existing tests before proposing a fix.
4. Search logs or fixtures for corroborating evidence.
5. List:
   - observed facts
   - hypotheses
   - missing evidence

Do not edit files during this phase.

## Phase B — propose the smallest safe fix

1. Identify the exact violated invariant.
2. State the smallest code change that should restore it.
3. Identify the test that should fail before the fix.
4. Ask for approval before modifying files if the task was investigation-only.

## Phase C — verify

After approval:

1. Add or update the narrowest relevant test.
2. Implement the minimal code change.
3. Run the focused test.
4. Run the relevant test suite.
5. Report:
   - files changed
   - tests executed
   - observed results
   - remaining uncertainty

Never remove, skip or weaken tests merely to obtain a passing result.
