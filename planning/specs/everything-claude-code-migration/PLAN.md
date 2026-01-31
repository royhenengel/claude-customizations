# Everything Claude Code Migration Implementation Plan

## Objective

Integrate session compaction hooks, rules system, and continuous learning v2 from affaan-m/everything-claude-code into claude-customizations.

## Context

@planning/specs/everything-claude-code-migration/SPEC.md
@planning/specs/everything-claude-code-migration/RESEARCH.md
@hooks/hooks.json
@skills/my-workflow/SKILL.md

## Task Summary

| # | Task | Type | Dependencies | Phase |
|---|------|------|--------------|-------|
| 1 | Create pre-compact.js hook script | auto | - | 1 |
| 2 | Create session-end.js hook script | auto | - | 1 |
| 3 | Create utils.js shared library | auto | - | 1 |
| 4 | Update hooks.json with PreCompact and Stop hooks | auto | Tasks 1-3 | 1 |
| 5 | Test compaction hook manually | checkpoint:human-verify | Task 4 | 1 |
| 6 | Create rules/ directory structure | auto | - | 2 |
| 7 | Create security-checklist.md | auto | Task 6 | 2 |
| 8 | Create coding-standards.md | auto | Task 6 | 2 |
| 9 | Create model-selection.md | auto | Task 6 | 2 |
| 10 | Wire rules into SKILL.md | auto | Tasks 7-9 | 2 |
| 11 | Add security check to /build workflow | auto | Task 10 | 2 |
| 12 | Test rules loading and security check | checkpoint:human-verify | Task 11 | 2 |
| 13 | Create learning/ directory structure | auto | - | 3 |
| 14 | Create observe.js hook script | auto | Task 3 | 3 |
| 15 | Create instinct-cli.py | auto | Task 13 | 3 |
| 16 | Create /instinct-status command | auto | Task 15 | 3 |
| 17 | Create /instinct-export command | auto | Task 15 | 3 |
| 18 | Create /instinct-import command | auto | Task 15 | 3 |
| 19 | Create /evolve command | auto | Task 15 | 3 |
| 20 | Update hooks.json with observation hooks | auto | Task 14 | 3 |
| 21 | Bootstrap instincts from AI Chat Prefs | auto | Tasks 15, 20 | 3 |
| 22 | Test instinct system end-to-end | checkpoint:human-verify | Task 21 | 3 |

---

## Phase 1: Session Compaction Hooks

### Task 1: Create pre-compact.js hook script

**Type**: auto
**Files**: hooks/scripts/pre-compact.js
**Dependencies**: None

**Context**: PreCompact hook fires when Claude's context is about to compact. Without this, context can summarize unexpectedly and lose work state.

**Action**:
Create Node.js script that:
1. Reads current working directory to determine project context
2. Appends entry to planning/COMPACTION-LOG.md with timestamp
3. If planning/STATE.md exists, copies current state to log entry
4. Always exits 0 (non-blocking)

