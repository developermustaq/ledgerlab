// MCP server (stdio) exposing the fictional incident system as two structured tools.
// stdout carries the MCP protocol, so diagnostics go to stderr only.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getIncident, INCIDENT_ID, STATUSES, updateIncidentStatus } from "./store.mjs";

const server = new McpServer({ name: "ledgerlab-incidents", version: "1.0.0" });

const incidentId = z.string().regex(INCIDENT_ID).describe("Incident id, for example INC-104");

function text(value, isError = false) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }], isError };
}

server.registerTool(
  "get_incident",
  {
    title: "Get incident",
    description: "Return one incident: id, title, service, severity, owner, status and resolution_note.",
    inputSchema: { id: incidentId },
    annotations: { readOnlyHint: true },
  },
  async ({ id }) => {
    const incident = getIncident(id);
    return incident ? text(incident) : text({ error: `No incident with id ${id}` }, true);
  },
);

server.registerTool(
  "update_incident_status",
  {
    title: "Update incident status",
    description: "Change an incident's status and record a resolution note. This writes to the incident system.",
    inputSchema: {
      id: incidentId,
      status: z.enum(STATUSES),
      resolution_note: z.string().min(1).max(2000),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  },
  async ({ id, status, resolution_note }) => {
    const incident = updateIncidentStatus(id, status, resolution_note, "mcp");
    return incident ? text(incident) : text({ error: `No incident with id ${id}` }, true);
  },
);

await server.connect(new StdioServerTransport());
console.error("ledgerlab-incidents MCP server running on stdio");
