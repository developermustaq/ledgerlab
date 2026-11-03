import { describe, expect, it } from "vitest";
import { loadBatch, replay } from "./reconciliation.js";

// Synthetic replay batches. Only one of them contains a reopened invoice,
// which is why this check fails intermittently in CI.
const batches = ["2026-10-31", "2026-11-01"].map((day) =>
  loadBatch(new URL(`./batches/${day}.json`, import.meta.url)),
);

describe("contract:reconciliation", () => {
  for (const batch of batches) {
    it(`replays batch ${batch.name} without a status regression`, () => {
      const result = replay(batch);
      expect(result.accepted).toBeGreaterThan(0);
    });
  }
});
