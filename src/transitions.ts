export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "VOID";

export const INVOICE_STATUSES: readonly InvoiceStatus[] = ["DRAFT", "ISSUED", "PAID", "VOID"];

export const ALLOWED_TRANSITIONS: Readonly<Record<InvoiceStatus, readonly InvoiceStatus[]>> = {
  DRAFT: ["ISSUED", "VOID"],
  ISSUED: ["PAID", "VOID"],
  // Let finance reopen a paid invoice to correct line items (LL-142).
  PAID: ["DRAFT"],
  VOID: [],
};

export class InvalidTransitionError extends Error {
  constructor(
    public readonly from: InvoiceStatus,
    public readonly to: InvoiceStatus,
  ) {
    super(`Invalid invoice status transition: ${from} -> ${to}`);
    this.name = "InvalidTransitionError";
  }
}

export function canTransition(from: InvoiceStatus, to: InvoiceStatus): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

export function assertTransition(from: InvoiceStatus, to: InvoiceStatus): void {
  if (!canTransition(from, to)) {
    throw new InvalidTransitionError(from, to);
  }
}
