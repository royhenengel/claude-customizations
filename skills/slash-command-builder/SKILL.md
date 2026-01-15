---
name: slash-command-builder
description: Expert guidance for creating Claude Code slash commands. Use when creating custom commands or learning YAML configuration.
---

# Slash Command Builder

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [XML Structure](#xml-structure)
4. [Arguments Handling](#arguments-handling)
5. [Dynamic Context](#dynamic-context)
6. [Best Practices](#best-practices)
7. [Quick Reference](#quick-reference)

---

## Overview

Slash commands enable users to trigger reusable prompts with `/command-name` syntax. Commands expand as prompts in the current conversation, allowing teams to standardize workflows and operations.

**File locations:**
- **Project commands**: `.claude/commands/` - Shared via version control
- **Personal commands**: `~/.claude/commands/` - Available across all projects

**Naming**: `command-name.md` → invoked as `/command-name`

---

## Quick Start

### Workflow

1. Create `.claude/commands/` directory (project) or `~/.claude/commands/` (personal)
2. Create `command-name.md` file
3. Add YAML frontmatter (at minimum: `description`)
4. Write command prompt with XML structure
5. Test with `/command-name [args]`

### Minimal Example

**File**: `.claude/commands/optimize.md`

```markdown
---
description: Analyze code for performance issues and suggest optimizations
---

<objective>
Analyze the current code for performance bottlenecks and suggest optimizations.
</objective>

<process>
1. Identify performance-critical sections
2. Analyze algorithmic complexity
3. Suggest three specific optimizations
</process>

<success_criteria>
- Performance issues identified with locations
- Concrete optimizations suggested
- Implementation guidance provided
</success_criteria>
```

**Usage**: `/optimize`

---

## XML Structure

All slash commands should use XML tags in the body for clarity and consistency.

### Required Tags

**`<objective>`** - What the command does and why

```markdown
<objective>
What needs to happen and why this matters.
Context about who uses this and what it accomplishes.
</objective>
```

**`<process>`** - How to execute the command

```markdown
<process>
Sequential steps to accomplish the objective:
1. First step
2. Second step
3. Final step
</process>
```

**`<success_criteria>`** - How to know the command succeeded

```markdown
<success_criteria>
Clear, measurable criteria for successful completion.
</success_criteria>
```

### Conditional Tags

Use when relevant to the command type:

| Tag | When to Use |
|-----|-------------|
| `<context>` | Loading dynamic state or files |
| `<verification>` | Producing artifacts that need checking |
| `<testing>` | Running tests is part of workflow |
| `<output>` | Creating/modifying specific files |

### Intelligence Rules

| Command Type | Required Tags | Additional Tags |
|--------------|---------------|-----------------|
| Simple (single operation) | objective, process, success_criteria | - |
| Complex (multi-step, artifacts) | objective, process, success_criteria | context, verification, output |
| With arguments | objective, process, success_criteria | Use $ARGUMENTS in tags |
| With tests | objective, process, success_criteria | testing |

---

## Arguments Handling

### When to Use Arguments

**Commands that NEED arguments:**
- `/fix-issue [issue-number]` - Needs issue number
- `/review-pr [pr-number]` - Needs PR number
- `/optimize [file-path]` - Needs file to optimize

**Pattern:** Task operates on user-specified data

**Commands WITHOUT arguments:**
- `/check-todos` - Operates on known file
- `/whats-next` - Analyzes current context

**Pattern:** Task operates on implicit context

### $ARGUMENTS Variable

All arguments as a single string:

```markdown
---
description: Fix issue following coding standards
---

<objective>
Fix issue #$ARGUMENTS following project coding standards.
</objective>
```

**Usage**: `/fix-issue 123 high-priority`
**Received**: "Fix issue #123 high-priority following project coding standards"

### Positional Arguments

For structured input, use `$1`, `$2`, `$3`:

```markdown
---
argument-hint: <pr-number> <priority> <assignee>
---

<objective>
Review PR #$1 with priority $2 and assign to $3.
</objective>
```

**Usage**: `/review-pr 456 high alice`

### Using Arguments in Tags

**In `<objective>`:**
```markdown
<objective>
Fix issue #$ARGUMENTS following project conventions.
</objective>
```

**In `<context>`:**
```markdown
<context>
Issue details: @issues/$ARGUMENTS.md
Related files: !`grep -r "TODO.*$ARGUMENTS" src/`
</context>
```

---

## Dynamic Context

### Bash Commands

Execute bash commands before the prompt using `!` prefix directly before backticks:

```markdown
<context>
Current git status: !`git status`
Current branch: !`git branch --show-current`
Recent commits: !`git log --oneline -10`
</context>
```

The commands execute and their output is included in the expanded prompt.

### File References

Use `@` prefix to reference specific files:

```markdown
<context>
Package info: @package.json
Source files: @src/utils/helpers.js
</context>
```

Claude can access the referenced file's contents.

### Git Workflow Example

```markdown
---
description: Create a git commit
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
---

<objective>
Create a git commit for current changes following repository conventions.
</objective>

<context>
Current status: !`git status`
Changes: !`git diff HEAD`
Recent commits: !`git log --oneline -5`
</context>

<process>
1. Review staged and unstaged changes
2. Stage relevant files
3. Write commit message following recent commit style
4. Create commit
</process>

<success_criteria>
- All relevant changes staged
- Commit message follows repository conventions
- Commit created successfully
</success_criteria>
```

---

## Best Practices

### YAML Frontmatter

| Field | Required | Description |
|-------|----------|-------------|
| `description` | Yes | Shown in `/help` list |
| `argument-hint` | If args needed | Shows usage hint |
| `allowed-tools` | If restricting | Limits Claude's tools |

### Tool Restrictions

```yaml
# Git commands only
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)

# Thinking only (no external operations)
allowed-tools: SequentialThinking

# Multiple specific tools
allowed-tools: [Read, Edit, Write]
```

### Clear Descriptions

```yaml
# Good
description: Analyze code for performance issues and suggest three optimizations

# Bad
description: Optimize stuff
```

### Appropriate Complexity

**Simple commands** - Keep concise:
```markdown
<objective>Brief goal</objective>
<process>1-3 steps</process>
<success_criteria>Clear criteria</success_criteria>
```

**Complex commands** - Add context and verification:
```markdown
<objective>...</objective>
<context>Dynamic state and files</context>
<process>Detailed steps</process>
<verification>Checks to perform</verification>
<output>Files created/modified</output>
<success_criteria>...</success_criteria>
```

---

## Quick Reference

### File Structure

```
.claude/commands/           # Project commands (shared)
~/.claude/commands/         # Personal commands (all projects)

command-name.md → /command-name
```

### Command Template

```markdown
---
name: command-name
description: Clear description of what it does
argument-hint: [input]        # Only if arguments needed
allowed-tools: [...]          # Only if restrictions needed
---

<objective>
What and why - reference $ARGUMENTS if needed.
</objective>

<context>                     # If loading state
Dynamic: !`command`
Files: @path/to/file
</context>

<process>
1. Step one
2. Step two
3. Step three
</process>

<verification>                # If creating artifacts
- Check to perform
- Validation to run
</verification>

<success_criteria>
- Measurable outcome
- Definition of done
</success_criteria>
```

### Common Patterns

| Pattern | Use Case |
|---------|----------|
| `/analyze` | Code review, security audit |
| `/commit` | Git workflow with context |
| `/fix-issue [num]` | Parameterized bug fixing |
| `/optimize [file]` | File-specific operations |
| `/check-todos` | Self-contained procedures |

### Success Criteria Checklist

A well-structured slash command:

- [ ] Has clear `description` in frontmatter
- [ ] Uses XML structure (objective, process, success_criteria)
- [ ] Has `argument-hint` if using $ARGUMENTS
- [ ] Has `allowed-tools` if tool restrictions needed
- [ ] Has appropriate complexity for the task
- [ ] Expands correctly when invoked
- [ ] Dynamic context loads properly
