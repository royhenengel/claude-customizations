# Memory Systems Comparison: claude-mem vs Everything Claude

## Status: VERIFIED

Analysis verified via direct source code examination using GitHub API.

---

## Sources

| System | Repository | Version |
|--------|------------|---------|
| claude-mem | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 6.5.0 |
| Everything Claude | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | Latest |

---

## Executive Summary

| Capability | claude-mem | Everything Claude |
|------------|-----------|-------------------|
| **Auto-injection at session start** | Yes (last 50 observations) | No (notification only) |
| **Tool usage capture** | Yes (PostToolUse, default) | Optional (must configure observe.sh) |
| **AI compression** | Yes (every observation) | No |
| **Semantic search** | Yes (Chroma vector DB) | No |
| **Token optimization** | Yes (3-layer progressive disclosure) | Manual guidance only |
| **Learning/Instincts** | No | Yes (confidence-weighted) |
| **Reliability** | Requires worker service | Simple file I/O |

**Bottom line:** claude-mem has superior session continuity. Everything Claude has superior learning.

---

## Detailed Verification

### Claim 1: Session Start Behavior

**Question:** Does Everything Claude INJECT context or just NOTIFY?

**Evidence from `session-start.js`:**
```javascript
if (recentSessions.length > 0) {
  const latest = recentSessions[0];
  log(`[SessionStart] Found ${recentSessions.length} recent session(s)`);
  log(`[SessionStart] Latest: ${latest.path}`);
}
```

**Verdict: NOTIFICATION ONLY**

- Logs to stderr that sessions exist
- Reports file counts and paths
- Does NOT read or inject session content
- User must manually ask Claude to load the file

**claude-mem comparison:** Automatically injects last 50 observations formatted as markdown via `GET /api/context/inject?project={project}`

---

### Claim 2: Token Optimization

**Question:** Does Everything Claude have token optimization?

**Evidence from `hooks.json` and README:**
- `suggest-compact.js` counts tool calls, suggests `/compact` at 50, then every 25
- README mentions "System Prompt Slimming" and "keeping under 10 MCPs"
- No progressive disclosure mechanism
- No automatic summarization

**Verdict: MANUAL GUIDANCE ONLY**

| Technique | What It Is |
|-----------|------------|
| Strategic Compaction | Tool call counter with suggestions |
| Model Selection | Use Haiku for observers |
| MCP Limits | Guidance to keep under 10 |

**claude-mem comparison:**
- Layer 1 search: ~50-100 tokens/result (IDs only)
- Layer 2 timeline: chronological context
- Layer 3 get_observations: ~500-1000 tokens/result
- **~10x token savings** via progressive disclosure

---

### Claim 3: PostToolUse Capture

**Question:** Does Everything Claude capture tool usage?

**Evidence from `hooks.json`:**
```json
"PostToolUse": [
  { "matcher": "tool == \"Bash\"", "hooks": [/* PR logging */] },
  { "matcher": "tool == \"Bash\" && ...", "hooks": [/* build analysis */] },
  { "matcher": "tool == \"Edit\" && ...", "hooks": [/* Prettier, TypeScript, console.log */] }
]
```

**observe.sh EXISTS but is NOT in default hooks.json!**

From `continuous-learning-v2/SKILL.md`:
> "Add to your `~/.claude/settings.json`" (manual configuration required)

**Verdict: OPTIONAL, DISABLED BY DEFAULT**

The observation hooks for learning are:
1. Available in `skills/continuous-learning-v2/hooks/observe.sh`
2. NOT configured in the default `hooks.json`
3. Must be manually added to user's settings.json

**claude-mem comparison:** PostToolUse capture is automatic and default.

---

### Claim 4: Context Injection Content

**Question:** What exactly gets injected at session start?

**Evidence from `session-end.js` template:**
```markdown
# Session: ${today}
**Date:** ${today}
**Started:** ${currentTime}
**Last Updated:** ${currentTime}

---

## Current State

[Session context goes here]

### Completed
- [ ]

### In Progress
- [ ]

### Notes for Next Session
-
```