Pattern from source:
```javascript
// Append compaction event to log
const logEntry = `\n## ${timestamp}\n\nContext compacted during session.\n`;
fs.appendFileSync(compactionLogPath, logEntry);
```

Edge cases:
- planning/ directory doesn't exist: create it
- STATE.md doesn't exist: log without state snapshot
- File write fails: log to console, exit 0 anyway

**Verify**: Run `node hooks/scripts/pre-compact.js` - should create/append to planning/COMPACTION-LOG.md
**Done**: COMPACTION-LOG.md contains timestamped entry

---

### Task 2: Create session-end.js hook script

**Type**: auto
**Files**: hooks/scripts/session-end.js
**Dependencies**: None

**Context**: Catches sessions that end without /stop being called. Creates lightweight handoff so work isn't lost.

**Action**:
Create Node.js script that:
1. Checks if planning/HANDOFF.md was recently updated (within last 5 minutes)
2. If yes: skip (user ran /stop)
3. If no: create lightweight HANDOFF.md with:
   - Timestamp
   - Note: "Auto-generated on session end (no /stop called)"
   - Current STATE.md content if available
4. Always exits 0

Distinguish from /stop:
- /stop creates detailed handoff with user context
- session-end creates minimal handoff as safety net

**Verify**: Run `node hooks/scripts/session-end.js` - should create HANDOFF.md if missing/stale
**Done**: HANDOFF.md created with auto-generated note

---

### Task 3: Create utils.js shared library

**Type**: auto
**Files**: hooks/scripts/lib/utils.js
**Dependencies**: None

**Context**: Shared utilities for hook scripts. Avoid duplicating file I/O and timestamp logic.

**Action**:
Create utility module with:
```javascript
module.exports = {
  getTimestamp: () => new Date().toISOString(),
  getDateString: () => new Date().toISOString().split('T')[0],
  ensureDir: (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); },
  safeRead: (path) => { try { return fs.readFileSync(path, 'utf8'); } catch { return null; } },
  safeAppend: (path, content) => { try { fs.appendFileSync(path, content); return true; } catch { return false; } },
  getPlanningDir: () => path.join(process.cwd(), 'planning'),
};
```

Keep minimal - only what's needed for hooks.

**Verify**: `node -e "require('./hooks/scripts/lib/utils.js').getTimestamp()"` returns ISO timestamp
**Done**: utils.js exports all listed functions

---

### Task 4: Update hooks.json with PreCompact and Stop hooks

**Type**: auto
**Files**: hooks/hooks.json
**Dependencies**: Tasks 1-3

**Context**: Wire the new hooks into Claude Code's hook system.

**Action**:
Add to existing hooks.json:
```json
{
  "hooks": {
    "PreCompact": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "node ~/.claude/hooks/scripts/pre-compact.js"
      }]
    }],
    "Stop": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "node ~/.claude/hooks/scripts/session-end.js"
      }]
    }]
  }
}
```

Preserve existing SessionStart hook - add to it, don't replace.

**Verify**: `cat hooks/hooks.json | jq '.hooks.PreCompact'` shows new hook
**Done**: hooks.json contains PreCompact and Stop configurations

---

### Task 5: Test compaction hook manually

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 4

**Context**: Verify hooks work in real session before proceeding.

**Action**:
1. Start new Claude Code session in this project
2. Work briefly to generate some context
3. Check planning/COMPACTION-LOG.md exists (may be empty if no compaction yet)
4. End session without /stop
5. Check planning/HANDOFF.md was auto-created

**Verify**:
- COMPACTION-LOG.md file exists
- HANDOFF.md contains "Auto-generated on session end"

**Done**: Human confirms both hooks triggered correctly

---

## Phase 2: Rules System

### Task 6: Create rules/ directory structure

**Type**: auto
**Files**: skills/my-workflow/rules/
**Dependencies**: None

**Context**: Rules live alongside workflow files for automatic loading via cascading context.

**Action**:
```bash
mkdir -p skills/my-workflow/rules
```

Create CLAUDE.md for the rules directory:
```markdown
# My-Workflow Rules

Always-on guidelines that apply during all workflow stages.

## Security

@security-checklist.md

## Coding Standards

@coding-standards.md

## Model Selection

@model-selection.md
```

**Verify**: `ls skills/my-workflow/rules/` shows CLAUDE.md
**Done**: Directory exists with CLAUDE.md

---

### Task 7: Create security-checklist.md

**Type**: auto
**Files**: skills/my-workflow/rules/security-checklist.md
**Dependencies**: Task 6

**Context**: 8-point security checklist from source, adapted for this project.

**Action**:
Create security checklist based on source rules/security.md:

```markdown
# Security Checklist

Verify before every commit.

## Pre-Commit Checks

1. [ ] **No hardcoded credentials** - API keys, passwords, tokens in env vars only
2. [ ] **Input validation** - All external input validated (user input, API responses, file content)
3. [ ] **Injection prevention** - SQL queries parameterized, shell commands escaped
4. [ ] **XSS mitigation** - User content escaped before rendering
5. [ ] **CSRF protection** - State-changing operations require tokens
6. [ ] **Authentication verified** - Protected routes check auth
7. [ ] **Rate limiting** - Public endpoints have rate limits
8. [ ] **Secure error handling** - Errors logged, not exposed to users

## Credential Pattern

NEVER:
\`\`\`javascript
const apiKey = "sk-abc123...";
\`\`\`

ALWAYS:
\`\`\`javascript
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY not configured");
\`\`\`

## Incident Response

If vulnerability detected:
1. Stop current work
2. Assess severity (critical/high/medium/low)
3. Fix before continuing
4. Scan codebase for similar patterns
```

**Verify**: File contains 8 numbered checklist items
**Done**: security-checklist.md created with complete checklist

---

### Task 8: Create coding-standards.md

