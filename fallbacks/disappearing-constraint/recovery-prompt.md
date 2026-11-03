# Recovery: fresh session from durable state

Start a new Claude Code session (`claude`) in the repo and paste:

```text
Before doing anything, read progress.md, CLAUDE.md, the tests, and the output of
git diff. List the constraints that must hold for this task, then propose the
next step. Do not edit files.
```

Expected: Claude lists the public-API constraint, the monotonic-status contract
and the generated-fixture rule, because they live in files rather than in a
conversation that could be summarised away.
