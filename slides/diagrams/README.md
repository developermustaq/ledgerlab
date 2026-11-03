# Workshop diagrams

Slide-ready (1920×1080) diagrams for the session, one per concept.

| File | Shows | Used with |
|---|---|---|
| `04b-harness.png` | What the harness assembles: inputs → harness → model → answer or tool call → result back | `prompts/core/02-model-vs-harness.md` |
| `12b-context.png` | When context fills up: `/compact` vs fresh session, durable state | `prompts/core/03-context-and-compaction.md` |
| `19b-skill.png` | How a skill loads (description → trigger → body) and runs (phases A → B → approval → C) | `prompts/core/06-skill-triage.md` |
| `23b-agents.png` | Coordinator, three read-only investigators, labelled synthesis; the sequential fix lane | `prompts/core/08-parallel-investigation.md` |
| `28b-mcp-browser.png` | Same task through MCP tools and through the web UI, same data, what to measure | `prompts/core/10-mcp-vs-browser.md` |
| `31b-permissions.png` | How a tool call gets permission: deny → ask → allow, then the permission mode | `prompts/core/11-permissions-and-security.md` |

Each `.html` file is the editable source. To re-render after a change (macOS, Google Chrome installed):

```bash
python3 -I slides/diagrams/build.py "$PWD/slides/diagrams" "AI ENGINEERING MASTERCLASS · LEDGERLAB"
```
