# 12 · Recap: rebuild the workflow

> **The idea:** reliable is not autonomous. Reliable means bounded, observable and verifiable.

## Answer from memory, then check

<details><summary>Where do durable project rules go?</summary>

`CLAUDE.md` (chapter 05). Loaded every session, survives compaction (chapter 04).
</details>

<details><summary>Where does a repeatable procedure go?</summary>

A skill (chapter 06), like `release-triage`.
</details>

<details><summary>When should you use a subagent?</summary>

When the work benefits from specialisation or isolated context (chapter 07).
</details>

<details><summary>When should you parallelise?</summary>

When workstreams are genuinely independent, and the cost is worth it. Measure it (chapter 08).
</details>

<details><summary>When should you prefer MCP?</summary>

When a structured external capability is available and appropriate (chapter 10).
</details>

<details><summary>When might browser or computer use make more sense?</summary>

When the work is exposed mainly through a web page or desktop UI rather than a suitable structured tool (chapter 10).
</details>

<details><summary>What proves the fix works?</summary>

Test output, the diff and observable state that you ran yourself, not Claude's confidence (chapters 06 and 09).
</details>

## The opening vote, revisited

Chapter 01 asked which prompt to send first. The answer the walkthrough built:
**investigate first (B), use the log as evidence (C), in a mode or with a skill
that actually blocks edits**, then prove the fix red → green.

## The whole flow

Intent → context (`CLAUDE.md`, `progress.md`) → skill (`release-triage`) →
read-only agents → MCP for external systems → verification (tests, contract,
audit log) → human approval.

## One-week challenge

Pick one repetitive engineering task from your own work, in a sandbox:

1. Write its rules (a `CLAUDE.md` section).
2. Package its procedure (a skill).
3. Delegate one bounded, read-only step (a subagent).
4. Measure before and after (`claude -p --output-format json` gives tokens, turns and time).
5. Write down the permission boundaries.

Don't build an agent swarm. Build one workflow that works.

**Back to the start →** [00 · Start here](00-start-here.md)
