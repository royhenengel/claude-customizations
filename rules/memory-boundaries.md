# Memory System Boundaries

**Domain:** Knowledge capture - which system (MEMORY.md, STATE.md, claude-mem, /compound) stores what.

Four knowledge capture mechanisms exist. Each has a distinct purpose. This reference defines what belongs where.

## Systems

### Auto Memory (MEMORY.md)

Per-project file at `~/.claude/projects/{hash}/memory/MEMORY.md`. Auto-loaded every session. Project-level only.

**Purpose**: Brief reminders (sticky notes). Stable patterns, user preferences, architectural decisions, recurring gotchas.
**Not here**: Session-specific context, CLAUDE.md duplicates, detailed analysis (use /compound).
**Format**: 1-2 lines per item. Max 200 lines.

### STATE.md (Living Handoff)

`planning/STATE.md`. Read on demand. Updated continuously.

**Purpose**: Always-ready session handoff. A new session resumes work from STATE.md alone.
**Contains**: Current state, progress, decisions (with rationale), notes.
**Not here**: Reusable solutions (use /compound), session observations (claude-mem captures automatically).
**Key principle**: Always up to date. Session can end at any time; next session picks up cleanly.

### claude-mem (Plugin)

Automatic session capture via plugin. Searchable via MCP tools. Injects recent context via SessionStart.

**Purpose**: Cross-session continuity. Automatically captured (no manual action needed).
**When to search**: Starting a new session, or looking for "what did we do last time?"

### /compound (Solutions)

Curated problem-solution pairs in `planning/solutions/`. Created via /compound skill.

**Purpose**: Detailed case files for recurring problems. Root cause analysis with verified fixes.
**Not here**: One-off debugging (claude-mem), architectural decisions (STATE.md), brief patterns (MEMORY.md).
**Format**: Problem, Symptoms, Root Cause, Fix, Prevention.

## MEMORY.md vs /compound

| Aspect | MEMORY.md | /compound |
| --- | --- | --- |
| **Length** | 1-2 lines per entry | Full document per problem |
| **Loading** | Auto-loaded every session | Read on-demand |
| **When to use** | Pattern recognized, note briefly | Problem solved, document thoroughly |

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
