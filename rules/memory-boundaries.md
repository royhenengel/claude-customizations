# Memory System Boundaries

**Domain:** Knowledge capture - which system (MEMORY.md, STATE.md, claude-mem, /compound) stores what.

Four knowledge capture mechanisms exist. Each has a distinct purpose. This reference defines what belongs where.

## Systems

### Auto Memory (MEMORY.md)

Per-project file at `~/.claude/projects/{hash}/memory/MEMORY.md`. Auto-loaded into system prompt every session. Project-level only (no user-level equivalent).

**Purpose**: Brief reminders that should persist across all sessions for this project. Think sticky notes on the monitor.

**What goes here**: Stable patterns confirmed across multiple interactions, user preferences for this project, key architectural decisions, short notes about recurring gotchas.

**What does NOT go here**: Session-specific context, speculative conclusions, anything that duplicates CLAUDE.md instructions, detailed problem analysis (use /compound instead).

**Format**: Short entries. A line or two per item. Must stay under 200 lines total (truncated beyond that).

### STATE.md (Living Handoff)

`planning/STATE.md`. Read on demand during workflow. Updated continuously.

**Purpose**: Always-ready session handoff. A new session should be able to resume work by reading STATE.md alone, without any manual handoff preparation.

**What goes here**:

- **Current State**: What's working, what's not, next steps (always current)
- **Progress**: Task completion status for the active feature
- **Decisions**: Why a decision was made (not just what), tradeoff analysis, scope changes, user-approved direction changes
- **Notes**: Incidental observations, session events, operational context

**What does NOT go here**: Reusable solutions (use /compound), session observations for future recall (claude-mem captures these automatically).

**Key principle**: STATE.md replaces the need for a manual `/handoff` command. It is always up to date. Session can end at any time; the next session picks up cleanly.

### claude-mem (Plugin)

Automatic session capture via plugin. Searchable via MCP tools. Injects recent context via SessionStart.

**Purpose**: Cross-session continuity. What happened recently, what was discussed, what was built.

**What goes here**: Automatically captured (no manual action needed). Session observations, tool usage, file changes, conversation summaries.

**When to search**: Starting a new session on an existing project. Looking for "what did we do last time?" or "when did we change X?".

### /compound (Solutions)

Curated problem-solution pairs in `planning/solutions/`. Created via /compound skill.

**Purpose**: Detailed case files for problems that are likely to recur. Root cause analysis with structured documentation.

**What goes here**: Problems with clear symptoms and verified fixes. Root cause analysis. Prevention strategies. Each solution is a full diagnostic document.

**What does NOT go here**: One-off debugging notes (claude-mem captures these), architectural decisions (use STATE.md Decisions), brief patterns or preferences (use MEMORY.md).

**Format**: Structured documents with sections: Problem, Symptoms, Root Cause, Fix, Prevention.

## MEMORY.md vs /compound

These serve different needs:

| Aspect | MEMORY.md | /compound |
| --- | --- | --- |
| **Analogy** | Sticky note on the monitor | Case file in the cabinet |
| **Length** | 1-2 lines per entry | Full document per problem |
| **Loading** | Auto-loaded every session | Read on-demand when needed |
| **Content** | "Always use bun in this project" | "When X fails, root cause is Y, fix by doing Z" |
| **When to use** | Pattern recognized, note it briefly | Problem solved, document it thoroughly |

## Decision Tree

```
I learned something. Where does it go?

Is it a verified solution to a recurring problem with clear symptoms?
  YES -> /compound (planning/solutions/) - full diagnostic document
  NO  -> continue

Is it an architectural or design decision made during feature work?
  YES -> STATE.md Decisions section
  NO  -> continue

Is it a stable project pattern or user preference confirmed across sessions?
  YES -> Auto Memory (MEMORY.md) - brief note
  NO  -> continue

Is it a session observation or context for future sessions?
  YES -> claude-mem captures this automatically (no action needed)
  NO  -> It might not need capturing. Not everything needs to be recorded.
```

## Overlap Handling

- A decision (STATE.md) that becomes a recurring pattern -> also add to MEMORY.md
- A session observation (claude-mem) that reveals a stable pattern -> promote to MEMORY.md
- A debugging session (claude-mem) that produces a reusable fix -> create via /compound
- A /compound solution that informs a project principle -> reference from rules/ or OVERVIEW.md
