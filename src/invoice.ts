import { assertTransition, type InvoiceStatus } from "./transitions.js";

export interface StatusChange {
  from: InvoiceStatus;
  to: InvoiceStatus;
  at: string;
}

export interface Invoice {
  id: string;
  customerRef: string;
  amountPence: number;
  status: InvoiceStatus;
  history: StatusChange[];
}

export function createInvoice(id: string, customerRef: string, amountPence: number): Invoice {
  if (!Number.isInteger(amountPence) || amountPence <= 0) {
    throw new RangeError("amountPence must be a positive integer");
  }
  return { id, customerRef, amountPence, status: "DRAFT", history: [] };
}

// Returns a new invoice; the input is never mutated.
export function changeStatus(invoice: Invoice, to: InvoiceStatus, at: Date = new Date()): Invoice {
  assertTransition(invoice.status, to);
  return {
    ...invoice,
    status: to,
    history: [...invoice.history, { from: invoice.status, to, at: at.toISOString() }],
  };
}
