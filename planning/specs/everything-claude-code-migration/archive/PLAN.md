# Everything Claude Code Migration Implementation Plan

## Objective

Integrate rules system and continuous learning v2 (instincts) from affaan-m/everything-claude-code into claude-customizations. Session continuity now handled by claude-mem.

## Pivot Decision (2026-01-31)

**claude-mem replaces Phase 1.** See [memory-systems-comparison.md](memory-systems-comparison.md) for rationale.

- Phase 1 (Session Hooks) → **REMOVED** - claude-mem handles session continuity better
- Phase 3 (Learning) → **MODIFIED** - Remove observation hooks, integrate instinct-cli with claude-mem's SQLite

## Context

@planning/specs/everything-claude-code-migration/SPEC.md
@planning/specs/everything-claude-code-migration/RESEARCH.md
@planning/specs/reddit-sources-evaluation.md
@hooks/hooks.json
@skills/my-workflow/SKILL.md

## Task Summary

| # | Task | Type | Dependencies | Phase |
| --- | --- | --- | --- | --- |
| 1 | Install claude-mem | checkpoint:human-action | - | 0 |
| 2 | Configure claude-mem hooks | auto | Task 1 | 0 |
| 3 | Verify claude-mem auto-injection | checkpoint:human-verify | Task 2 | 0 |
| 4 | Create rules/ directory structure | auto | - | 2 |
| 5 | Create security-checklist.md | auto | Task 4 | 2 |
| 6 | Create coding-standards.md | auto | Task 4 | 2 |
| 7 | Create model-selection.md | auto | Task 4 | 2 |
| 8 | Wire rules into SKILL.md | auto | Tasks 5-7 | 2 |
| 9 | Add security check to /build workflow | auto | Task 8 | 2 |
| 10 | Test rules loading and security check | checkpoint:human-verify | Task 9 | 2 |
| 11 | Create learning/ directory structure (instincts only) | auto | Task 3 | 3 |
| 12 | Create instinct-cli.py with claude-mem integration | auto | Tasks 3, 11 | 3 |
| 13 | Create /instinct-status command | auto | Task 12 | 3 |
| 14 | Create /instinct-export command | auto | Task 12 | 3 |
| 15 | Create /instinct-import command | auto | Task 12 | 3 |
| 16 | Create /evolve command | auto | Task 12 | 3 |
| 17 | Bootstrap instincts from AI Chat Prefs | auto | Task 12 | 3 |
| 18 | Test instinct system end-to-end | checkpoint:human-verify | Task 17 | 3 |

**Total: 18 tasks** (down from 22, with claude-mem prerequisite added)

---

## Phase 0: Session Continuity (claude-mem)

### Task 1: Install claude-mem

**Type**: checkpoint:human-action
**Dependencies**: None

**Context**: claude-mem provides superior session continuity compared to custom hooks. See [memory-systems-comparison.md](memory-systems-comparison.md).

**Action**:
Follow installation from [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem):

```bash
# Clone and install
git clone https://github.com/thedotmack/claude-mem.git
cd claude-mem
bun install

# Start worker service
bun run start
```

**Requirements**:

- Node.js 18+
- Bun runtime
- uv (Python package manager)
- SQLite 3

**Verify**: Worker service running at localhost:37777
**Done**: `curl localhost:37777/health` returns OK

---

### Task 2: Configure claude-mem hooks

**Type**: auto
**Dependencies**: Task 1

**Context**: claude-mem uses 5 lifecycle hooks. These need to be added to ~/.claude/settings.json.

**Action**:
Add claude-mem hooks to settings.json (not hooks.json - this is user settings):

```json
{
  "hooks": {
    "SessionStart": [{ "command": "claude-mem session-start" }],
    "UserPromptSubmit": [{ "command": "claude-mem prompt-submit" }],
    "PostToolUse": [{ "command": "claude-mem tool-use" }],
    "Stop": [{ "command": "claude-mem stop" }],
    "SessionEnd": [{ "command": "claude-mem session-end" }]
  }
}
```

Preserve existing SessionStart hook (AI Chat Prefs) - claude-mem hooks should run alongside.

**Verify**: `cat ~/.claude/settings.json | jq '.hooks'` shows claude-mem hooks
**Done**: All 5 claude-mem hooks configured

---

### Task 3: Verify claude-mem auto-injection

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 2

**Context**: Key feature is auto-injection of last 50 observations at session start.

**Action**:

1. Start new Claude Code session
2. Verify claude-mem worker is capturing observations
3. End session, start new session
4. Check that context includes injected observations from previous session

**Verify**:

- Worker logs show observation capture
- New session starts with injected context
- Web UI at localhost:37777 shows observation stream

**Done**: Human confirms auto-injection working

---

## Phase 2: Rules System

### Task 4: Create rules/ directory structure

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

### Task 5: Create security-checklist.md

**Type**: auto
**Files**: skills/my-workflow/rules/security-checklist.md
**Dependencies**: Task 4

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

### Task 6: Create coding-standards.md

**Type**: auto
**Files**: skills/my-workflow/rules/coding-standards.md
**Dependencies**: Task 4

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

### Task 7: Create model-selection.md

**Type**: auto
**Files**: skills/my-workflow/rules/model-selection.md
**Dependencies**: Task 4

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

### Task 8: Wire rules into SKILL.md

**Type**: auto
**Files**: skills/my-workflow/SKILL.md
**Dependencies**: Tasks 5-7

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

### Task 9: Add security check to /build workflow

**Type**: auto
**Files**: skills/my-workflow/workflows/build.md
**Dependencies**: Task 8

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

