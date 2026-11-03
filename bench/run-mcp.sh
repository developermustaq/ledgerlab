#!/usr/bin/env bash
# One measured trial of the MCP route. Resets the incident state first.
# Usage: bench/run-mcp.sh <run_id>
set -euo pipefail

cd "$(dirname "$0")/.."
run_id="${1:?usage: bench/run-mcp.sh <run_id>}"
mkdir -p bench/results

# INC-104's note claims the fix landed; measure on the fixed code so both routes do the same task.
if grep -q 'PAID: \["DRAFT"\]' src/transitions.ts; then
  echo "The PAID -> DRAFT fix is not on this branch. Run: git switch workshop/checkpoint-03-fixed" >&2
  exit 1
fi

npm run -s incidents:reset

# Only the two incident tools are pre-approved; nothing else can run unattended.
claude -p "$(cat bench/task.txt)" \
  --output-format json \
  --permission-mode dontAsk \
  --allowedTools "mcp__incidents__get_incident,mcp__incidents__update_incident_status" \
  > "bench/results/${run_id}-mcp.json"

cp .incident-state.json "bench/results/${run_id}-mcp-state.json"
node bench/summarise.mjs "bench/results/${run_id}-mcp.json" "bench/results/${run_id}-mcp-state.json"
