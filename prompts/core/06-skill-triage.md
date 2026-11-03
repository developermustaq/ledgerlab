# 06 · Demo + exercise: Skill-driven triage ("Teach Claude the playbook")

**Time:** 00:42–00:57 · **Lead:** Mustaq · **Branch:** `main` · **Fallback:** `workshop/checkpoint-01-investigated` (`reports/triage.md`)

## Goal

Procedures belong in reusable Skills. Judge success by **behaviour**, not
wording, using [`expected/checklist.md`](../../expected/checklist.md).

## Part 1: the normal prompt (presenter, fresh session)

```text
Triage the invoice defect: a PAID invoice can go back to DRAFT and release v0.8.0 is blocked.
```

Note what it did and did not do: did it read the tests first? Did it separate
facts from guesses? Did it try to edit?

## Part 2: inspect the Skill before using it

```bash
cat .claude/skills/release-triage/SKILL.md
```

Ask the room to **predict** the steps Claude should now follow:
evidence → no edits → invariant → smallest fix → failing test → approval.

## Part 3: the same task with the Skill (`/clear` first)

```text
/release-triage
Investigate why a PAID invoice can become DRAFT.
Do not edit files.
Identify the violated rule, relevant test and smallest safe fix.
```

## YOUR TURN: 5 MINUTES

**Task**
Investigate why a PAID invoice can become DRAFT.

**Prompt**
The Part 3 prompt above.

**Success checkpoint**
You can name:
1. the faulty transition (`PAID: ["DRAFT"]` in `src/transitions.ts`)
2. the missing regression test (PAID → DRAFT should throw `InvalidTransitionError`)
3. the proposed minimal change (`PAID: []`)

**Stuck?**
```bash
git switch workshop/checkpoint-01-investigated
cat reports/triage.md
```

## Part 4 (presenter, if time): approve Phase C

```text
Approved. Proceed with Phase C of release-triage:
add the narrowest regression test first and show me it failing,
then make the minimal fix, run the focused test and the full suite,
and report files changed, tests executed, observed results and remaining uncertainty.
```

Verify it yourself afterwards. Do not trust the summary:

```bash
git diff
npm test
```

Fallback branches: `workshop/checkpoint-02-tested` (red), `workshop/checkpoint-03-fixed` (green).

## Debrief

Compare Part 1 with Part 3 against the checklist. Which output would survive a code review?
