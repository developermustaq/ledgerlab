// "Where am I in the story?" Runs the unit tests and the contract check, inspects
// the transition rule, and tells you which walkthrough step this checkout matches.
// Usage: npm run where

import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

function vitest(args) {
  const run = spawnSync("npx", ["vitest", "run", "--reporter=json", ...args], { encoding: "utf8" });
  const json = JSON.parse(run.stdout.slice(run.stdout.indexOf("{")));
  return { passed: json.numPassedTests, failed: json.numFailedTests, total: json.numTotalTests };
}

const branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { encoding: "utf8" }).trim();
const rule = readFileSync("src/transitions.ts", "utf8");
const bugPresent = /PAID:\s*\[\s*"DRAFT"\s*\]/.test(rule);
const hasRegressionTest = readFileSync("tests/invoice.test.ts", "utf8").includes("rejects PAID -> DRAFT");
const unit = vitest([]);
const contract = vitest(["--config", "vitest.contract.config.ts"]);

const line = (label, value) => console.log(`  ${label.padEnd(26)} ${value}`);
console.log(`\nLedgerLab · where am I?   (branch: ${branch})\n`);
line("Transition rule", bugPresent ? 'PAID: ["DRAFT"]   (bug present)' : "PAID: []          (fixed)");
line("Regression test", hasRegressionTest ? '"rejects PAID -> DRAFT" present' : "missing");
line("npm test", `${unit.passed}/${unit.total} passed${unit.failed ? `, ${unit.failed} FAILED` : ""}`);
line("npm run ci:contract", `${contract.passed}/${contract.total} passed${contract.failed ? `, ${contract.failed} FAILED` : ""}`);

let step;
if (bugPresent && !hasRegressionTest) {
  step = [
    "STEP 1 · The blocked release (walkthrough/01).",
    "Unit tests are green because none of them covers PAID -> DRAFT, yet the",
    "downstream contract fails on the batch with a reopened invoice. Investigate before editing.",
  ];
} else if (bugPresent && hasRegressionTest) {
  step = [
    "STEP 3 · Red (walkthrough/06, Phase C).",
    "The new regression test fails, which proves it catches the bug. Now make the smallest fix.",
  ];
} else if (!bugPresent && hasRegressionTest) {
  step = [
    "STEP 4 · Green (walkthrough/06, Phase C).",
    "Smallest fix applied, regression test passes, contract passes. This is evidence, not a claim.",
  ];
} else {
  step = [
    "Fixed, but there is no regression test. Add one so the bug cannot quietly come back",
    '(see tests/invoice.test.ts on branch workshop/checkpoint-02-tested).',
  ];
}
console.log("\n  " + step.join("\n  ") + "\n");
