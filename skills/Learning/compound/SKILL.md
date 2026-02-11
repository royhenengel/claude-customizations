---
name: compound
description: Document solved problems to make future fixes faster
arguments:
  - name: context
    description: Brief description of what was solved (or leave blank for auto-detect)
    required: false
---

# /compound - Knowledge Capture

Document a solved problem to compound your knowledge. Each documented solution makes the next occurrence faster to resolve.

**Relationship to other commands:**
- `/fix` - Diagnoses and fixes issues (use first)
- `/compound` - Documents the solution after fixing (use after)
- `/evolve` - Analyzes patterns for behavioral instincts (cross-project)

## Step 1: Identify What Was Solved

**If `{{context}}` provided:**
Use that as the starting point.

**If no context provided:**
Scan recent conversation for:
- Error messages that were resolved
- Problems that were fixed
- "That worked" / "Fixed it" / "Problem solved" indicators

Ask if unclear:
```text
What problem did you just solve?

1. A bug or error (code wasn't working)
2. A configuration issue (setup/environment)
3. A performance problem (slow/inefficient)
4. A security concern (vulnerability)
5. An integration issue (APIs/services)
6. Other
```

## Step 2: Extract Problem-Solution Pair

Use 3 parallel analysis agents:

**Agent 1 - Problem Extractor:**
```
Analyze the recent conversation and extract:
- Error messages (exact text if available)
- Symptoms observed
- What was tried that didn't work
- Environment/context where it occurred

Format as structured problem description.
```

**Agent 2 - Solution Extractor:**
```
Analyze the recent conversation and extract:
- Root cause identified
- Working solution (with code if applicable)
- Key insight that led to the fix
- Any caveats or edge cases

Format as structured solution with code blocks.
```

**Agent 3 - Category Classifier:**
```
Based on the problem, determine:
- Category: build-errors | test-failures | runtime-errors | performance-issues | database-issues | security-issues | ui-bugs | integration-issues | logic-errors | config-issues
- Suggested filename (kebab-case, descriptive)
- Related tags for searchability

Return: { category, filename, tags }
```

## Step 3: Generate Documentation

Create solution document:

```markdown
---
title: {Descriptive Title}
category: {category}
tags: [{tags}]
created: {timestamp}
---

# {Title}

## Problem

{Symptoms and error messages}

### Environment

- Project: {project name if known}
- Files affected: {list}

## Investigation

{What was tried, what didn't work}

## Root Cause

{Technical explanation of why it happened}

## Solution

{Step-by-step fix with code examples}

### Code Changes

```{language}
{working code}
```

## Prevention

- {How to avoid this in future}
- {Test case to add, if applicable}

## Related

- {Links to related issues or docs}
```

## Step 4: Store Solution

Check if solutions directory exists:
```bash
ls planning/solutions/ 2>/dev/null || mkdir -p planning/solutions
```

Create category directory if needed:
```bash
mkdir -p planning/solutions/{category}
```

Write the solution file:
```
planning/solutions/{category}/{filename}.md
```

## Step 5: Confirm and Index

Display:
```text
Solution documented:
  planning/solutions/{category}/{filename}.md

Tags: {tags}

This solution is now searchable. Future occurrences of similar problems
will be faster to resolve.
```

Update index if it exists:
```bash
# Append to index if present
if [ -f planning/solutions/INDEX.md ]; then
  echo "| {title} | {category} | {date} |" >> planning/solutions/INDEX.md
fi
```

## Auto-Trigger Integration

Consider adding to /fix workflow:
After a successful fix, offer: "Document this solution? (/compound)"

## Quick Reference

| Category | When to Use |
|----------|-------------|
| build-errors | Compilation, bundling, build tool issues |
| test-failures | Test framework, assertion, mocking issues |
| runtime-errors | Crashes, exceptions, unexpected behavior |
| performance-issues | Slow code, memory leaks, optimization |
| database-issues | Queries, migrations, connections |
| security-issues | Vulnerabilities, auth, permissions |
| ui-bugs | Display, styling, interaction issues |
| integration-issues | APIs, services, third-party tools |
| logic-errors | Business logic, algorithms, data flow |
| config-issues | Environment, settings, setup problems |

---

*Ported from [compound-engineering](https://github.com/EveryInc/compound-engineering-plugin) (adapted for solo workflow)*
