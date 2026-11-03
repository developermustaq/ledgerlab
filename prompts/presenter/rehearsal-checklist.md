# Presenter · Rehearsal checklist

Rehearse to 105–110 minutes, leaving buffer for setup variance, questions and
model unpredictability.

## Before rehearsal

- [ ] Fresh clone; `npm ci`; `npm test` shows 7 passed.
- [ ] `claude` signed in; project MCP server approved; `/mcp` shows `incidents` connected.
- [ ] `npm run incidents:web` serves http://localhost:4173/incidents/INC-104.
- [ ] Terminal font large enough to project.

## Run each demo at least twice

- [ ] Skill triage: compare each run against `expected/checklist.md` until the steps are stable.
- [ ] Three investigators: note how long each takes, and what they duplicate.
- [ ] MCP vs browser: 5 runs per route; fill `bench/runs.csv` (medians and failure counts).

## Rehearse deliberate failures

- [ ] Revoke the MCP permission (deny `mcp__incidents__*` in local settings) and recover.
- [ ] Make a test fail unexpectedly and recover with a checkpoint branch.
- [ ] Simulate a slow response and switch to the fallback within 90 seconds.

## Record fallbacks

- [ ] Screen recording of each demo's good run.
- [ ] Screenshots of the final triage report and the `/audit` page.

## Security review

- [ ] Every command and permission used on stage is in `.claude/settings.json` or approved live.
- [ ] No real data, credentials or keys anywhere on screen.
- [ ] `--dangerously-skip-permissions` is not used.
