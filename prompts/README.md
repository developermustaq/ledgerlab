# Prompt library

Every prompt used in the 120-minute workshop, in running order. Each file says
who runs it, which branch to be on, the exact text to paste, what a good result
looks like, and what to do if it stalls.

**The presenter rule for every live demo:** if Claude has not reached the next
checkpoint in 60–90 seconds, move to the prepared checkpoint. Do not narrate a
spinner. See [`presenter/recovery-rules.md`](presenter/recovery-rules.md).

**The teaching rhythm:** Explain → Predict → Watch → Try → Verify → Debrief.

## Core session (120 min)

| Time | Segment | Lead | File |
|---|---|---|---|
| before | Participant preflight | Participants | [core/00-preflight.md](core/00-preflight.md) |
| 00:00–00:07 | Cold open: release is blocked | James | [core/01-cold-open.md](core/01-cold-open.md) |
| 00:07–00:16 | What Claude Code actually is | James → Mustaq | [core/02-model-vs-harness.md](core/02-model-vs-harness.md) |
| 00:16–00:27 | Context, state and compaction | Mustaq | [core/03-context-and-compaction.md](core/03-context-and-compaction.md) |
| 00:27–00:34 | Hands-on checkpoint | Both | [core/04-first-investigation.md](core/04-first-investigation.md) |
| 00:34–00:42 | `CLAUDE.md` vs Skill vs agent | James | [core/05-claude-md-skill-agent.md](core/05-claude-md-skill-agent.md) |
| 00:42–00:57 | Demo + exercise: Skill-driven triage | Mustaq | [core/06-skill-triage.md](core/06-skill-triage.md) |
| 00:57–01:02 | Reset / questions | Both | [presenter/reset-break.md](presenter/reset-break.md) |
| 01:02–01:13 | Agent delegation | James → Mustaq | [core/07-agent-delegation.md](core/07-agent-delegation.md) |
| 01:13–01:26 | Parallel investigation | Mustaq | [core/08-parallel-investigation.md](core/08-parallel-investigation.md) |
| 01:26–01:36 | Result synthesis + verification | James | [core/09-synthesis-and-verification.md](core/09-synthesis-and-verification.md) |
| 01:36–01:48 | MCP vs browser experiment | Mustaq | [core/10-mcp-vs-browser.md](core/10-mcp-vs-browser.md) |
| 01:48–01:55 | Permissions / security | James | [core/11-permissions-and-security.md](core/11-permissions-and-security.md) |
| 01:55–02:00 | Final retrieval challenge | Both | [core/12-final-retrieval.md](core/12-final-retrieval.md) |

## Optional extensions (15–30 min each)

| Extension | File |
|---|---|
| Advanced context engineering | [extensions/advanced-context.md](extensions/advanced-context.md) |
| Hooks and policy enforcement | [extensions/hooks-and-policy.md](extensions/hooks-and-policy.md) |
| Advanced MCP security | [extensions/mcp-security.md](extensions/mcp-security.md) |
| API and automation (`claude -p`, CI) | [extensions/headless-and-ci.md](extensions/headless-and-ci.md) |
| Local models architecture discussion | [extensions/local-models.md](extensions/local-models.md) |
| Open engineering clinic | [extensions/engineering-clinic.md](extensions/engineering-clinic.md) |

## Presenter kit

| File | Use |
|---|---|
| [presenter/recovery-rules.md](presenter/recovery-rules.md) | What to do when a demo stalls or fails |
| [presenter/waiting-questions.md](presenter/waiting-questions.md) | Questions for the room while Claude runs |
| [presenter/reset-break.md](presenter/reset-break.md) | The 5-minute catch-up and reset |
| [presenter/rehearsal-checklist.md](presenter/rehearsal-checklist.md) | Rehearsal runs, including deliberate failures |

## Conventions

- Text in a `text` block is pasted into Claude Code exactly as written.
- Text in a `bash` block is run in your terminal, not in Claude.
- Branch names refer to the checkpoints in the main [README](../README.md#checkpoints).
- All data is fictional. Never put real client data, credentials or keys in a prompt.
