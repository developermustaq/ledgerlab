// GENERATED FILE - do not edit by hand.
// Synthetic training data only: no real customers, references or amounts.

import type { Invoice } from "../src/invoice.js";

export const draftInvoice: Invoice = {
  id: "INV-1001",
  customerRef: "CLIENT-A",
  amountPence: 125000,
  status: "DRAFT",
  history: [],
};

export const issuedInvoice: Invoice = {
  id: "INV-1004",
  customerRef: "CLIENT-B",
  amountPence: 48000,
  status: "ISSUED",
  history: [{ from: "DRAFT", to: "ISSUED", at: "2026-10-01T09:00:00.000Z" }],
};

export const paidInvoice: Invoice = {
  id: "INV-1007",
  customerRef: "CLIENT-C",
  amountPence: 99900,
  status: "PAID",
  history: [
    { from: "DRAFT", to: "ISSUED", at: "2026-10-02T09:00:00.000Z" },
    { from: "ISSUED", to: "PAID", at: "2026-10-09T14:30:00.000Z" },
  ],
};

export const voidInvoice: Invoice = {
  id: "INV-1009",
  customerRef: "CLIENT-A",
  amountPence: 12000,
  status: "VOID",
  history: [{ from: "DRAFT", to: "VOID", at: "2026-10-03T11:15:00.000Z" }],
};
