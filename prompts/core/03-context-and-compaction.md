# 03 · Context, state and compaction ("the disappearing constraint")

**Time:** 00:16–00:27 · **Lead:** Mustaq (James covers tokens, budget and compaction) · **Branch:** `main`

## Goal

Context is working memory, not permanent truth. Keep durable state in code,
tests, plans, `CLAUDE.md`, Skills and progress files. Use the conversation for
the active reasoning loop.

**Do not** try to force a real compaction on stage. Use the prepared artefact
in [`fallbacks/disappearing-constraint/`](../../fallbacks/disappearing-constraint/)
and keep the live terminal for the recovery.

## Step 1: set constraints early (show this as the "start of a long session")

```text
We are investigating release v0.8.0. Two constraints for the whole task:
1. You must not alter the public API (createInvoice, changeStatus, canTransition, assertTransition).
2. You must preserve the existing migration contract with reconciliation: invoice status is monotonic.
Acknowledge both, then wait.
```

## Step 2: the late request (after "a long session")

Show [`lossy-summary.md`](../../fallbacks/disappearing-constraint/lossy-summary.md),
then ask the room:

> "Which constraints must survive? Which ones are missing from this summary?
> What will Claude probably do next?"

Answer: both constraints and the fixture rule are gone. The suggested next step
changes `changeStatus`'s signature, keeps PAID → DRAFT and edits fixtures.

## Step 3: two recovery strategies

**A. Compact with a focus** (keeps the same conversation):

```text
/compact Keep every constraint from progress.md verbatim: public API frozen, monotonic status contract, generated fixtures untouched.
```

**B. Fresh session from durable state** (run `/clear` first, or start a new `claude`):

```text
Before doing anything, read progress.md, CLAUDE.md, the tests, and the output of
git diff. List the constraints that must hold for this task, then propose the
next step. Do not edit files.
```

Expected for B: Claude lists the public-API rule, the monotonic contract and the
fixture rule, because they live in files.

## Debrief line

"Conversation is working memory. The repository is durable memory."
