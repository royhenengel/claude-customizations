# Research: claude-mem Context Injection

**Status**: COMPLETE
**Last Updated**: 2026-02-05

## Research Questions

1. How does claude-mem compare to alternatives?
2. What is the implementation history?
3. How does the auto-commit system work?
4. What are the token economics?

---

## 1. System Comparison

### claude-mem vs Everything Claude (Session Hooks)

| Capability | claude-mem | Everything Claude |
|------------|-----------|-------------------|
| **Auto-injection at session start** | Yes (last 50 observations) | No (notification only) |
| **Tool usage capture** | Yes (PostToolUse, default) | Optional (must configure observe.sh) |
| **AI compression** | Yes (every observation) | No |
| **Semantic search** | Yes (Chroma vector DB) | No |
| **Token optimization** | Yes (3-layer progressive disclosure) | Manual guidance only |
| **Learning/Instincts** | No | Yes (confidence-weighted) |
| **Reliability** | Requires worker service | Simple file I/O |

**Decision**: Use claude-mem for session continuity, keep Everything Claude's instinct system separate.

**Source**: [memory-systems-comparison.md](../everything-claude-code-migration/memory-systems-comparison.md)

---

## 2. Implementation History

### Timeline (from git log)

| Date | Commit | Description |
|------|--------|-------------|
| 2026-01-31 | 326f744 | Pivot: Replaced Everything Claude session hooks with claude-mem |
| 2026-01-31 | ec2acc4 | First auto-commit of context injection |
| 2026-02-02 | 980e28c | feat: Add auto-commit hook for claude-mem context injections |
| 2026-02-02 | 10aa222 | fix: Trigger auto-commit on SessionEnd in addition to Stop |
| 2026-02-03 | 46b076b | fix: Add hooks.json to version control and fix stale paths |
| 2026-02-05 | 91613c0 | fix: Add claude-mem auto-commit to UserPromptSubmit |

### Key Decisions

1. **Plugin over manual hooks** (2026-01-31)
   - Chose claude-mem plugin system (v9.0.12) instead of manual hook configuration
   - Rationale: Cleaner installation, auto-updates, standardized configuration

2. **Symlink hooks.json** (2026-02-03)
   - Moved hooks.json to project root, symlinked to ~/.claude/
   - Rationale: Version control of hook configuration

3. **UserPromptSubmit trigger** (2026-02-05)
   - Added auto-commit to UserPromptSubmit event
   - Rationale: Commit immediately rather than waiting for session end

---

## 3. Auto-Commit System

### Components

**Configuration**: `hooks.json` (symlinked to ~/.claude/)
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/hooks/scripts/auto-commit-claude-mem.js",
            "timeout": 5000
          }
        ]
      }
    ],
    "Stop": [/* same hook */],
    "SessionEnd": [/* same hook */]
  }
}
```

**Script**: `hooks/scripts/auto-commit-claude-mem.js`

Algorithm:
1. Check if in git repo (exit if not)
2. Get modified CLAUDE.md files via `git status --porcelain`
3. Filter for files containing `<claude-mem-context>` tags
4. Stage and commit with standard message
5. Push silently (ignore failures)

### Trigger Events

| Event | When | Purpose |
|-------|------|---------|
| UserPromptSubmit | Every user message | Immediate cleanup |
| Stop | /stop command | Session end backup |
| SessionEnd | Natural session end | Final cleanup |

### Commit Format

```
chore(claude-mem): auto-commit context injection

Files: planning/CLAUDE.md, skills/my-workflow/workflows/CLAUDE.md
```

---

## 4. Token Economics

### 3-Layer Progressive Disclosure

**Layer 1: search()**
- Returns: Index with IDs, titles, types
- Tokens: ~50-100 per result
- Use: Find relevant observations

**Layer 2: timeline()**
- Returns: Context around anchor ID
- Tokens: ~200-300 per result
- Use: Understand sequence

**Layer 3: get_observations()**
- Returns: Full observation details
- Tokens: ~500-1000 per result
- Use: Get complete information

**Pattern**:
```
search(query) → Filter IDs → timeline(anchor) → Filter further → get_observations([ids])
```

**Savings**: ~10x vs fetching all details directly

### Injection Size

- Default: Last 50 observations
- Format: Markdown table with ID, time, type, title, token count
- Typical size: ~3000-5000 tokens per injection

---

## 5. Known Issues and Solutions

### Issue: Hook not triggering (2026-02-03)
**Symptom**: Auto-commit config existed but wasn't running
**Cause**: Config file not registered in active hooks.json
**Solution**: Symlink hooks.json to project root

### Issue: Pending changes visible (2026-02-05)
**Symptom**: CLAUDE.md changes remained uncommitted
**Cause**: Only triggered on Stop/SessionEnd
**Solution**: Add UserPromptSubmit trigger

### Issue: Stale paths in hooks.json (2026-02-03)
**Symptom**: Hooks failing to execute
**Cause**: Paths pointed to deleted worktree
**Solution**: Move to version control, fix paths

---

## 6. Files and Locations

### Configuration
- `~/.claude/hooks.json` → symlink to `hooks.json`
- `hooks/auto-commit-claude-mem.json` (standalone definition, reference only)

### Scripts
- `hooks/scripts/auto-commit-claude-mem.js`

### Injected Files (examples)
- `planning/CLAUDE.md`
- `skills/my-workflow/workflows/CLAUDE.md`
- `.claude/CLAUDE.md`
- `planning/specs/*/CLAUDE.md`

---

## 7. External Dependencies

### claude-mem
- **Repository**: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- **Version**: 9.0.12+
- **License**: AGPL
- **Dependencies**: Bun, uv, Chroma
- **Port**: 37777 (worker service)
- **Web UI**: http://localhost:37777

### MCP Tools Provided

| Tool | Purpose |
|------|---------|
| `mcp__plugin_claude-mem_mcp-search__search` | Search observations |
| `mcp__plugin_claude-mem_mcp-search__timeline` | Get context around anchor |
| `mcp__plugin_claude-mem_mcp-search__get_observations` | Fetch full details |
| `mcp__plugin_claude-mem_mcp-search____IMPORTANT` | Usage documentation |

---

## 8. Related Features

- **everything-claude-code-migration**: Includes instinct system that complements claude-mem
- **auto-trigger-fix**: Uses hook patterns similar to auto-commit
- **ai-chat-prefs-autoload**: Another SessionStart hook pattern

---

## 9. Open Questions (Resolved)

1. **Should commits happen per-prompt or at session end?**
   - Resolved: Per-prompt (UserPromptSubmit) for immediate cleanup

2. **How to handle worktrees?**
   - Resolved: Script uses CLAUDE_WORKING_DIRECTORY or cwd()

3. **What if push fails?**
   - Resolved: Ignore failures silently (might be offline)
