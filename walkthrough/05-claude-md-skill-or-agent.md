# 05 · CLAUDE.md, skill or agent?

> **The idea:** facts and rules, repeatable procedures, and delegated roles each
> have their own home.

## The concept

| Layer | Holds | Loaded | In this repo |
|---|---|---|---|
| `CLAUDE.md` | Durable facts and rules for the project | Every session | [`CLAUDE.md`](../CLAUDE.md) |
| Skill | A repeatable procedure | Description at start; full body only when used | [`.claude/skills/release-triage/SKILL.md`](../.claude/skills/release-triage/SKILL.md) |
| Subagent | A delegated role with its own context and tool limits | When delegated to | [`.claude/agents/`](../.claude/agents/) |

Rule of thumb from the Claude Code docs: when a section of `CLAUDE.md` has grown
into a *procedure* rather than a *fact*, make it a skill.

## Try it: where does each instruction go?

Decide before reading the answers.

1. "Never weaken a failing test to make CI green."
2. "Every release: gather evidence, propose the smallest fix, get approval, then verify."
3. "Read the CI log and report the blast radius without filling my context."
4. "Fix this one typo in the README."

<details><summary>Answers</summary>

1. **`CLAUDE.md`**: a durable rule, needed every session.
2. **Skill**: a procedure you repeat; loaded when needed.
3. **Subagent**: isolated context, read-only role, returns a summary.
4. **Just a prompt**: one-off; nothing to package.

</details>

## Look at the real files

```bash
cat CLAUDE.md
cat .claude/skills/release-triage/SKILL.md
cat .claude/agents/qa-investigator.md
```

In Claude Code, `/skills` lists the available skills, including `release-triage`.

## Misconception

> "Skills save tokens automatically." Only the description is loaded up front,
> but once used, the skill's body stays in context. Skills are about organising
> procedures, not a guaranteed cost cut.

**Next →** [06 · A skill-driven triage](06-skill-driven-triage.md)