### Task 10: Test rules loading and security check

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 9

**Context**: Verify rules load and security check runs.

**Action**:
1. Start Claude Code session in this project
2. Run /build on a small change
3. Verify security checklist is mentioned before commit
4. Check that rules/@file references resolve

**Verify**: Security checklist appears in /build output
**Done**: Human confirms rules integrated correctly

---

## Phase 3: Continuous Learning v2 (Instincts Only)

> **Note:** Observation capture is now handled by claude-mem. This phase focuses only on the instinct system, which reads patterns from claude-mem's SQLite database.

### Task 11: Create learning/ directory structure (instincts only)

**Type**: auto
**Files**: ~/.claude/learning/
**Dependencies**: Task 3 (claude-mem verified)

**Context**: Learning directory holds instincts only. Observations are stored in claude-mem's SQLite.

**Action**:

```bash
mkdir -p ~/.claude/learning/{instincts/{personal,inherited},evolved/{agents,skills,commands}}
```

Create identity.json:

```json
{
  "version": "2.1",
  "created": "2026-01-31",
  "technical_level": "advanced",
  "preferences_source": "AI Chat Prefs (Notion)",
  "observation_source": "claude-mem"
}
```

Create config.json:

```json
{
  "version": "2.1",
  "observation": {
    "source": "claude-mem",
    "claude_mem_db": "~/.claude-mem/data/observations.db"
  },
  "instincts": {
    "personal_path": "~/.claude/learning/instincts/personal/",
    "inherited_path": "~/.claude/learning/instincts/inherited/",
    "min_confidence": 0.3,
    "auto_approve_threshold": 0.7,
    "confidence_decay_rate": 0.05
  },
  "evolution": {
    "cluster_threshold": 3,
    "evolved_path": "~/.claude/learning/evolved/"
  }
}
```

**Verify**: `ls ~/.claude/learning/instincts/` shows personal/ and inherited/
**Done**: Directory structure created (no observations.jsonl needed)

---

### Task 12: Create instinct-cli.py with claude-mem integration

**Type**: auto
**Files**: hooks/scripts/instinct-cli.py
**Dependencies**: Tasks 3, 11

**Context**: Python CLI for managing instincts. Port from source with claude-mem integration.

**Action**:
Port instinct-cli.py from source with key modifications:

1. **Remove observation hooks** - claude-mem handles capture
2. **Add SQLite query module** - Read patterns from claude-mem's database
3. **Keep instinct management** - status, import, export, evolve commands

Key adaptations:

```python
# Instead of reading observations.jsonl:
# OLD: observations = read_jsonl('~/.claude/learning/observations.jsonl')
# NEW: Query claude-mem's SQLite
import sqlite3
def get_observations_from_claude_mem():
    db_path = os.path.expanduser('~/.claude-mem/data/observations.db')
    conn = sqlite3.connect(db_path)
    # Query recent observations for pattern analysis
    return conn.execute('SELECT * FROM observations ORDER BY timestamp DESC LIMIT 1000').fetchall()
```

Commands to implement:

- `status` - Show instincts with confidence scores
- `import` - Import instincts from file/URL
- `export` - Export instincts to file
- `evolve` - Analyze patterns and suggest skill/command/agent candidates
- `bootstrap` - Generate initial instincts from AI Chat Prefs

**Verify**: `python3 hooks/scripts/instinct-cli.py status` runs without error
**Done**: CLI shows help when run without arguments

---

### Task 13: Create /instinct-status command

**Type**: auto
**Files**: commands/instinct-status.md
**Dependencies**: Task 12

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

### Task 14: Create /instinct-export command

**Type**: auto
**Files**: commands/instinct-export.md
**Dependencies**: Task 12

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

### Task 15: Create /instinct-import command

**Type**: auto
**Files**: commands/instinct-import.md
**Dependencies**: Task 12

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

### Task 16: Create /evolve command

**Type**: auto
**Files**: commands/evolve.md
**Dependencies**: Task 12

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

### Task 17: Bootstrap instincts from AI Chat Prefs

**Type**: auto
**Files**: ~/.claude/learning/instincts/personal/ai-chat-prefs-bootstrap.yaml
**Dependencies**: Task 12

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

### Task 18: Test instinct system end-to-end

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 17

**Context**: Verify complete learning system works.

**Action**:

1. Run `/instinct-status` - should show bootstrapped instincts
2. Work briefly to generate observations (captured by claude-mem)
3. Check claude-mem web UI shows observation capture
4. Run `/evolve` - should analyze instincts (may be too few for suggestions)
5. Run `/instinct-export` - should output instinct YAML

**Verify**:

- /instinct-status shows 5+ instincts with confidence bars
- claude-mem is capturing observations (check localhost:37777)
- /instinct-export outputs valid YAML

**Done**: Human confirms learning system operational

---

## Verification

- [ ] claude-mem worker running at localhost:37777
- [ ] claude-mem auto-injects context at session start
- [ ] Security checklist runs before /build commits
- [ ] Rules load as cascading context in my-workflow
- [ ] instinct-cli can query claude-mem's SQLite for patterns
- [ ] /instinct-status shows learned patterns
- [ ] No regressions in existing /start, /plan, /build, /stop

## Success Criteria

1. claude-mem installed and auto-injecting context at session start
2. Security checklist runs on every /build commit
3. At least 5 instincts bootstrapped from AI Chat Prefs
4. /instinct-status shows patterns with confidence scores
5. instinct-cli successfully queries claude-mem's observation database
6. No regressions in existing workflow