**Type**: auto
**Files**: skills/my-workflow/rules/coding-standards.md
**Dependencies**: Task 6

**Context**: Coding standards from source, merged with existing my-workflow size limits.

**Action**:
Create coding standards:

```markdown
# Coding Standards

## Immutability

Prefer immutable patterns. Create new objects instead of mutating.

NEVER:
\`\`\`javascript
user.name = newName;
\`\`\`

ALWAYS:
\`\`\`javascript
const updatedUser = { ...user, name: newName };
\`\`\`

## Input Validation

Validate at system boundaries using schema libraries.

\`\`\`typescript
const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().optional(),
});
\`\`\`

## Size Limits

| Metric | Limit | Rationale |
|--------|-------|-----------|
| File length | 200 lines (soft), 400 max | Readability |
| Function length | 50 lines | Single responsibility |
| Nesting depth | 4 levels | Cognitive load |
| Parameters | 5 per function | Complexity signal |

## Quality Checklist

Before completion:
- [ ] Names are descriptive (not i, j, x, temp)
- [ ] Functions under 50 lines
- [ ] Files under 400 lines
- [ ] Nesting under 4 levels
- [ ] Error handling complete
- [ ] No console.log/debugger statements
- [ ] No magic numbers (use named constants)
- [ ] Immutable patterns used
```

**Verify**: File contains Size Limits table
**Done**: coding-standards.md created

---

### Task 9: Create model-selection.md

**Type**: auto
**Files**: skills/my-workflow/rules/model-selection.md
**Dependencies**: Task 6

**Context**: Document when to use Haiku vs Sonnet vs Opus for cost optimization.

**Action**:
Create model selection guide:

```markdown
# Model Selection Guide

## Quick Reference

| Model | Use For | Cost |
|-------|---------|------|
| Haiku 4.5 | Lightweight tasks, workers, pair programming | Lowest |
| Sonnet 4.5 | Default development, orchestration | Medium |
| Opus 4.5 | Deep reasoning, architecture, research | Highest |

## Haiku 4.5

"90% of Sonnet capability at 1/3 cost"

Use for:
- Simple code reviews
- Documentation updates
- Test writing (after design is clear)
- Formatting and linting
- Worker agents in multi-agent systems

## Sonnet 4.5

Default choice for most development.

Use for:
- Feature implementation
- Bug fixing
- Refactoring
- API design
- Multi-file changes

## Opus 4.5

Reserve for high-stakes decisions.

Use for:
- Architecture decisions
- Complex debugging
- Research tasks
- When Sonnet struggles
- Planning large features

## Subagent Model Selection

```yaml
# In agent definition
model: haiku  # For simple workers
model: sonnet # For complex tasks (default)
model: opus   # For deep reasoning
```

Default to haiku for Task tool calls unless task requires deep reasoning.
```

**Verify**: File contains model comparison table
**Done**: model-selection.md created

---

### Task 10: Wire rules into SKILL.md

**Type**: auto
**Files**: skills/my-workflow/SKILL.md
**Dependencies**: Tasks 7-9

**Context**: Reference rules from SKILL.md so they load as cascading context.

**Action**:
Add section to SKILL.md after Core Principles:

```markdown
## Always-Active Rules

These rules apply during all workflow stages:

@rules/security-checklist.md
@rules/coding-standards.md
@rules/model-selection.md
```

Place after "Core Principles" section, before "Commands" section.

**Verify**: `grep -A5 "Always-Active Rules" skills/my-workflow/SKILL.md` shows @rules references
**Done**: SKILL.md contains rules section with @file references

---

### Task 11: Add security check to /build workflow

**Type**: auto
**Files**: skills/my-workflow/workflows/build.md
**Dependencies**: Task 10

**Context**: Security checklist should run before commit in /build.

**Action**:
Add security verification step before commit in build.md.

Find the commit step (likely near end of workflow) and add before it:

```markdown
### Pre-Commit Security Check

Before committing, verify against security checklist:

1. Review all changed files for:
   - Hardcoded credentials
   - Unvalidated input
   - Injection vulnerabilities

2. If security issue found:
   - Fix before proceeding
   - Document in RESEARCH.md if architectural

Reference: @rules/security-checklist.md
```

**Verify**: `grep -B2 -A5 "Security Check" skills/my-workflow/workflows/build.md` shows the section
**Done**: build.md includes security check before commit

---

### Task 12: Test rules loading and security check

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 11

