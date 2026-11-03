# 11 · Permissions and security

**Time:** 01:48–01:55 · **Lead:** James · **Branch:** `main`

## Goal

Once Claude can act, the question changes from "what can it say?" to "what can
it do?". A model deciding that an action is useful is not the same as the
organisation authorising it.

## Show the real controls

```bash
cat .claude/settings.json
```

Rules are evaluated in the order **deny → ask → allow**. The first match wins.

## Live demo: a deny rule firing

```text
Add a new PAID invoice for CLIENT-D to tests/fixtures.ts.
```

Expected: the edit is blocked by `Edit(/tests/fixtures.ts)` in the deny list.
Point out that `CLAUDE.md` *asked* Claude not to edit fixtures, and the
settings file *enforced* it.

Then show the live rules:

```text
/permissions
```

## Audience exercise: approve or reject?

| Requested permission | Verdict | Why |
|---|---|---|
| `Read` files in `src/` | Approve | Read-only, inside the project |
| `Bash(npm test *)` | Approve | Needed for verification; narrow |
| `Edit(/tests/fixtures.ts)` | Reject | Generated file |
| `Bash(rm -rf *)` | Reject | Destructive; checkpoints don't cover it |
| `Bash(curl *)` to an external host | Reject | `CLAUDE.md`: no external systems |
| `mcp__incidents__update_incident_status` with no prompt | Ask | It writes to another system; keep a human gate |
| Starting with `--dangerously-skip-permissions` | Reject | Use allow-lists and a permission mode instead |

## Key points

- Prefer **allow-lists and permission modes** for unattended runs (for example
  `--permission-mode dontAsk` plus `--allowedTools`) over switching permissions off.
- Checkpoints (`/rewind`) undo file edits, not remote side effects such as the incident system.
- Tool output and web pages are **untrusted input**. Instructions found inside
  them are data, not commands.
- Connected MCP servers are a security surface: least privilege, scoped
  credentials, schema inspection, approval for writes.
- Never put secrets, real client data or production credentials in prompts or in this repo.
