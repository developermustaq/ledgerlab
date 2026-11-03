# 09 · Verification

> **The idea:** fluent answers are not evidence. Label every conclusion FACT,
> INFERENCE or UNKNOWN, and prove the facts.

## The concept

After the investigators report, sort what you have:

| Statement | Verdict | How to check |
|---|---|---|
| `PAID` allows `DRAFT` in `ALLOWED_TRANSITIONS` | **Fact** | [`src/transitions.ts`](../src/transitions.ts) |
| The defect came from the LL-142 commit | **Fact** | `git show 8374a38 -- src/transitions.ts` |
| No existing test covers PAID → DRAFT | **Fact** | read [`tests/invoice.test.ts`](../tests/invoice.test.ts): 7 tests, none from PAID |
| The contract fails only for batches with a reopened invoice | **Fact here** | `npm run ci:contract`, and the two files in [`contract/batches/`](../contract/batches/) |
| No customer was affected | **Unknown** | there is no production data, and there should not be |
| "Fixed, all tests pass" | **Assertion** until you run them | `npm test` and `npm run ci:contract` yourself |

## Reproduce it

After the parallel investigation (chapter 08), in the same session:

```text
For each FACT in your release recommendation, give the exact file and line,
or the command and its output, that proves it.
Downgrade anything you cannot prove to INFERENCE.
List what we would need to check to turn each UNKNOWN into a FACT.
```

Then verify yourself:

```bash
git log --oneline -- src/transitions.ts
npm test
npm run ci:contract
npm run where
```

## What it shows

Verification is something *you* run: test output, diffs and observable state.
The model's confidence is not part of the evidence.

## Misconception

> "Claude says the bug is fixed." Excellent. Now ask the less optimistic member
> of the team: the test suite.

**Next →** [10 · MCP vs browser](10-mcp-vs-browser.md)
