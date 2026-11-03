# Extension · Open engineering clinic (20–30 min)

Participants map their own workflow onto Skill, agent and MCP candidates.
Describe workflows in general terms only: no client names, identifiers or real data.

## Worksheet (one per person)

| Question | Your answer |
|---|---|
| A task your team repeats weekly | |
| The rule that must never be broken | → `CLAUDE.md` |
| The steps you always follow | → Skill |
| A part that is independent and read-only | → subagent |
| An external system it touches | → MCP tool (read first, write with approval) |
| What evidence proves it worked | → verification step |
| The permission you would refuse | → deny rule |

## Prompt to try (in this sandbox, not on real systems)

```text
I want to turn this weekly task into a Claude Code workflow: <two sentences, no real data>.
Propose: one CLAUDE.md rule, one Skill outline, at most one read-only subagent,
any MCP tool it would need, the evidence that proves success, and the
permission rules. Keep each part as small as possible. Do not create files.
```

## Rule for the clinic

Don't build an agent swarm. Build one workflow that works.
