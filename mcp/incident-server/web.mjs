// Web UI for the same fictional incident system, for the browser-automation route.
// Binds to localhost only.

import { createServer } from "node:http";
import { getAuditLog, getIncident, INCIDENT_ID, listIncidents, STATUSES, updateIncidentStatus } from "./store.mjs";

const PORT = Number(process.env.PORT ?? 4173);
const HOST = "127.0.0.1";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - LedgerLab Incidents</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 760px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; background: #f8f3f0; }
  h1 { color: #014baa; }
  table { border-collapse: collapse; width: 100%; background: #fff; }
  th, td { text-align: left; padding: .5rem; border-bottom: 1px solid #ddd; }
  dt { font-weight: 600; margin-top: .75rem; }
  dd { margin: .25rem 0 0; }
  form { margin-top: 1.5rem; padding: 1rem; background: #fff; border: 1px solid #ddd; }
  label { display: block; margin-top: .75rem; font-weight: 600; }
  textarea { width: 100%; min-height: 6rem; }
  button { margin-top: 1rem; padding: .5rem 1rem; background: #014baa; color: #fff; border: 0; }
  .banner { padding: .5rem 1rem; background: #fff3cd; border: 1px solid #e0c060; }
</style>
</head>
<body>
<p><a href="/">All incidents</a> · <a href="/audit">Audit log</a></p>
${body}
</body>
</html>`;
}

function listPage() {
  const rows = listIncidents()
    .map((i) => `<tr><td><a href="/incidents/${escapeHtml(i.id)}">${escapeHtml(i.id)}</a></td><td>${escapeHtml(i.title)}</td><td>${escapeHtml(i.severity)}</td><td>${escapeHtml(i.status)}</td></tr>`)
    .join("");
  return page("Incidents", `<h1>Incidents</h1>
<p class="banner">Fictional training data only.</p>
<table><thead><tr><th>ID</th><th>Title</th><th>Severity</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`);
}

function detailPage(incident, message = "") {
  const options = STATUSES.map((s) => `<option value="${s}"${s === incident.status ? " selected" : ""}>${s}</option>`).join("");
  return page(incident.id, `<h1>${escapeHtml(incident.id)}: ${escapeHtml(incident.title)}</h1>
${message ? `<p class="banner" role="status">${escapeHtml(message)}</p>` : ""}
<dl>
  <dt>Service</dt><dd id="service">${escapeHtml(incident.service)}</dd>
  <dt>Severity</dt><dd id="severity">${escapeHtml(incident.severity)}</dd>
  <dt>Owner</dt><dd id="owner">${escapeHtml(incident.owner)}</dd>
  <dt>Status</dt><dd id="status">${escapeHtml(incident.status)}</dd>
  <dt>Resolution note</dt><dd id="resolution-note">${escapeHtml(incident.resolution_note || "(none)")}</dd>
</dl>
<form method="post" action="/incidents/${escapeHtml(incident.id)}/status">
  <label for="new-status">New status</label>
  <select id="new-status" name="status">${options}</select>
  <label for="note">Resolution note</label>
  <textarea id="note" name="resolution_note" required>${escapeHtml(incident.resolution_note)}</textarea>
  <button type="submit">Update status</button>
</form>`);
}

function auditPage() {
  const rows = getAuditLog()
    .map((a) => `<tr><td>${escapeHtml(a.at)}</td><td>${escapeHtml(a.via)}</td><td>${escapeHtml(a.id)}</td><td>${escapeHtml(a.from)} → ${escapeHtml(a.to)}</td></tr>`)
    .join("");
  return page("Audit log", `<h1>Audit log</h1>
<table><thead><tr><th>When</th><th>Via</th><th>Incident</th><th>Change</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No changes yet.</td></tr>'}</tbody></table>`);
}

function send(res, status, html) {
  res.writeHead(status, { "content-type": "text/html; charset=utf-8" });
  res.end(html);
}

function readForm(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000) req.destroy(new Error("body too large"));
    });
    req.on("end", () => resolve(new URLSearchParams(body)));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}`);
  const detail = url.pathname.match(/^\/incidents\/([^/]+)$/);
  const update = url.pathname.match(/^\/incidents\/([^/]+)\/status$/);

  if (req.method === "GET" && url.pathname === "/") return send(res, 200, listPage());
  if (req.method === "GET" && url.pathname === "/audit") return send(res, 200, auditPage());

  if (req.method === "GET" && detail) {
    const incident = INCIDENT_ID.test(detail[1]) ? getIncident(detail[1]) : null;
    return incident ? send(res, 200, detailPage(incident, url.searchParams.get("updated") ? "Status updated." : "")) : send(res, 404, page("Not found", "<h1>Incident not found</h1>"));
  }

  if (req.method === "POST" && update && INCIDENT_ID.test(update[1])) {
    try {
      const form = await readForm(req);
      const note = (form.get("resolution_note") ?? "").trim();
      if (!note) return send(res, 400, page("Error", "<h1>Resolution note is required</h1>"));
      const incident = updateIncidentStatus(update[1], form.get("status"), note.slice(0, 2000), "web");
      if (!incident) return send(res, 404, page("Not found", "<h1>Incident not found</h1>"));
      res.writeHead(303, { location: `/incidents/${incident.id}?updated=1` });
      return res.end();
    } catch (error) {
      return send(res, 400, page("Error", `<h1>${escapeHtml(error.message)}</h1>`));
    }
  }

  send(res, 404, page("Not found", "<h1>Not found</h1>"));
});

server.listen(PORT, HOST, () => console.log(`LedgerLab incidents UI: http://localhost:${PORT}/incidents/INC-104`));
