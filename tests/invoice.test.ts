import { describe, expect, it } from "vitest";
import { changeStatus, createInvoice } from "../src/invoice.js";
import { InvalidTransitionError } from "../src/transitions.js";
import { draftInvoice, issuedInvoice, paidInvoice, voidInvoice } from "./fixtures.js";

describe("createInvoice", () => {
  it("starts in DRAFT with no history", () => {
    const invoice = createInvoice("INV-2001", "CLIENT-A", 1000);
    expect(invoice.status).toBe("DRAFT");
    expect(invoice.history).toEqual([]);
  });

  it("rejects a non-positive amount", () => {
    expect(() => createInvoice("INV-2002", "CLIENT-A", 0)).toThrow(RangeError);
  });
});

describe("changeStatus", () => {
  it("moves DRAFT -> ISSUED -> PAID and records history", () => {
    const at = new Date("2026-10-10T10:00:00.000Z");
    const issued = changeStatus(draftInvoice, "ISSUED", at);
    const paid = changeStatus(issued, "PAID", at);
    expect(paid.status).toBe("PAID");
    expect(paid.history.map((h) => `${h.from}->${h.to}`)).toEqual(["DRAFT->ISSUED", "ISSUED->PAID"]);
  });

  it("does not mutate the original invoice", () => {
    changeStatus(draftInvoice, "ISSUED");
    expect(draftInvoice.status).toBe("DRAFT");
  });

  it("allows ISSUED -> VOID", () => {
    expect(changeStatus(issuedInvoice, "VOID").status).toBe("VOID");
  });

  it("rejects DRAFT -> PAID", () => {
    expect(() => changeStatus(draftInvoice, "PAID")).toThrow(InvalidTransitionError);
  });

  it("rejects VOID -> ISSUED", () => {
    expect(() => changeStatus(voidInvoice, "ISSUED")).toThrow(InvalidTransitionError);
  });

  // Regression: reconciliation requires monotonic status (logs/ci-failure.log, INV-1007).
  it("rejects PAID -> DRAFT", () => {
    expect(() => changeStatus(paidInvoice, "DRAFT")).toThrow(InvalidTransitionError);
  });
});
