# 02 · What Claude Code actually is (model vs harness)

**Time:** 00:07–00:16 · **Lead:** James → Mustaq · **Branch:** `main`

## Goal

The model is one component. The **harness** (Claude Code) assembles
instructions, `CLAUDE.md`, skill descriptions, tool definitions and permissions,
sends them to the model, runs the tools the model asks for, and feeds the
results back. That is the agentic loop: gather context → act → verify.

## Live prompt (Mustaq)

```text
Read src/transitions.ts and tell me which transitions are allowed out of each status.
Do not edit anything.
```

While it runs, point at the screen:
1. The model **asked** for a file read (a tool call).
2. The harness **checked permission** (reads in the project need no approval).
3. The tool **returned** the file contents (a tool result, now part of the context).
4. The model **continued** and answered.

## Show what is in context

```text
/context
```

Point out that `CLAUDE.md`, skill descriptions and the tool result all occupy space.
Only the release-triage **description** is loaded, not its full body.

## Audience exercise: model or harness?

Ask the room to call out which component does each of these:

| Item | Answer |
|---|---|
| Decides the next step is to read a file | Model |
| Loads `CLAUDE.md` into the request | Harness |
| Blocks an edit to `tests/fixtures.ts` | Harness (deny rule in `.claude/settings.json`) |
| Runs `npm test` | Harness (executes the tool) |
| Reads the test output and draws a conclusion | Model |
| Summarises old conversation when the window fills | Harness (compaction) |
