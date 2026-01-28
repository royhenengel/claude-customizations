# Everything Claude Code Migration Research

## Information Gathered

### Source Repository Analysis

Repository: affaan-m/everything-claude-code
Description: "Complete Claude Code configuration collection - agents, skills, hooks, commands, rules, MCPs. Battle-tested configs from an Anthropic hackathon winner."

Key directories examined:
- `scripts/hooks/` - session-start.js, session-end.js, pre-compact.js
- `rules/` - security.md, coding-style.md, testing.md, performance.md
- `skills/continuous-learning-v2/` - SKILL.md, hooks/observe.sh, scripts/instinct-cli.py
- `hooks/hooks.json` - hook configuration patterns

### Existing claude-customizations Patterns

Current hooks structure:
- `hooks/scripts/` for hook implementations
- `hooks/hooks.json` for configuration
- SessionStart hook already loads AI Chat Prefs

Current rules approach:
- Deviation Rules (Rules 1-6) in my-workflow for handling discoveries
- TDD and Clean Architecture wired into /build
- No explicit security checklist or coding standards doc

Current learning approach:
- Explicit preferences in AI Chat Prefs (synced from Notion)
- Manual skill creation
- No automatic pattern observation

### Gap Analysis

| Feature | Their Approach | Current Approach | Gap |
|---------|---------------|------------------|-----|
| Compaction handling | PreCompact hook | None | Need to add |
| Session end | Auto-save SessionEnd | Manual /stop | Partial gap |
| Security rules | 8-point checklist | Implicit | Need to formalize |
| Coding standards | Explicit immutability, validation | Size limits only | Need to expand |
| Model selection | Documented Haiku/Sonnet/Opus | Implicit | Need to document |
| Pattern learning | Automatic via hooks | Manual preferences | Need to add |
| Instinct confidence | 0.3-0.9 weighted | None | Need to add |

## Approach

Three-phase implementation prioritized by risk and value:

### Phase 1: Session Compaction Hooks (Low risk, High value)
Port pre-compact.js and session-end.js adapted for planning/ structure.
- PreCompact logs to planning/COMPACTION-LOG.md
- SessionEnd creates HANDOFF.md if /stop wasn't called
- Minimal changes to existing system

### Phase 2: Rules System (Medium risk, Medium value)
Add rules as a new subdirectory in skills/my-workflow/.
- Rules are passive context (not enforcement)
- Complement existing deviation rules
- Wire into SKILL.md for automatic loading

### Phase 3: Continuous Learning v2 (Higher risk, Growth value)
Create homunculus/ structure with observation infrastructure.
- Start with observation only (no auto-evolution)
- Bootstrap instincts from AI Chat Prefs
- Background observer optional (disabled by default)

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Fork everything-claude-code | Quick, complete | Conflicts with existing structure | Rejected |
| Port only hooks | Low risk | Miss rules + learning value | Rejected |
| Full integration (chosen) | Complete feature set | Higher effort | SELECTED |
| Skip instinct system | Simpler | Miss learning opportunity | Rejected |

## Dependencies

- Phase 2 depends on Phase 1 (hooks infrastructure)
- Phase 3 depends on Phase 1 (observation hooks)
- Phase 3 instinct bootstrap depends on AI Chat Prefs existing

## Open Questions

None - all implementation details clear from source analysis.
