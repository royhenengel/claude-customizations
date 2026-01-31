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

## Strategic Decisions

### Session Management Architecture

**Decision:** Replace HANDOFF.md and /stop with automatic session file system

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Session file location | `.sessions/` at project root | Project-scoped, separate from planning/ workflow files |
| File naming | `{date}-{id}-session.tmp` | Matches Everything Claude pattern, enables 7-day discovery |
| Compaction log | `.sessions/compaction-log.txt` | Separate from session files, append-forever |
| Git tracking | Track `.sessions/` | Useful history of session interruptions |
| STATE.md snapshots | Include in compaction entries | Prefer more information over risk of state drift |
| HANDOFF.md | **Removed** | Session files now contain narrative + structured data |
| /stop command | **Removed** | SessionEnd hook handles automatically |

**Workflow change:** /start → /plan → /build (removed /stop)

### Session File Template

Enhanced to include both structured data and narrative:

```markdown
# Session: {date}-{id}

## Timestamps
- Started: {timestamp}
- Last Updated: {timestamp}
- Ended: {timestamp}

## State Snapshot
{STATE.md content}

## Narrative
{Detailed context, decisions, blockers}

## Tasks Completed
{List}

## Tasks In Progress
{List}

## Notes for Next Session
{List}

## Compaction Events
{Timestamps with STATE.md snapshots}
```

### Hook Responsibilities

| Hook | Trigger | Actions |
|------|---------|---------|
| SessionStart | Session begins | Find recent session files (7 days), output context |
| PreCompact | Before compaction | Append to compaction-log.txt with STATE.md snapshot, update current session file |
| SessionEnd | Session ends | Update session file with end timestamp, finalize sections |

## Item 4: SessionEnd & PreCompact Hooks Comparison

### Everything Claude vs Mine vs Implementation Plan

#### SessionEnd Hook

| Aspect | Everything Claude | Mine (Current) | Implementation Plan |
|--------|------------------|----------------|---------------------|
| Trigger | SessionEnd event | None (manual /stop) | SessionEnd event |
| Output location | `.claude/sessions/` | `planning/HANDOFF.md` | `.sessions/` at project root |
| File naming | `{date}-{id}-session.tmp` | HANDOFF.md (static) | `{date}-{id}-session.tmp` |
| Content | Template with sections | Structured handoff | Enhanced template with STATE.md |
| Update behavior | Creates or updates timestamp | Overwrites each time | Creates or updates (inherit) |
| Cross-platform | Yes (utils.js) | N/A | Yes (port utils.js) |
| Dependencies | `../lib/utils.js` | None | New `hooks/lib/utils.js` |

#### PreCompact Hook

| Aspect | Everything Claude | Mine (Current) | Implementation Plan |
|--------|------------------|----------------|---------------------|
| Trigger | PreCompact event | None | PreCompact event |
| Log file | `compaction-log.txt` | None | `.sessions/compaction-log.txt` |
| Session update | Appends compaction marker | N/A | Append marker + STATE.md snapshot |
| State preservation | Basic timestamp | None | Full STATE.md snapshot |
| Error handling | Exit 0 always | N/A | Exit 0 always (inherit) |

#### Utils Library

| Function | Everything Claude | Mine (Current) | Implementation Plan |
|----------|------------------|----------------|---------------------|
| `getSessionsDir()` | `.claude/sessions/` | N/A | Project `.sessions/` |
| `getDateString()` | YYYY-MM-DD | N/A | Port as-is |
| `getTimeString()` | HH:MM | N/A | Port as-is |
| `getSessionIdShort()` | Last 8 chars + fallback | N/A | Port as-is |
| `ensureDir()` | mkdirSync recursive | N/A | Port as-is |
| `findFiles()` | Pattern + age filter | N/A | Port as-is |
| `readFile()`/`writeFile()` | fs wrappers | N/A | Port as-is |

### Key Adaptations

1. **Location change**: `.claude/sessions/` → `.sessions/` (project root)
   - Rationale: Project-scoped, not user-global

2. **STATE.md integration**: Everything Claude doesn't have STATE.md
   - Enhancement: Include STATE.md snapshot in compaction entries

3. **Merge with existing hooks**: Keep SessionStart (AI Chat Prefs) and Notification hooks
   - Add SessionEnd and PreCompact alongside existing

4. **Utils library location**: `hooks/lib/utils.js` in claude-customizations
   - Symlinked to `~/.claude/` like other files

## Open Questions

None - all implementation details clear from source analysis.
