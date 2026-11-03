# 12 · Final retrieval challenge

**Time:** 01:55–02:00 · **Lead:** Both · **Slides:** off

## Goal

The room rebuilds the workflow from memory. Go back to the opening vote: what
should we have done first? (Investigate, with evidence, before editing.)

## Questions (James asks, the room answers aloud)

| Question | Answer |
|---|---|
| Where does durable project guidance go? | `CLAUDE.md` |
| Where does a repeatable triage procedure go? | A Skill |
| When should we use a subagent? | When the work benefits from specialisation or isolated context |
| When should we parallelise? | When workstreams are genuinely independent |
| When should we prefer MCP? | When a structured external capability is available and appropriate |
| When might browser or computer use make more sense? | When the work is exposed mainly through a webpage or desktop interface rather than a suitable structured tool |
| What counts as proof that the fix works? | Test output, the diff and observable state, not Claude's confidence |

## The one-week challenge (close)

Pick one repetitive engineering task. Write its rules. Delegate one bounded
step. Measure the result before and after, and write down the permission
boundaries.

## Take-home prompt

```text
Here is a task my team repeats every week: <describe it in two sentences>.
Should it be a CLAUDE.md rule, a Skill, a subagent, an MCP tool, or nothing?
Explain why, then draft the smallest version of it. Do not create files yet.
```
