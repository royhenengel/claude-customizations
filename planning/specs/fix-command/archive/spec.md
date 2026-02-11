# /fix Command Specification

## Problem

Current fix workflow is incomplete:
- Fixes solve immediate issues but don't consider project-wide implications
- Git history of past fixes isn't consulted
- Fixes can break previously fixed issues (regressions)
- Root cause analysis is skipped - symptoms get fixed, not underlying issues
- No systematic verification process

## Solution

A `/fix` command that enforces a thorough, disciplined fix process.

## Workflow

User reports an issue, invokes `/fix`, and Claude executes these steps:

### Step 1: Git History Search
- Search commit history for related past fixes
- Look for similar issues, relevant changes, patterns
- Understand what was tried before and why

### Step 2: Read Project Conventions
- Read CLAUDE.md and any project-specific instructions
- Understand patterns, conventions, code style
- Identify constraints the fix must respect

### Step 3: Map Affected Areas
- Identify files/code that might be impacted by changes
- Trace dependencies and relationships
- Understand blast radius of potential changes

### Step 4: Root Cause Analysis
- Analyze why the issue exists, not just what the symptom is
- Distinguish between symptoms and underlying cause
- Document the causal chain

### Step 5: Propose Fix
- Present fix with clear rationale
- Tie proposal back to findings from steps 1-4
- Explain why this fix addresses root cause
- Wait for user approval before implementing

### Step 6: Implement & Verify
- Implement the approved fix
- Run existing tests if they exist
- Verify the fix resolves the reported issue

### Step 7: Regression Checklist
- Identify related areas that might be affected
- Present checklist of things for user to manually verify
- Be specific: file names, functionality, scenarios to test

### Step 8: Convention Check
- Evaluate if fix reveals something convention-worthy
- If yes:
  - Notify user inline with description of potential convention change
  - Add item to `planning/BACKLOG.md` with context

## Documentation

- Git commit message captures the fix (standard practice)
- No separate fix log or documentation file
- Backlog entry only if convention change identified

## Output Format

```
## Fix Investigation

### Git History
[Relevant past fixes/commits found]

### Project Conventions
[Relevant conventions that apply]

### Affected Areas
[Files and code that may be impacted]

### Root Cause
[Analysis of why this issue exists]

---

## Proposed Fix

[Description of fix and rationale]

[Wait for approval]

---

## Verification

### Tests Run
[Test results]

### Regression Checklist
- [ ] [Area 1 to verify]
- [ ] [Area 2 to verify]
- [ ] [Area 3 to verify]

### Convention Notes
[If applicable: inline notification about potential convention change]
```

## Future Improvement

Auto-trigger this process when detecting bug/issue/problem/error language in conversation, rather than requiring explicit `/fix` invocation.

Context for future implementation:
- Should detect issue-related language patterns
- Could prompt user: "This sounds like an issue. Run full /fix process?"
- Or could have confidence threshold for auto-triggering
- Need to avoid false positives on discussions about issues vs actual issues to fix
