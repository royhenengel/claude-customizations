# Everything Claude Code Migration Specification

## Goal

Integrate features from affaan-m/everything-claude-code into claude-customizations:

1. ~~Session Compaction Hooks~~ → **SUPERSEDED by claude-mem** (see pivot decision below)
2. Rules System - add security/coding standards as always-on context
3. Continuous Learning v2 - instinct system only (observation handled by claude-mem)

## Pivot Decision (2026-01-31)

**claude-mem replaces Phase 1 entirely.** Per [memory-systems-comparison.md](memory-systems-comparison.md):
- claude-mem auto-injects last 50 observations at session start (vs Everything Claude's notification-only)
- claude-mem captures tool usage by default (vs opt-in observe.sh)
- claude-mem has semantic search via Chroma vector DB
- claude-mem has 3-layer progressive disclosure for token optimization

**Phase 3 modified:** Remove observation hooks (claude-mem captures this). Keep instinct system but modify to read from claude-mem's SQLite instead of observations.jsonl.

**Net change:** 4 tasks removed (Phase 1), ~4 tasks modified (Phase 3), new task added (install claude-mem).

## User Stories

- As a user, I want my session state preserved when context compacts so that I don't lose work
- As a user, I want security and coding standards enforced automatically so that I produce quality code
- As a user, I want my patterns observed and learned so that Claude adapts to my preferences over time

## Requirements

### Functional

#### Phase 0: Session Continuity (NEW - Prerequisite)

- [ ] Install claude-mem (thedotmack/claude-mem)
- [ ] Configure claude-mem hooks in ~/.claude/settings.json
- [ ] Verify auto-injection at session start works
- [ ] Test semantic search via MCP tools

#### ~~Phase 1: Session Compaction Hooks~~ → SUPERSEDED

~~All Phase 1 tasks replaced by claude-mem installation above.~~

#### Phase 2: Rules System
- [ ] Create skills/my-workflow/rules/ directory
- [ ] Add security-checklist.md (8 verification points)
- [ ] Add coding-standards.md (immutability, validation, file size limits)
- [ ] Add model-selection.md (Haiku/Sonnet/Opus guidance)
- [ ] Wire rules reference into SKILL.md
- [ ] Security check runs before commit in /build workflow

#### Phase 3: Continuous Learning v2 (Instincts Only)

- [ ] Create ~/.claude/learning/ directory structure (instincts only, no observations.jsonl)
- [ ] ~~Port observe.sh hook~~ → REMOVED (claude-mem handles observation capture)
- [ ] ~~Add observation hooks~~ → REMOVED (claude-mem handles this)
- [ ] Port instinct-cli.py, modify to query claude-mem's SQLite for patterns
- [ ] Create /instinct-status, /instinct-export, /instinct-import, /evolve commands
- [ ] Bootstrap initial instincts from AI Chat Prefs

### Non-Functional

- [ ] Hooks must not block session startup/shutdown (async, always exit 0)
- [ ] Observation logging must cap at 10MB with rotation
- [ ] Background observer is optional (disabled by default to avoid API cost)

## Constraints

- Integrate with existing planning/ structure, don't create parallel systems
- Rules complement deviation rules, don't replace them
- Instincts sync with (not replace) AI Chat Prefs
- No breaking changes to existing my-workflow commands

## Success Criteria

- [ ] claude-mem installed and auto-injecting context at session start
- [ ] claude-mem semantic search accessible via MCP tools
- [ ] Security checklist runs on every /build commit
- [ ] At least 5 instincts bootstrapped from existing preferences
- [ ] /instinct-status shows learned patterns with confidence scores
- [ ] instinct-cli can query claude-mem's SQLite for pattern analysis
- [ ] No regressions in existing workflow commands

## Open Questions

None - requirements clear from source analysis.
