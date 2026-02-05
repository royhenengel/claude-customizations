# Feature: claude-mem Context Injection

**Status**: implemented
**Created**: 2026-01-31
**Last Updated**: 2026-02-05

## Problem Statement

Claude Code sessions have no memory across conversations. Context compaction loses valuable session history. Users must manually track what was worked on and re-explain context each session.

## Solution

Integrate claude-mem MCP plugin to:
1. Automatically capture tool usage and observations during sessions
2. Inject relevant context (last 50 observations) at session start
3. Provide semantic search across all historical observations
4. Auto-commit injected context to keep working directory clean

## User Stories

### US-1: Session Continuity
**As** a developer starting a new session
**I want** relevant context from recent work automatically available
**So that** I don't need to re-explain what I was working on

### US-2: Historical Search
**As** a developer debugging an issue
**I want** to search across all past sessions semantically
**So that** I can find when/how similar problems were solved

### US-3: Clean Working Directory
**As** a developer using git
**I want** claude-mem context injections committed automatically
**So that** my working directory stays clean without manual intervention

## Acceptance Criteria

### AC-1: Context Injection at Session Start
- [ ] claude-mem plugin installed and configured
- [ ] Last 50 observations injected into CLAUDE.md files at session start
- [ ] Injections wrapped in `<claude-mem-context>` tags
- [ ] Context appears in system prompts automatically

### AC-2: Observation Capture
- [ ] Tool usage captured via PostToolUse hooks (default behavior)
- [ ] User prompts captured
- [ ] Observations AI-compressed for token efficiency
- [ ] Privacy tags (`<private>`) respected

### AC-3: Semantic Search
- [ ] MCP tools available: search, timeline, get_observations
- [ ] 3-layer progressive disclosure pattern documented
- [ ] Vector search via Chroma DB working

### AC-4: Auto-Commit Hook
- [ ] Hook triggers on UserPromptSubmit (immediate)
- [ ] Hook triggers on Stop and SessionEnd (backup)
- [ ] Only commits CLAUDE.md files with `<claude-mem-context>` tags
- [ ] Commits use consistent message format: `chore(claude-mem): auto-commit context injection`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Claude Code                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Session  │    │PostTool  │    │  User    │
    │  Start   │    │   Use    │    │ Prompt   │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│              claude-mem Worker (port 37777)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   SQLite    │  │   Chroma    │  │  AI Agent   │         │
│  │  Sessions   │  │   Vector    │  │ Compression │         │
│  │Observations │  │   Search    │  │   (Claude)  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE.md Files                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  <claude-mem-context>                                   ││
│  │  # Recent Activity                                      ││
│  │  | ID | Time | T | Title | Read |                       ││
│  │  | #1152 | 6:37 AM | discovery | ... | ~287 |           ││
│  │  </claude-mem-context>                                  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Auto-Commit Hook                           │
│  UserPromptSubmit → git add CLAUDE.md → git commit → push   │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. claude-mem Plugin (External)
- **Source**: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) v9.0.12+
- **Installation**: Via Claude Code plugin system
- **License**: AGPL
- **Dependencies**: Bun, uv, Chroma

### 2. Auto-Commit Hook (Internal)
- **Location**: `hooks/scripts/auto-commit-claude-mem.js`
- **Configuration**: `hooks.json` (symlinked to ~/.claude/)
- **Triggers**: UserPromptSubmit, Stop, SessionEnd

### 3. CLAUDE.md Files (Internal)
- **Locations**: Project roots, planning/ directories, skills/
- **Pattern**: Files containing `<claude-mem-context>` tags
- **Content**: Auto-generated observation summaries

## Token Economics

| Layer | Tokens/Result | Use Case |
|-------|---------------|----------|
| search() | ~50-100 | Index with IDs only |
| timeline() | ~200-300 | Context around anchor |
| get_observations() | ~500-1000 | Full details |

**Savings**: ~10x vs fetching full details directly

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Worker service down | Graceful degradation (no injection) |
| AGPL license concerns | Evaluate alternatives if distributing |
| Storage growth | SQLite auto-rotation, Chroma pruning |
| Context bloat | 50 observation limit, compression |

## Dependencies

- claude-mem plugin (external)
- Node.js (auto-commit script)
- Git (version control)

## Out of Scope

- Learning/instinct system (handled by separate everything-claude-code-migration feature)
- Custom observation triggers
- Multi-project aggregation
