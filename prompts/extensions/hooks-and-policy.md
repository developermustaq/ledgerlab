# Extension · Hooks and policy enforcement (15 min)

Hooks are commands the **harness** runs at fixed points (for example before or
after a tool call). Unlike a prompt or `CLAUDE.md`, they are not suggestions to
the model: they always run. Reference: https://code.claude.com/docs/en/hooks

## Ideas for LedgerLab guardrails

| Guardrail | Hook idea |
|---|---|
| Never weaken tests | After an edit to `tests/`, fail if the number of `it(` blocks went down |
| Typecheck after edits | After an edit to `src/`, run `npm run typecheck` |
| No secrets in source | Before a write, block content matching key-like patterns |
| No dangerous commands | Before a Bash call, block `rm -rf`, `git push --force` |

## Prompt: let Claude draft one, then review it yourself

```text
Propose a Claude Code hook for this repo that runs `npm run typecheck` after any
edit to a file under src/. Use the current hook configuration format from the
official docs, show me the exact JSON to add to .claude/settings.json, explain
when it fires, and do not write the file until I approve.
```

Check the JSON against the docs before you accept it. Then view what is configured:

```text
/hooks
```

## Teaching point

Prompt = request. `CLAUDE.md` = durable guidance. Permission rules = what the
harness allows. Hooks = what the harness always does.