**Verdict: EMPTY TEMPLATES**

Session files are scaffolds with placeholders like `[Session context goes here]`. No automatic content population.

**claude-mem comparison:** Injects actual observation data:
```json
{
  "session_id": "abc123",
  "tool_name": "Edit",
  "compressed_observation": "Modified src/app.ts: added error handling to fetchUser"
}
```

---

### Claim 5: Strategic Compaction

**Question:** How does strategic compaction work?

**Evidence from `suggest-compact.js`:**
```javascript
const threshold = parseInt(process.env.COMPACT_THRESHOLD || '50', 10);

if (count === threshold) {
  log(`[StrategicCompact] ${threshold} tool calls reached - consider /compact`);
}

if (count > threshold && count % 25 === 0) {
  log(`[StrategicCompact] ${count} tool calls - good checkpoint for /compact`);
}
```

**Evidence from `pre-compact.js`:**
```javascript
appendFile(compactionLog, `[${timestamp}] Context compaction triggered\n`);
appendFile(activeSession, `\n---\n**[Compaction occurred at ${timeStr}]**\n`);
```

**Verdict: SIMPLE COUNTER + TIMESTAMP LOGGING**

- Suggests compaction at 50 tool calls, then every 25
- Logs timestamp when compaction occurs
- Does NOT preserve context or create snapshots
- Does NOT automatically save state

**claude-mem comparison:** External SQLite storage means compaction doesn't lose data at all.

---

## Learning System: Everything Claude's Advantage

Everything Claude's Continuous Learning v2 provides capabilities claude-mem lacks:

### Observation Capture (when enabled)

From `observe.sh`:
```bash
# Captures: tool name, input (5000 chars), output (5000 chars), session ID, timestamp
# Writes to: ~/.claude/homunculus/observations.jsonl
```

### Instinct Model

```yaml
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.7
domain: "code-style"
source: "session-observation"
```

### Confidence Scoring

| Score | Meaning | Behavior |
|-------|---------|----------|
| 0.3 | Tentative | Suggested only |
| 0.5 | Moderate | Applied when relevant |
| 0.7 | Strong | Auto-approved |
| 0.9 | Near-certain | Core behavior |

### Evolution Pipeline

```
observations.jsonl → Pattern Detection (Haiku) → Instincts → Clusters → Skills/Commands/Agents
```

**claude-mem has NONE of this.** It's pure capture + retrieval with no learning.

---

## Architecture Comparison

### claude-mem Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Claude Code                        │
└──────────────────────┬──────────────────────────────┘
                       │ Hooks (5 lifecycle events)
                       ▼
┌─────────────────────────────────────────────────────┐
│              Worker Service (port 37777)             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   SQLite    │  │   Chroma    │  │  AI Agent   │  │
│  │  Sessions   │  │   Vector    │  │ Compression │  │
│  │Observations │  │   Search    │  │   (Claude)  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Characteristics:**
- External persistent storage (survives compaction)
- AI-compressed observations (~10x smaller)
- Semantic search across all history
- Progressive disclosure for token efficiency
- Web UI at localhost:37777

### Everything Claude Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Claude Code                        │
└──────────────────────┬──────────────────────────────┘
                       │ Hooks (SessionStart, PreCompact, SessionEnd)
                       ▼
┌─────────────────────────────────────────────────────┐
│              File System (.sessions/)                │
│  ┌─────────────────────────────────────────────────┐│
│  │  YYYY-MM-DD-id-session.tmp (empty templates)    ││
│  │  compaction-log.txt (timestamps only)           ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
                       │
                       │ Optional: observe.sh (must configure manually)
                       ▼
