# Progress: release v0.8.0 investigation

Durable state for this task. A fresh session should read this file, the tests
and `git diff` before doing anything else.

## Constraints that must survive any compaction
1. Do not alter the public API (`createInvoice`, `changeStatus`, `canTransition`, `assertTransition`).
2. Preserve the downstream reconciliation contract: invoice status is monotonic
   (DRAFT -> ISSUED -> PAID, or -> VOID). No status may move backwards.
3. Do not edit `tests/fixtures.ts` (generated).

## Symptom
Release v0.8.0 is blocked. CI job `contract:reconciliation` fails intermittently.
See `logs/ci-failure.log`.

## Done
- (nothing yet)

## Next
- Establish evidence before editing anything.
