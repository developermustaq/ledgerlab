# LedgerLab project guidance

## Purpose
LedgerLab is a training sandbox for invoice state transitions.
All data in this repository is fictional.

## Commands
- Install: npm ci
- Unit tests: npm test
- Focused tests: npm test -- invoice.test.ts
- Type check: npm run typecheck

## Engineering constraints
- Never edit generated fixtures.
- Do not change public function signatures unless explicitly requested.
- Prefer the smallest safe change.
- A code change is incomplete until relevant tests pass.
- Never disable or weaken a failing test to make CI green.

## Safety
Do not access external systems or credentials.
All work must remain inside this repository.
