// Generates logs/ci-full.log: a deliberately long, noisy CI log (synthetic) with
// the real failure buried inside. Used to show what a large tool result does to context.
// Deterministic: re-running produces the same file.

import { writeFileSync } from "node:fs";

let seed = 42;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = (items) => items[Math.floor(rand() * items.length)];

const start = Date.parse("2026-11-02T08:41:03Z");
let t = 0;
const stamp = () => new Date(start + (t += Math.floor(rand() * 400))).toISOString().replace(".000", "").replace(/\.\d+Z$/, "Z");
const lines = [];
const log = (msg) => lines.push(`[${stamp()}] ${msg}`);

log("pipeline ledgerlab-release #418 started (ref: release/v0.8.0, trigger: tag)");
log("runner: synthetic-runner-03 (fictional)");
for (let i = 0; i < 180; i++) {
  log(pick([
    `npm http fetch GET 200 https://registry.example.test/pkg-${Math.floor(rand() * 900)} ${Math.floor(rand() * 90)}ms (cache hit)`,
    `npm verb reify adding ${Math.floor(rand() * 40)} packages`,
    "npm warn deprecated inflight@1.0.6: This module is not supported",
    `npm timing build:link:node_modules/pkg-${Math.floor(rand() * 900)} Completed in ${Math.floor(rand() * 9)}ms`,
  ]));
}
log("step 2/6 npm ci ................................... ok (13.6s)");
log("step 3/6 typecheck ................................ ok (4.9s)");
log(" RUN  v3.2.4 /workspace/ledgerlab");
log(" ✓ tests/invoice.test.ts (7 tests) 3ms");
log("      Tests  7 passed (7)");
log("step 4/6 unit tests ............................... ok (2.7s)");
log("step 5/6 contract:reconciliation");
log("[recon] loading replay batch synthetic-batch-2026-11-01 (2,412 events)");

const statuses = [["DRAFT", "ISSUED"], ["ISSUED", "PAID"], ["DRAFT", "VOID"], ["ISSUED", "VOID"]];
while (lines.length < 1420) {
  const [from, to] = pick(statuses);
  const roll = rand();
  if (roll < 0.04) log(`[recon] WARN  cache miss for ledger snapshot 2026-10-${10 + Math.floor(rand() * 20)}, rebuilding (non-fatal)`);
  else if (roll < 0.07) log(`[recon] WARN  slow query on ledger_entries (${400 + Math.floor(rand() * 900)}ms) (non-fatal)`);
  else if (roll < 0.12) log(`[recon] DEBUG checkpoint ${Math.floor(rand() * 99999)} flushed`);
  else log(`[recon] INFO  replaying INV-${1100 + Math.floor(rand() * 8000)} ${from}->${to} ok`);
}
log("[recon] INFO  replaying INV-1007 DRAFT->ISSUED ok");
log("[recon] INFO  replaying INV-1007 ISSUED->PAID ok");
log("[recon] INFO  posted INV-1007 to ledger (99900 pence)");
log("[recon] INFO  replaying INV-1007 PAID->DRAFT accepted by invoice-service");
log("[recon] ERROR StatusRegressionError: invoice INV-1007 moved PAID -> DRAFT");
log("[recon] ERROR   reconciliation assumes invoice status is monotonic (DRAFT -> ISSUED -> PAID | VOID)");
log("[recon] ERROR   ledger already holds a posted entry for INV-1007; a DRAFT invoice must not have one");
while (lines.length < 1990) {
  const [from, to] = pick(statuses);
  const roll = rand();
  if (roll < 0.05) log(`[recon] WARN  retrying ledger write (attempt ${1 + Math.floor(rand() * 3)}) (non-fatal)`);
  else log(`[recon] INFO  replaying INV-${1100 + Math.floor(rand() * 8000)} ${from}->${to} ok`);
}
log("[recon] summary: 2,411 ok, 1 failed");
log("step 5/6 contract:reconciliation .................. FAILED (41.2s)");
log("step 6/6 publish release notes ................... skipped");
log("pipeline ledgerlab-release #418 FAILED: release v0.8.0 blocked");

writeFileSync(new URL("../logs/ci-full.log", import.meta.url), lines.join("\n") + "\n");
console.log(`wrote logs/ci-full.log (${lines.length} lines)`);
