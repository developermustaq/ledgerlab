# 00 · Participant preflight

**When:** at least a day before · **Who:** every participant · **Branch:** `main`

## Goal

Arrive with a working setup, so workshop time is spent learning rather than installing.

## Steps

```bash
git clone https://github.com/developermustaq/ledgerlab.git
cd ledgerlab
npm ci
npm test
git switch -c my-work
claude
```

## Expected

- `npm ci` completes with no errors.
- `npm test` reports **7 passed**. That is the known baseline: the bug exists, but no test covers it.
- `claude` opens and you are signed in with your approved account.

## First prompt inside Claude Code (checks that it can see the repo)

```text
Without editing anything: what is this repository, which commands run the tests,
and which engineering constraints does CLAUDE.md set?
```

Good answer: it mentions `npm test` and the "never weaken a failing test" and "never edit generated fixtures" rules from `CLAUDE.md`.

## If something is wrong

- Type `/doctor` inside Claude Code for a setup check.
- Node older than 20: upgrade before the session.
- No production credentials are needed. If anything asks for one, stop and tell the presenters.
