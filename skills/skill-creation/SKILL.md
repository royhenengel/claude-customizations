---
name: skill-creation
description: Complete skill lifecycle management - find, create, configure, validate, and share Claude Code skills. Use when user mentions creating skills, building skills, skill templates, skill frontmatter, allowed-tools, scaffolding skills, sharing skills, or asks "is there a skill for X?"
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Skill Creation - Complete Lifecycle Management

## Table of Contents
1. [Finding Skills](#1-finding-skills)
2. [Creating Skills](#2-creating-skills)
3. [Skill Structure](#3-skill-structure)
4. [Configuration](#4-configuration)
5. [Validation](#5-validation)
6. [Sharing Skills](#6-sharing-skills)
7. [Best Practices](#7-best-practices)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Finding Skills

### Search Strategy
1. Check local catalog: `~/.claude/reference/skills/`
2. Browse skill directories in `~/.claude/skills/`
3. Search GitHub: https://github.com/ComposioHQ/awesome-claude-skills

### Installation

**From local catalog:**
```bash
cp -r ~/.claude/reference/skills/<skill-name> ~/.claude/skills/
```

**From GitHub:**
```bash
git clone --depth 1 <repo-url> /tmp/skill-temp
cp -r /tmp/skill-temp/<skill-folder> ~/.claude/skills/
rm -rf /tmp/skill-temp
```

**Verify installation:**
```bash
ls ~/.claude/skills/<skill-name>/SKILL.md
```

---

## 2. Creating Skills

### Quick Start Process

1. **Gather requirements:**
   - Skill name (lowercase-with-hyphens, max 64 chars)
   - What does it do? (1-2 sentences)
   - When should it activate? (trigger keywords)
   - What tools does it need?
   - Scope: Personal (`~/.claude/skills/`) or Project (`.claude/skills/`)

2. **Create directory:**
```bash
mkdir -p ~/.claude/skills/<skill-name>
```

3. **Generate SKILL.md** with proper frontmatter and content

4. **Test activation** by mentioning trigger keywords

### Skill vs Agent Decision

| Use Case | Create |
|----------|--------|
| Reusable instructions/workflows | Skill |
| Independent worker with own context | Agent |
| Reference docs Claude should follow | Skill |
| Specialized persona for complex tasks | Agent |
| Needs different model (Haiku/Opus) | Agent |

---

## 3. Skill Structure

### Single File (Simple)
```
skill-name/
└── SKILL.md
```

### Multi-File (Complex)
```
skill-name/
├── SKILL.md           # Overview and main instructions
├── REFERENCE.md       # Detailed API reference
├── EXAMPLES.md        # Code examples
├── scripts/           # Utility scripts
│   └── helper.py
└── templates/         # File templates
    └── template.txt
```

---

## 4. Configuration

### YAML Frontmatter

```yaml
---
name: skill-identifier
description: What this does and when to use it. Include keywords: keyword1, keyword2
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase-with-hyphens, max 64 chars |
| `description` | Yes | Max 1024 chars, include trigger keywords |
| `allowed-tools` | No | Comma-separated list (inherits all if omitted) |
| `model` | No | sonnet (default), opus, haiku |

### Available Tools
- `Read` - Read files
- `Write` - Create new files
- `Edit` - Modify existing files
- `Grep` - Search file contents
- `Glob` - Find files by pattern
- `Bash` - Run shell commands

### Model Selection
- `haiku` - Fast, simple tasks
- `sonnet` - Balanced (recommended default)
- `opus` - Complex reasoning

---

## 5. Validation

### Pre-flight Checklist

**Name validation:**
- [ ] Lowercase only
- [ ] Hyphens (not underscores or spaces)
- [ ] Max 64 characters
- [ ] Descriptive and clear

**Description validation:**
- [ ] Max 1024 characters
- [ ] Contains trigger keywords
- [ ] Explains WHAT and WHEN

**File validation:**
- [ ] Named `SKILL.md` (case-sensitive)
- [ ] Valid YAML frontmatter (no tabs)
- [ ] Correct location

### Validation Commands

```bash
# Verify file exists
ls -la ~/.claude/skills/<skill-name>/SKILL.md

# Check frontmatter
head -20 ~/.claude/skills/<skill-name>/SKILL.md

# Validate YAML
cat ~/.claude/skills/<skill-name>/SKILL.md | sed -n '1,/^---$/p'
```

### Size Guidelines

| Size | Status | Action |
|------|--------|--------|
| < 600 lines | Good | Continue |
| 600-900 lines | Warning | Consider splitting |
| > 900 lines | Too large | Must split |

---

## 6. Sharing Skills

### Packaging for Distribution

1. **Validate skill** before sharing
2. **Create distributable zip:**
```bash
cd ~/.claude/skills/
zip -r <skill-name>.zip <skill-name>/
```

3. **Share via:**
   - Git repository
   - Direct file transfer
   - Slack (with Rube integration)

### Slack Integration (via Rube)

When sharing skills on Slack:
1. Skill is validated
2. Package created
3. Metadata posted to designated channel
4. Team receives notification with skill details

### Required for Sharing
- Valid SKILL.md with complete frontmatter
- Clear description with trigger keywords
- Any required scripts/templates included

---

## 7. Best Practices

### DO
- Include specific trigger keywords in description
- Keep skills focused on one capability
- Provide clear examples
- Use progressive disclosure (reference external files)
- Test before sharing
- Document version changes

### DON'T
- Make descriptions too vague
- Try to handle everything in one skill
- Request unnecessary tools
- Skip examples
- Forget to test activation triggers
- Exceed 900 lines without splitting

### Description Examples

**Good:**
```yaml
description: Expert in Next.js App Router, server components, server actions. Use when user mentions Next.js, RSC, App Router, or server-side React patterns.
```

**Bad:**
```yaml
description: Helps with Next.js
```

### Tool Permissions

Only request tools you actually use:

```yaml
# Read-only skill
allowed-tools: Read, Grep, Glob

# Code generator
allowed-tools: Read, Write, Grep, Glob

# Full development workflow
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
```

---

## 8. Troubleshooting

### Skill Not Activating

**Check:**
1. Description has specific trigger keywords
2. File is named `SKILL.md` (case-sensitive)
3. File is in correct location
4. YAML frontmatter is valid
5. Restart Claude Code to load new skills

**Debug:**
```bash
# Verify location
ls ~/.claude/skills/*/SKILL.md
ls .claude/skills/*/SKILL.md

# Check YAML syntax
head -20 path/to/SKILL.md

# Debug mode
claude --debug
```

### Skill Conflicts

If multiple skills have similar triggers:
- Make descriptions more specific
- Use distinct keywords
- Reference specific use cases
- Consider combining into one skill

### File Not Found Errors

Check that referenced files exist:
```bash
ls path/to/skill/reference.md
```

---

## SKILL.md Template

```markdown
---
name: skill-identifier
description: What this does. Include keywords: keyword1, keyword2, keyword3
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---

# Skill Name

## Purpose
[Clear explanation of what this skill provides]

## When to Use
- Trigger condition 1 (specific keywords)
- Trigger condition 2 (user scenarios)
- Trigger condition 3 (related topics)

## Process

### 1. Analyze the Request
[How to understand what the user wants]

### 2. Gather Context
- Read relevant files
- Search for patterns
- Find related code

### 3. Provide Solution
[Step-by-step approach]

### 4. Verify Result
[Confirmation steps]

## Examples

### Example 1: Basic Usage
**User request:** [Example]
**Process:** [How handled]
**Output:** [Result]

## Best Practices
- Practice 1
- Practice 2

## Common Pitfalls
- Pitfall 1 → Better approach
- Pitfall 2 → Correct way
```

---

## Quick Reference

| Task | Command/Location |
|------|------------------|
| Personal skills | `~/.claude/skills/` |
| Project skills | `.claude/skills/` |
| Create skill | `mkdir -p ~/.claude/skills/<name>` |
| Verify skill | `ls ~/.claude/skills/<name>/SKILL.md` |
| Debug mode | `claude --debug` |
| Max name length | 64 characters |
| Max description | 1024 characters |
| Max skill size | 900 lines |
