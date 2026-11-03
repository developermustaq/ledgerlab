// Restore the incident system to its seed state. Run between demo trials.

import { resetState } from "./store.mjs";

resetState();
console.log("Incident state reset from incidents/incidents.json");
