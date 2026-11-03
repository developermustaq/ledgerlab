# 05 · `CLAUDE.md` vs Skill vs agent

**Time:** 00:34–00:42 · **Lead:** James · **Branch:** `main`

## The three control layers

| Layer | Holds | Loaded | In this repo |
|---|---|---|---|
| `CLAUDE.md` | Durable facts and rules for the project | Every session | `CLAUDE.md` |
| Skill | A repeatable procedure | Description always; body only when used | `.claude/skills/release-triage/SKILL.md` |
| Agent (subagent) | A delegated role with its own context and tool limits | When delegated to | `.claude/agents/*.md` |

Rule of thumb: when a section of `CLAUDE.md` has grown into a *procedure*
rather than a *fact*, it becomes a Skill.

## Audience exercise: classify three instructions

Put these on screen and ask the room to vote: `CLAUDE.md`, Skill, or agent?

1. "Unit tests run with `npm test`. Never weaken a failing test to make CI green."
2. "When a release is blocked: gather evidence without editing, propose the smallest fix, get approval, then add a test, fix and verify."
3. "Read the 400-line CI log and report the blast radius, without filling my main conversation with the log."

**Answers:** 1 → `CLAUDE.md` (a durable rule). 2 → Skill (a procedure).
3 → agent (isolated context, read-only role, returns only a summary).

## Show the files (no prompt needed)

```bash
cat CLAUDE.md
cat .claude/skills/release-triage/SKILL.md
cat .claude/agents/qa-investigator.md
```

## Optional live check

```text
/skills
```

It lists the available skills, including `release-triage`.