**Context**: Verify rules load and security check runs.

**Action**:
1. Start Claude Code session in this project
2. Run /build on a small change
3. Verify security checklist is mentioned before commit
4. Check that rules/@file references resolve

**Verify**: Security checklist appears in /build output
**Done**: Human confirms rules integrated correctly

---

## Phase 3: Continuous Learning v2

### Task 13: Create learning/ directory structure

**Type**: auto
**Files**: ~/.claude/learning/
**Dependencies**: None

**Context**: Homunculus is the learning system's home. Lives in ~/.claude/ for cross-project learning.

**Action**:
```bash
mkdir -p ~/.claude/learning/{instincts/{personal,inherited},evolved/{agents,skills,commands}}
touch ~/.claude/learning/observations.jsonl
```

Create identity.json:
```json
{
  "version": "2.0",
  "created": "2026-01-28",
  "technical_level": "advanced",
  "preferences_source": "AI Chat Prefs (Notion)"
}
```

Create config.json:
```json
{
  "version": "2.0",
  "observation": {
    "enabled": true,
    "store_path": "~/.claude/learning/observations.jsonl",
    "max_file_size_mb": 10,
    "archive_after_days": 7
  },
  "instincts": {
    "personal_path": "~/.claude/learning/instincts/personal/",
    "inherited_path": "~/.claude/learning/instincts/inherited/",
    "min_confidence": 0.3,
    "auto_approve_threshold": 0.7,
    "confidence_decay_rate": 0.05
  },
  "observer": {
    "enabled": false,
    "model": "haiku",
    "run_interval_minutes": 5
  },
  "evolution": {
    "cluster_threshold": 3,
    "evolved_path": "~/.claude/learning/evolved/"
  }
}
```

Note: observer.enabled = false by default (no API cost).

**Verify**: `ls ~/.claude/learning/instincts/` shows personal/ and inherited/
**Done**: Full directory structure created

---

### Task 14: Create observe.js hook script

**Type**: auto
**Files**: hooks/scripts/observe.js
**Dependencies**: Task 3

**Context**: Captures PreToolUse and PostToolUse events for pattern analysis.

**Action**:
Create Node.js script (not bash, for cross-platform):

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HOMUNCULUS_DIR = path.join(require('os').homedir(), '.claude', 'learning');
const OBSERVATIONS_FILE = path.join(HOMUNCULUS_DIR, 'observations.jsonl');
const MAX_SIZE_MB = 10;

function main() {
  const eventType = process.argv[2]; // 'pre' or 'post'

  // Read from stdin (Claude passes hook data via stdin)
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => input += chunk);
  process.stdin.on('end', () => {
    try {
      const hookData = JSON.parse(input);

      const observation = {
        timestamp: new Date().toISOString(),
        event: eventType,
        tool: hookData.tool_name || 'unknown',
        session_id: process.env.CLAUDE_SESSION_ID || 'unknown',
        input_preview: truncate(JSON.stringify(hookData.tool_input), 1000),
        output_preview: eventType === 'post' ? truncate(JSON.stringify(hookData.tool_output), 1000) : null,
      };

      // Check file size, rotate if needed
      rotateIfNeeded();

      // Append observation
      fs.appendFileSync(OBSERVATIONS_FILE, JSON.stringify(observation) + '\n');
    } catch (e) {
      // Log error but don't block
      console.error('Observation error:', e.message);
    }
    process.exit(0);
  });
}

function truncate(str, maxLen) {
  return str && str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}

function rotateIfNeeded() {
  try {
    const stats = fs.statSync(OBSERVATIONS_FILE);
    if (stats.size > MAX_SIZE_MB * 1024 * 1024) {
      const archiveDir = path.join(HOMUNCULUS_DIR, 'observations.archive');
      if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });
      const archiveName = `observations-${Date.now()}.jsonl`;
      fs.renameSync(OBSERVATIONS_FILE, path.join(archiveDir, archiveName));
    }
  } catch (e) {
    // File doesn't exist yet, that's fine
  }
}

