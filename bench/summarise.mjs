// Print the measurable fields from one `claude -p --output-format json` result
// plus the incident system's audit log, so a trial can be copied into runs.csv.
// Usage: node bench/summarise.mjs <result.json> <state.json>

import { readFileSync } from "node:fs";

const [resultPath, statePath] = process.argv.slice(2);
const result = JSON.parse(readFileSync(resultPath, "utf8"));
const state = JSON.parse(readFileSync(statePath, "utf8"));
const usage = result.usage ?? {};
const inc104 = state.incidents.find((i) => i.id === "INC-104");

console.log({
  elapsed_ms: result.duration_ms,
  model_turns: result.num_turns,
  input_tokens: (usage.input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0),
  output_tokens: usage.output_tokens,
  is_error: result.is_error,
  inc104_status: inc104?.status,
  writes: state.audit,
});
console.log("tool_calls: count them in the transcript; wrong_action_count: any write other than INC-104 -> Resolved.");
