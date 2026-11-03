# Glossary

Plain-language definitions of the terms used in the walkthrough.

| Term | Meaning | Chapter |
|---|---|---|
| **Model** | The language model: turns the input it is sent into output. Remembers nothing between calls. | 02 |
| **Harness** | The app around the model (Claude Code here). It assembles requests, runs tools, checks permissions and manages context. | 02 |
| **Agentic loop** | The model asks for a tool, the harness runs it, the result goes back in; repeat until the model answers. Claude Code calls it gather context → take action → verify. | 02 |
| **Tool call / tool result** | The model's structured request to do something (read a file, run a command, call an MCP tool), and what came back. | 02 |
| **Context window** | Everything the model sees on a turn: instructions, history, files, tool results. Finite. | 03 |
| **Tokens** | The unit context is measured and billed in. Tool definitions, calls and results all count. | 03 |
| **Compaction** | The harness summarising older conversation to free space. Smaller, not a perfect copy. `/compact <focus>` steers it. | 04 |
| **Durable state** | Things that survive any session: code, tests, `CLAUDE.md`, `progress.md`, git history. | 04 |
| **`CLAUDE.md`** | Project rules and facts that Claude Code loads at the start of every session. | 05 |
| **Skill** | A folder with a `SKILL.md`: a reusable procedure. Only its description is loaded until it is used; then its full body loads. | 05, 06 |
| **Subagent** | A delegated worker with its own context window, instructions and tool allowlist. Returns a summary to the main session. | 07 |
| **Parallelism** | Running independent subagents at the same time. Can cut wall-clock time; often costs more tokens. | 08 |
| **FACT / INFERENCE / UNKNOWN** | Labels for conclusions: proven with a source, reasoned but unproven, or not known. | 09 |
| **MCP** | Model Context Protocol: lets a harness use named, typed tools exposed by a server. | 10 |
| **Browser / computer use** | Letting the model operate a web page or desktop through screenshots, clicks and typing. | 10 |
| **Permission rules** | `deny`, `ask` and `allow` rules for tool calls, checked in that order; first match wins. | 11 |
| **Permission mode** | The default for calls no rule covers: Manual, Auto, Plan, acceptEdits, dontAsk. Cycle with `Shift+Tab`. | 11 |
| **Plan mode** | Claude explores and proposes without editing your source files. | 06, 11 |
| **Contract check** | Here, `npm run ci:contract`: the downstream reconciliation rule that status only moves forward. | 01 |
| **Workshop checkpoint** | A git branch saving a point in the story (`workshop/checkpoint-00`… `-03`). Not the same as Claude Code's `/rewind` checkpoints. | 00 |
