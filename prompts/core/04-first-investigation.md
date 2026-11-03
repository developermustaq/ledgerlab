# 04 · Hands-on checkpoint: first investigation

**Time:** 00:27–00:34 · **Lead:** Both · **Branch:** `main` (or your `my-work` branch)

## YOUR TURN: 5 MINUTES

**Task**
Find out why release v0.8.0 is blocked. Change nothing.

**Prompt**
```text
Why is release v0.8.0 blocked?
Investigate only. Do not edit files.
Tell me which files you read and what evidence you found in each.
```

**Success checkpoint**
You can name:
1. the log that shows the failure (`logs/ci-failure.log`)
2. the invoice that triggered it (INV-1007)
3. the file where status transitions are defined (`src/transitions.ts`)

**Stuck?**
```bash
git switch workshop/checkpoint-00-start
```

## Optional: make "investigate only" a mode, not a request

Press `Shift+Tab` until the mode shows **Plan**, then rerun the prompt. In
Plan mode Claude explores and proposes without editing your source files.

## Presenter checks while the room works

- Who got a file edit they did not ask for? (Discuss: a prompt is a request, not a boundary.)
- Who saw Claude mention the git history (`git log`)?
