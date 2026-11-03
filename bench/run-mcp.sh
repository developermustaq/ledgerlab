#!/usr/bin/env bash
# One measured trial of the MCP route. Resets the incident state first.
# Usage: bench/run-mcp.sh <run_id>
set -euo pipefail

cd "$(dirname "$0")/.."
run_id="${1:?usage: bench/run-mcp.sh <run_id>}"
mkdir -p bench/results

npm run -s incidents:reset

# Only the two incident tools are pre-approved; nothing else can run unattended.
claude -p "$(cat bench/task.txt)" \
  --output-format json \
  --permission-mode dontAsk \
  --allowedTools "mcp__incidents__get_incident,mcp__incidents__update_incident_status" \
  > "bench/results/${run_id}-mcp.json"

cp .incident-state.json "bench/results/${run_id}-mcp-state.json"
node bench/summarise.mjs "bench/results/${run_id}-mcp.json" "bench/results/${run_id}-mcp-state.json"
