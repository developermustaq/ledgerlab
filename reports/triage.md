# Release triage: v0.8.0 (reference report)

Hand-written reference showing what a good `release-triage` run should
establish. Your Claude output will be worded differently; compare behaviour
using `expected/checklist.md`.

## Phase A: evidence

**Symptom:** release v0.8.0 is blocked because `contract:reconciliation` fails
when a PAID invoice moves back to DRAFT.

**Observed facts**
- `src/transitions.ts`: `ALLOWED_TRANSITIONS.PAID` is `["DRAFT"]`. In v0.7.0 it was `[]`
  (`git show 8374a38 -- src/transitions.ts`, commit "Allow reopening paid invoices for corrections (LL-142)").
- `tests/invoice.test.ts`: 7 tests, all passing. None exercises a transition out of `PAID`.
- `logs/ci-failure.log`: `StatusRegressionError: invoice INV-1007 moved PAID -> DRAFT`;
  reconciliation "assumes invoice status is monotonic"; the ledger already holds a posted entry for INV-1007.
- The log notes the step passed in pipelines #415 and #416 because those batches had no reopened invoices.

**Hypotheses**
- The LL-142 change is the sole cause of the contract failure.
- The failure is intermittent because it depends on whether a replay batch contains a reopened invoice.

**Missing evidence**
- The reconciliation service source is not in this repo; its contract is known only from the log.
- Whether any real (non-replay) invoice was reopened since v0.8.0 was tagged.

No files were edited in this phase.

## Phase B: smallest safe fix

- **Violated invariant:** invoice status is monotonic; PAID is terminal
  (corrections use a credit note, per the v0.7.0 comment).
- **Smallest change:** `PAID: []` in `src/transitions.ts`. No signature changes.
- **Test that should fail first:** `changeStatus(paidInvoice, "DRAFT")` throws `InvalidTransitionError`.
- **Approval needed** before editing, because this run was investigation-only.

**Recommendation:** BLOCK the release until the regression test and fix land.
LL-142's correction need should be met with a credit-note flow, not by reopening.
