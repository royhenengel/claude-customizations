---
description: Thorough fix workflow with git history, root cause analysis, and regression prevention
arguments:
  - name: issue
    description: Description of the issue to fix (or leave blank for interactive)
    required: false
---

# /fix - Thorough Fix Workflow

A disciplined fix process that ensures complete solutions by consulting git history, respecting project conventions, and preventing regressions.

## Step 1: Understand the Issue

**If `{{issue}}` provided:**
Parse the issue description to understand:
- What is broken or behaving incorrectly?
- What is the expected behavior?
- How can it be reproduced?

**If no issue provided:**
Ask:
```
What issue would you like to fix?

Please describe:
1. What's happening (the problem)
2. What should happen (expected behavior)
3. How to reproduce it (if known)
```

## Step 2: Git History Search

Search for related past work:

```bash
# Search commit messages for related keywords
git log --oneline --all --grep="<relevant-keyword>" | head -20

# Search for changes to potentially related files
git log --oneline -20 -- <suspected-files>

# Look at recent commits for context
git log --oneline -15
```

Document findings:
- Related past fixes
- Similar issues that were addressed
- Patterns or approaches used before
- What was tried and why

## Step 3: Read Project Conventions

Read project-specific instructions:

```bash
# Check for CLAUDE.md in project root and common locations
cat CLAUDE.md 2>/dev/null || cat .claude/CLAUDE.md 2>/dev/null || echo "No CLAUDE.md found"

# Check for other convention files
cat .editorconfig 2>/dev/null | head -20
cat .eslintrc* 2>/dev/null | head -20
```

Identify:
- Code style and patterns to follow
- Constraints the fix must respect
- Project-specific rules or preferences

## Step 4: Map Affected Areas

Identify what might be impacted:

1. **Direct dependencies**: What imports/uses the problematic code?
2. **Reverse dependencies**: What does the problematic code import/use?
3. **Related functionality**: What features share logic with this area?
4. **Tests**: What tests cover this area?

```bash
# Find usages of the affected code
grep -r "<function-or-class-name>" --include="*.{ts,js,py,go,rs}" . | head -20

# Find test files for this area
find . -name "*test*" -o -name "*spec*" | grep -i "<relevant-name>" | head -10
```

## Step 5: Root Cause Analysis

Before proposing a fix, analyze WHY the issue exists:

1. **Symptom vs. Cause**: Is the reported issue the root problem, or a symptom of something deeper?
2. **Causal Chain**: Trace back from the symptom to the original cause
3. **Contributing Factors**: What conditions allow this issue to occur?

Document the causal chain:
```
Symptom: [What user sees]
  ← Immediate cause: [What directly produces the symptom]
    ← Contributing factor: [What enables the immediate cause]
      ← Root cause: [The fundamental issue to fix]
```

## Step 6: Propose Fix

Present the fix proposal with clear rationale:

```markdown
## Proposed Fix

### What
[Specific changes to make]

### Why
[How this addresses the root cause identified in Step 5]

### How it relates to past work
[Reference findings from Step 2 - why this approach vs. others]

### Risks
[What could go wrong, what else might be affected]
```

**STOP HERE** - Wait for user approval before implementing.

## Step 7: Implement & Verify

After approval:

1. **Implement** the fix
2. **Run tests** if they exist:
   ```bash
   # Run relevant tests
   npm test 2>/dev/null || yarn test 2>/dev/null || pytest 2>/dev/null || go test ./... 2>/dev/null
   ```
3. **Verify** the fix resolves the original issue

## Step 8: Regression Checklist

Identify related areas for manual verification:

```markdown
### Regression Checklist

Based on the affected areas mapped in Step 4, please verify:

- [ ] [Specific file/feature 1]: [What to check]
- [ ] [Specific file/feature 2]: [What to check]
- [ ] [Specific file/feature 3]: [What to check]
```

Be specific - file names, functionality, scenarios to test.

## Step 9: Convention Check

Evaluate if the fix reveals something convention-worthy:

**Ask yourself:**
- Did this issue stem from a missing convention or unclear guideline?
- Would a documented rule have prevented this issue?
- Is there a pattern here that should be formalized?

**If yes:**
1. Notify user inline:
   ```
   ⚠️ Convention Opportunity: This fix revealed [description]. Consider updating project conventions to [recommendation].
   ```
2. Add to backlog (if planning/BACKLOG.md exists):
   ```bash
   # Append to backlog
   echo "- [ ] [Convention description] - discovered during fix for [issue]" >> planning/BACKLOG.md
   ```

## Step 10: Finalize Changes

When user says "complete", "mark as complete", or similar:

1. **Commit and push**:
   - Stage all changes
   - Create conventional commit with summary
   - Push to remote

2. **If on feature branch** (worktree or otherwise):
   - Create PR with summary of changes
   - Wait for approval
   - Once approved: merge PR and delete branch

3. **If using worktree**:
   - After merge, remove worktree: `git worktree remove {path}`

## Output Format

Use this format for the fix report:

```markdown
## Fix Investigation

### Git History
[Relevant past fixes/commits found, or "No related history found"]

### Project Conventions
[Relevant conventions that apply, or "No specific conventions found"]

### Affected Areas
[Files and code that may be impacted]

### Root Cause
[Analysis: Symptom → Immediate cause → Root cause]

---

## Proposed Fix

[Description of fix and rationale]
[Reference to how this relates to past work if applicable]

**Awaiting approval to implement.**

---

## Verification

### Tests Run
[Test results or "No tests found"]

### Regression Checklist
- [ ] [Area 1]: [What to verify]
- [ ] [Area 2]: [What to verify]
- [ ] [Area 3]: [What to verify]

### Convention Notes
[If applicable: notification about potential convention change]
[If not applicable: "No convention changes identified"]
```
