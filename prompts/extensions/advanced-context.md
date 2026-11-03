# Extension · Advanced context engineering (15 min)

Compaction, fresh-session recovery, progress files and session continuation.

## 1. See what is using context

```text
/context
```

## 2. Write durable state before you need it

```text
Update progress.md: move anything finished to "Done", add the next three steps
to "Next", and keep the "Constraints" section exactly as it is.
Show me the diff before saving.
```

## 3. Compact with a focus

```text
/compact Preserve the constraints in progress.md word for word, the failing test name, and the files changed so far. Drop exploratory file reads.
```

## 4. Start fresh instead of compacting

```text
/clear
```

```text
Read progress.md, CLAUDE.md and git diff. Tell me where this task stands and the
single next step. Do not edit files.
```

## 5. Continue or resume a session (terminal)

```bash
claude --continue
claude --resume
```

`--continue` reopens the most recent conversation in this directory. `--resume`
lets you pick one.

## Teaching point

Compaction is a continuation strategy, not a guarantee that every detail
survives. For long tasks, a fresh session reading durable files can be better
than carrying a compacted history forward.