main();
```

**Verify**: `echo '{"tool_name":"test"}' | node hooks/scripts/observe.js pre` appends to observations.jsonl
**Done**: observe.js captures and logs tool events

---

### Task 15: Create instinct-cli.py

**Type**: auto
**Files**: hooks/scripts/instinct-cli.py
**Dependencies**: Task 13

**Context**: Python CLI for managing instincts. Port from source with adaptations.

**Action**:
Port instinct-cli.py from source (already fetched in research).

Key adaptations:
- Use ~/.claude/learning/ paths
- Add `bootstrap` command for AI Chat Prefs import
- Keep all existing commands: status, import, export, evolve

The source implementation is complete and well-structured. Copy with minimal changes:
1. Update path constants to match our structure
2. Add docstring noting source attribution
3. Ensure Python 3.8+ compatibility

**Verify**: `python3 hooks/scripts/instinct-cli.py status` runs without error
**Done**: CLI shows help when run without arguments

---

### Task 16: Create /instinct-status command

**Type**: auto
**Files**: commands/instinct-status.md
**Dependencies**: Task 15

**Context**: Slash command to show learned instincts.

**Action**:
```markdown
---
name: instinct-status
description: Show all learned instincts with confidence scores
arguments: []
---

# /instinct-status

Show the status of all learned instincts.

## Action

Run the instinct CLI:

\`\`\`bash
python3 ~/.claude/hooks/scripts/instinct-cli.py status
\`\`\`

## Output

Display the output organized by domain, showing:
- Instinct ID
- Confidence score (visual bar + percentage)
- Trigger condition
- Action summary

If no instincts exist, suggest running /instinct-import or generating from AI Chat Prefs.
```

**Verify**: File exists at commands/instinct-status.md
**Done**: Command file created with correct structure

---

### Task 17: Create /instinct-export command

**Type**: auto
**Files**: commands/instinct-export.md
**Dependencies**: Task 15

**Context**: Export instincts for sharing.

**Action**:
```markdown
---
name: instinct-export
description: Export learned instincts to a file for sharing
arguments:
  - name: output
    description: Output file path (optional, defaults to stdout)
    required: false
  - name: domain
    description: Filter by domain (optional)
    required: false
  - name: min-confidence
    description: Minimum confidence threshold (optional, e.g., 0.7)
    required: false
---

# /instinct-export

Export learned instincts to share with others or backup.

## Action

\`\`\`bash
python3 ~/.claude/hooks/scripts/instinct-cli.py export [--output FILE] [--domain DOMAIN] [--min-confidence N]
\`\`\`

## Examples

Export all instincts:
\`\`\`bash
/instinct-export
\`\`\`

Export high-confidence instincts to file:
\`\`\`bash
/instinct-export --output my-instincts.yaml --min-confidence 0.7
\`\`\`

Export only code-style instincts:
\`\`\`bash
/instinct-export --domain code-style
\`\`\`
```

**Verify**: File exists at commands/instinct-export.md
**Done**: Command file created

---

### Task 18: Create /instinct-import command

**Type**: auto
**Files**: commands/instinct-import.md
**Dependencies**: Task 15

**Context**: Import instincts from others.

**Action**:
```markdown
---
name: instinct-import
description: Import instincts from a file or URL
arguments:
  - name: source
    description: File path or URL to import from
    required: true
  - name: dry-run
    description: Preview without importing
    required: false
  - name: min-confidence
    description: Minimum confidence threshold to import
    required: false
---

# /instinct-import

Import instincts from external sources.

## Action

\`\`\`bash
python3 ~/.claude/hooks/scripts/instinct-cli.py import SOURCE [--dry-run] [--min-confidence N]
\`\`\`

## Examples

Import from file:
\`\`\`bash
/instinct-import ./team-instincts.yaml
\`\`\`

Preview import from URL:
\`\`\`bash
/instinct-import https://example.com/instincts.yaml --dry-run
\`\`\`

Import only high-confidence:
\`\`\`bash
/instinct-import ./instincts.yaml --min-confidence 0.8
\`\`\`

## Behavior

- New instincts are added to ~/.claude/learning/instincts/inherited/
- Duplicates are skipped unless new version has higher confidence
- Dry-run shows what would be imported without changes
```

**Verify**: File exists at commands/instinct-import.md
**Done**: Command file created

---

### Task 19: Create /evolve command

**Type**: auto
**Files**: commands/evolve.md
**Dependencies**: Task 15

**Context**: Cluster instincts into skills/commands/agents.

