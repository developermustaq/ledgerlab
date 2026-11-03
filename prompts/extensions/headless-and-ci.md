# Extension · API and automation: `claude -p`, JSON output, CI (15 min)

Non-interactive runs with explicit limits. Prefer allow-lists and permission
modes over turning permissions off.

## 1. A read-only headless triage

```bash
claude -p "/release-triage Investigate why a PAID invoice can become DRAFT. Do not edit files." \
  --permission-mode plan \
  --max-turns 15 \
  --output-format json > triage.json
```

`--max-turns` caps agentic turns (print mode only). `--output-format json`
returns the result plus session metadata such as cost and usage.

## 2. Verification job: run tests, deny everything else that would prompt

```bash
claude -p "Run the unit tests and report pass/fail counts. Do not edit files." \
  --permission-mode dontAsk \
  --allowedTools "Bash(npm test *),Bash(npm test)" \
  --output-format json
```

`dontAsk` denies any call that would otherwise prompt, so the run cannot drift
into edits or network calls.

## 3. Structured output for a CI gate

```bash
claude -p "Inspect logs/ci-failure.log. Is the release blocked?" \
  --permission-mode plan \
  --output-format json \
  --json-schema '{"type":"object","properties":{"decision":{"type":"string","enum":["BLOCKED","READY","REVIEW"]},"evidence":{"type":"array","items":{"type":"string"}}},"required":["decision","evidence"]}'
```

The answer is in the `structured_output` field. Check that the field exists before using it.

## 4. Reproducible CI runs

Add `--bare` in CI to skip auto-discovery of local hooks, skills, plugins, MCP
servers and `CLAUDE.md`, so the result does not depend on a developer's machine.
Bare mode needs an API key from the environment or a secret store, never one in the repo.

## Teaching point

Measure before and after: record turns, tokens, duration and success for the same task.
