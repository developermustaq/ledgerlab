#!/usr/bin/env bash
# Re-run the measured Claude Code scenarios from the session and print their numbers.
# Every run is read-only (plan mode). Results land in bench/results/ (git-ignored).
#
# Usage: bench/measure.sh haystack | recovery | agents
# Optional: MODEL=claude-opus-5-5 bench/measure.sh haystack   (pin both runs to one model)
#
# These runs use your Claude Code account and real tokens (roughly 100k-550k per run).
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p bench/results
scenario="${1:?usage: bench/measure.sh haystack | recovery | agents}"
stamp="$(date +%Y%m%d-%H%M%S)"
model_args=()
[[ -n "${MODEL:-}" ]] && model_args=(--model "$MODEL")

run() { # name, prompt, extra args...
  local name="$1" prompt="$2"; shift 2
  local out="bench/results/${stamp}-${name}.json"
  echo "running ${name} ..." >&2
  claude -p "$prompt" --output-format json --permission-mode plan "${model_args[@]}" "$@" < /dev/null > "$out"
  node bench/summarise-run.mjs "$name" "$out"
}

case "$scenario" in
  haystack)
    # Same question twice. A may only read the whole log; B may only search it.
    run "A-read-whole-log" \
      "Read logs/ci-full.log in full and tell me why CI failed. Quote the exact error lines. Do not edit files." \
      --disallowedTools "Grep,Glob,Bash,Agent"
    run "B-search-error-lines" \
      "Find why CI failed using only the error lines in logs/ci-full.log: search for them, do not read the whole file. Quote the exact error lines. Do not edit files." \
      --disallowedTools "Read,Bash,Agent"
    ;;
  recovery)
    # A fresh session with no history rebuilds the task's constraints from files.
    run "fresh-session-recovery" \
      "Before doing anything, read progress.md, CLAUDE.md, the tests, and the output of git diff. List the constraints that must hold for this task, then propose the next step. Do not edit files."
    ;;
  agents)
    # The same investigation with one agent, then with three parallel subagents.
    run "single-agent" \
      "We need a release decision for the invoice-status defect. Investigate it yourself: the state-transition implementation, the current tests, and logs/ci-failure.log. Do not edit any files. Give a release recommendation and mark each conclusion FACT / INFERENCE / UNKNOWN." \
      --disallowedTools "Agent"
    run "three-agents" "We need a release decision for the invoice-status defect.

Run these independent investigations in parallel where appropriate:
- developer-reviewer: inspect the state-transition implementation and identify the likely defect.
- qa-investigator: inspect current tests and identify the smallest missing regression test.
- ops-reviewer: inspect logs/ci-failure.log and identify the operational symptom and blast radius.

Do not edit any files.
After all three return, synthesise a release recommendation.
Explicitly mark each conclusion as: FACT / INFERENCE / UNKNOWN."
    ;;
  *)
    echo "unknown scenario: $scenario (use haystack, recovery or agents)" >&2
    exit 1
    ;;
esac