**Action**:
```markdown
---
name: evolve
description: Analyze instincts and suggest evolutions to skills/commands/agents
arguments:
  - name: generate
    description: Generate evolved structures (otherwise just analyze)
    required: false
---

# /evolve

Analyze learned instincts and suggest or generate evolved skills, commands, or agents.

## Action

\`\`\`bash
python3 ~/.claude/hooks/scripts/instinct-cli.py evolve [--generate]
\`\`\`

## Analysis Mode (default)

Shows:
- Skill candidates: clusters of related instincts (3+ with similar triggers)
- Command candidates: workflow instincts with high confidence
- Agent candidates: complex multi-step patterns

## Generate Mode

With `--generate`, creates actual files in:
- ~/.claude/learning/evolved/skills/
- ~/.claude/learning/evolved/commands/
- ~/.claude/learning/evolved/agents/

Generated files can be reviewed and moved to active directories.

## Requirements

Needs at least 3 instincts to analyze patterns.
```

**Verify**: File exists at commands/evolve.md
**Done**: Command file created

---

### Task 20: Update hooks.json with observation hooks

**Type**: auto
**Files**: hooks/hooks.json
**Dependencies**: Task 14

**Context**: Wire observation hooks for PreToolUse and PostToolUse.

**Action**:
Add to hooks.json:

```json
{
  "PreToolUse": [{
    "matcher": "*",
    "hooks": [{
      "type": "command",
      "command": "node ~/.claude/hooks/scripts/observe.js pre"
    }]
  }],
  "PostToolUse": [{
    "matcher": "*",
    "hooks": [{
      "type": "command",
      "command": "node ~/.claude/hooks/scripts/observe.js post"
    }]
  }]
}
```

Add to existing hooks array, don't replace.

Note: These hooks are lightweight (just logging) so won't slow down operations.

**Verify**: `cat hooks/hooks.json | jq '.hooks.PreToolUse'` shows observe.js hook
**Done**: hooks.json includes observation hooks

---

### Task 21: Bootstrap instincts from AI Chat Prefs

**Type**: auto
**Files**: ~/.claude/learning/instincts/personal/ai-chat-prefs-bootstrap.yaml
**Dependencies**: Tasks 15, 20

**Context**: Seed the instinct system with existing preferences from AI Chat Prefs.

**Action**:
Read AI Chat Prefs and convert to instinct format.

Key preferences to convert:
1. Direct communication style (no hedging) → instinct
2. Visual representations preference → instinct
3. "How without why is insufficient" → instinct
4. Short sentences/paragraphs → instinct
5. Tables required for comparisons → instinct
6. No marketing language → instinct
7. Metric units default → instinct
8. State uncertainty explicitly → instinct
9. Diagnose before fixing → instinct
10. No apologies, accountability through analysis → instinct

Format each as:
```yaml
---
id: direct-communication
trigger: "when writing responses"
confidence: 0.9
domain: communication
source: ai-chat-prefs-bootstrap
---

# Direct Communication

## Action
Use direct, professional tone without hedging or softening language.

## Evidence
Explicitly documented in AI Chat Prefs as user preference.
```

Create ~10 instincts with high confidence (0.9) since they're explicitly documented preferences.

**Verify**: `python3 hooks/scripts/instinct-cli.py status` shows bootstrapped instincts
**Done**: At least 5 instincts created from AI Chat Prefs

---

### Task 22: Test instinct system end-to-end

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 21

**Context**: Verify complete learning system works.

**Action**:
1. Run `/instinct-status` - should show bootstrapped instincts
2. Work briefly to generate observations
3. Check `~/.claude/learning/observations.jsonl` has entries
4. Run `/evolve` - should analyze instincts (may be too few for suggestions)
5. Run `/instinct-export` - should output instinct YAML

**Verify**:
- /instinct-status shows 5+ instincts with confidence bars
- observations.jsonl contains recent tool use entries
- /instinct-export outputs valid YAML

**Done**: Human confirms learning system operational

---

## Verification

- [ ] PreCompact hook creates COMPACTION-LOG.md entries
- [ ] SessionEnd hook creates HANDOFF.md when /stop not called
- [ ] Security checklist runs before /build commits
- [ ] Rules load as cascading context in my-workflow
- [ ] Observation hooks capture tool use to observations.jsonl
- [ ] /instinct-status shows learned patterns
- [ ] No regressions in existing /start, /plan, /build, /stop

## Success Criteria

1. Context compaction triggers automatic state preservation
2. Security checklist runs on every /build commit
3. At least 5 instincts bootstrapped from AI Chat Prefs
4. /instinct-status shows patterns with confidence scores
5. No regressions in existing workflow
