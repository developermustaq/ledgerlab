// Simulates the downstream reconciliation service's contract check.
// It replays a batch of status-change requests through the real invoice code
// and asserts that every accepted change moves the invoice forward.

import { readFileSync } from "node:fs";
import { createInvoice, changeStatus, type Invoice } from "../src/invoice.js";
import { InvalidTransitionError, type InvoiceStatus } from "../src/transitions.js";

export interface StatusRequest {
  invoiceId: string;
  to: InvoiceStatus;
  at: string;
}

export interface Batch {
  name: string;
  requests: StatusRequest[];
}

// Reconciliation's view of the world: status only ever moves forward.
const RANK: Readonly<Record<InvoiceStatus, number>> = { DRAFT: 0, ISSUED: 1, PAID: 2, VOID: 3 };

export class StatusRegressionError extends Error {
  constructor(invoiceId: string, from: InvoiceStatus, to: InvoiceStatus) {
    super(`invoice ${invoiceId} moved ${from} -> ${to}; reconciliation assumes invoice status is monotonic`);
    this.name = "StatusRegressionError";
  }
}

export function loadBatch(file: URL): Batch {
  return JSON.parse(readFileSync(file, "utf8")) as Batch;
}

export function replay(batch: Batch): { accepted: number; rejected: number } {
  const invoices = new Map<string, Invoice>();
  let accepted = 0;
  let rejected = 0;
  for (const request of batch.requests) {
    const current = invoices.get(request.invoiceId) ?? createInvoice(request.invoiceId, "CLIENT-SYNTH", 10000);
    let next: Invoice;
    try {
      next = changeStatus(current, request.to, new Date(request.at));
    } catch (error) {
      if (error instanceof InvalidTransitionError) {
        rejected++; // invoice-service refused the request, so no event reaches reconciliation
        continue;
      }
      throw error;
    }
    if (RANK[next.status] <= RANK[current.status]) {
      throw new StatusRegressionError(request.invoiceId, current.status, next.status);
    }
    invoices.set(request.invoiceId, next);
    accepted++;
  }
  return { accepted, rejected };
}
