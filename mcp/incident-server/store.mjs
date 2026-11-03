// Shared file-backed store for the fictional incident system.
// The MCP server and the web UI both use it, so both routes act on the same state.

import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SEED_PATH = join(repoRoot, "incidents", "incidents.json");
const STATE_PATH = join(repoRoot, ".incident-state.json");

export const STATUSES = ["Investigating", "Monitoring", "Resolved"];
export const INCIDENT_ID = /^INC-\d{3,6}$/;

function load() {
  if (!existsSync(STATE_PATH)) {
    const incidents = JSON.parse(readFileSync(SEED_PATH, "utf8"));
    save({ incidents, audit: [] });
  }
  return JSON.parse(readFileSync(STATE_PATH, "utf8"));
}

function save(state) {
  const tmp = `${STATE_PATH}.tmp`;
  writeFileSync(tmp, JSON.stringify(state, null, 2));
  renameSync(tmp, STATE_PATH);
}

export function listIncidents() {
  return load().incidents;
}

export function getIncident(id) {
  return load().incidents.find((incident) => incident.id === id) ?? null;
}

// Returns the updated incident, or null if the id does not exist.
export function updateIncidentStatus(id, status, resolutionNote, via) {
  if (!STATUSES.includes(status)) {
    throw new Error(`status must be one of: ${STATUSES.join(", ")}`);
  }
  const state = load();
  const incident = state.incidents.find((i) => i.id === id);
  if (!incident) return null;
  state.audit.push({ at: new Date().toISOString(), via, id, from: incident.status, to: status });
  incident.status = status;
  incident.resolution_note = resolutionNote;
  save(state);
  return incident;
}

export function getAuditLog() {
  return load().audit;
}

export function resetState() {
  rmSync(STATE_PATH, { force: true });
  load();
}