┌─────────────────────────────────────────────────────┐
│           ~/.claude/homunculus/ (if enabled)         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │observations │  │  instincts/ │  │  evolved/   │  │
│  │   .jsonl    │  │  (learned)  │  │(skills/cmds)│  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│                         ▲                            │
│                         │ Background Haiku agent     │
│                         │ (pattern detection)        │
└─────────────────────────────────────────────────────┘
```

**Characteristics:**
- Simple file I/O (no external services)
- Session files are empty templates
- Observation capture is opt-in
- Learning system is powerful but separate
- No search capability
- No automatic injection

---

## Side-by-Side Feature Matrix

| Feature | claude-mem | Everything Claude |
|---------|-----------|-------------------|
| **Session Continuity** | | |
| Auto-inject context at start | ✅ Last 50 observations | ❌ Notification only |
| Survive compaction | ✅ External DB | ⚠️ Timestamp log only |
| Session file content | ✅ Actual tool data | ❌ Empty templates |
| **Capture** | | |
| Capture tool usage | ✅ Default | ⚠️ Opt-in |
| Capture user prompts | ✅ Yes | ❌ No |
| Privacy tags | ✅ `<private>` | ❌ No |
| **Storage** | | |
| Database | ✅ SQLite + Chroma | ❌ JSONL files |
| AI compression | ✅ Yes | ❌ No |
| Size management | ✅ Automatic | ⚠️ 10MB rotation |
| **Retrieval** | | |
| Semantic search | ✅ Chroma vector | ❌ None |
| Keyword search | ✅ FTS5 | ❌ None |
| Progressive disclosure | ✅ 3-layer | ❌ None |
| Web UI | ✅ localhost:37777 | ❌ None |
| **Learning** | | |
| Pattern detection | ❌ None | ✅ Haiku agent |
| Instincts | ❌ None | ✅ Confidence-weighted |
| Evolution to skills | ❌ None | ✅ Automatic clustering |
| Export/import | ❌ None | ✅ Instinct sharing |
| **Operations** | | |
| External services | ⚠️ Worker on 37777 | ✅ None |
| Dependencies | ⚠️ Bun, uv, Chroma | ✅ Node.js only |
| Failure modes | ⚠️ Worker must run | ✅ Minimal |

---

## Recommendations

### Option 1: claude-mem Only

**Best for:** Users who prioritize session continuity and searchable history.

**Pros:**
- Best-in-class session continuity
- Automatic context injection
- Semantic search
- Token optimization

**Cons:**
- No learning/evolution
- External service dependency
- AGPL license

### Option 2: Everything Claude Only

**Best for:** Users who prioritize learning and prefer simplicity.

**Pros:**
- Powerful learning system
- No external services
- Simple file-based
- Pattern evolution

**Cons:**
- Weak session continuity (notification only)
- No search
- Manual configuration for observation
- Empty session templates

### Option 3: Hybrid (Recommended)

**Use claude-mem for:**
- Session continuity
- Context injection
- Search
- Token optimization

**Use Everything Claude for:**
- Continuous Learning v2 (instincts)
- Pattern evolution
- Skill/command generation

**Integration approach:**
1. Install claude-mem for capture/retrieval
2. Port Everything Claude's instinct-cli to read from claude-mem's SQLite
3. Keep observation.jsonl as secondary (or replace entirely)

**Complexity:** High - requires custom integration work.

### Option 4: claude-mem + Manual Instinct Porting

**Use claude-mem for all session management, then:**
1. Periodically export observations
2. Manually analyze for patterns
3. Create instincts/skills manually

**Trade-off:** Less automation, more control.

---

## Decision

**Recommended: Option 3 (Hybrid) with phased approach**

**Phase 1:** Install claude-mem, get session continuity working
**Phase 2:** Evaluate if manual pattern recognition is sufficient
**Phase 3:** If not, port instinct-cli to use claude-mem's data

This gives you the best session continuity immediately while preserving the option to add learning later.

---

## Open Questions

1. Is the hybrid complexity worth the learning benefits?
2. How critical is the instinct system vs manual skill creation?
3. Is AGPL license acceptable for claude-mem?
4. Can you tolerate the external service requirement?
