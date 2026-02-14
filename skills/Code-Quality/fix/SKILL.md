---
name: fix
description: Thorough fix workflow with git history, root cause analysis, and regression prevention
arguments:
  - name: issue
    description: Description of the issue to fix (or leave blank for interactive)
    required: false
---

# /fix - Thorough Fix Workflow

A disciplined fix process that ensures complete solutions by consulting git history, respecting project conventions, and preventing regressions.

## Step 1: Understand the Issue

Say:
```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Investigating Project
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**If `{{issue}}` provided with sufficient detail** (covers the problem, expected behavior, and how to reproduce):

Summarize your understanding and proceed to Step 2. If the issue description has gaps, ask only for what's missing.

**If no `{{issue}}` provided or it lacks detail:**

### 1a. Relate to Past Work

Scan `planning/specs/` for feature directories. For each directory containing a SUMMARY.md, extract:
- Feature name (directory name, converted from kebab-case to title case)
- First sentence from the first `##` section after the metadata block

Present as a numbered list:

```
Is this related to past work?

1. {Feature Name} - {one-line summary}
2. {Feature Name} - {one-line summary}
...
N. Not related to past work

Pick a number, or describe the context directly:
```

If `planning/specs/` does not exist or contains no SUMMARY.md files, skip this step.

If user selected a feature, automatically include that feature's context (SPEC.md, PLAN.md, SUMMARY.md) in the git history search (Step 2).

### 1b. Gather Details

```
Please describe:
1. What's happening (the problem)
2. What should happen (expected behavior)
3. How to reproduce it (if known)
```

## Step 1a: Worktree Detection and State Setup

```bash
# Detect if running in a worktree
if [ -f .git ]; then echo "WORKTREE"; else echo "MAIN"; fi
```

**If in a worktree:**

Derive name from branch:
```bash
git branch --show-current
```

Check if feature PROGRESS.md already exists:
```bash
ls planning/specs/{name}/PROGRESS.md 2>/dev/null
```

**Scenario A - Fix worktree** (PROGRESS.md exists with `**Type**: fix`, or no PROGRESS.md exists):

If no PROGRESS.md exists, create fix state directory and file:
```bash
mkdir -p planning/specs/{fix-name}
```

Create `planning/specs/{fix-name}/PROGRESS.md`:

```markdown
# {Fix Name} State

**Type**: fix
**Stage**: investigating
**Last Updated**: {timestamp}

## Issue

{From Step 1 - problem description}

## Root Cause

(Pending - determined in Step 5)

## Proposed Fix

(Pending - determined in Step 6)

## Current State

### What's Working

(Nothing verified yet)

### What's Not Working

{The reported issue}

### Next Steps

1. Complete investigation (Steps 2-5)
```

Update `planning/STATE.md` Feature Registry:
```markdown
| {fix-name} | fix | active | {branch} | {worktree-path} |
```

Continue to Step 2 with full state tracking.

**Scenario B - Feature worktree** (PROGRESS.md exists with `**Type**: feature` or no Type field):

The user is running /fix while working on a feature. Do NOT create separate fix state.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Fix context: inside feature worktree ({name})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Is this fix related to the current feature ({name})?

1. **Yes, related to this feature** → Run /fix Steps 2-8 (investigation + implementation). No separate fix PROGRESS.md. Track findings in feature PROGRESS.md Notes section. Fix becomes part of the feature PR. Skip Steps 9a and 10 (quality gates run with the feature's /build completion).

2. **No, unrelated** → Add to `planning/BACKLOG.md` for separate handling. Options:
   a. Create a fix worktree from main (commit current work first)
   b. Note for later, continue feature work

Continue to Step 2 (Scenario A and B-related only).

**If on main** (not in a worktree):

No fix state directory or PROGRESS.md is created. /fix runs its full 10-step process. A branch is created in Step 10 for PR-based review.

## Step 2: Git History Search

**Check existing solutions first:**

If `planning/solutions/` exists, search for matching problems:

```bash
# Search solution files for related keywords
grep -rl "<relevant-keyword>" planning/solutions/ 2>/dev/null | head -5
```

If matching solutions found, present them:

```text
Found existing solution(s) that may match:
- planning/solutions/{category}/{filename}.md: {title from frontmatter}

Review before investigating? (yes/no)
```

If user says yes, read the matching solution(s) and assess applicability. If the solution matches, apply it directly. If not, proceed with investigation.

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

**State update** (worktree only): Update fix PROGRESS.md - set "Root Cause" section, stage → `proposed`.

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

**State update** (worktree only): Update fix PROGRESS.md - set "Proposed Fix" section.

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

**State update** (worktree only): Update fix PROGRESS.md - stage → `implementing`, update Current State (What's Working, What's Not Working).

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

**State update** (worktree only): Update fix PROGRESS.md - stage → `verifying`, update What's Working with verified items.

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

## Step 9a: Auto-Capture Solution

If the fix involved a non-trivial root cause (not a typo, missing import, or obvious error):

Automatically invoke `/compound` with context from this fix session. Pass the root cause analysis from Step 5 as context. If `/compound` fails for any reason, log a note and continue. Do not block the /fix workflow.

Do not prompt the user. After capture completes, display:

```text
Solution captured: planning/solutions/{category}/{filename}.md
```

The user can review, edit, or delete solutions at any time.

Skip for trivial fixes (typos, missing imports, obvious errors).

## Step 9b: Documentation & Quality Review

**Applies to all fix scenarios** (worktree fixes and main-branch fixes):

### Documentation Review

Launch doc-enforcer agent in audit mode:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTATION REVIEW: Compliance Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Agent - Documentation (docs-enforcer):**

```text
Audit documentation for the {fix-name} fix.

Focus:
- Fix state directory complete (PROGRESS.md with current state)
- No misplaced files
- Modified markdown files follow documentation type system

Provide audit results with severity levels.
```

### PR Review

After PR is created in Step 10, launch review agents on the full PR diff:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PR REVIEW: Full Diff Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Launch in parallel:

**Agent 1 - Code Review (code-reviewer):**
Review the full PR diff for code quality and consistency.

**Agent 2 - Test Coverage (test-coverage-reviewer):**
Review test coverage for the fix. Flag untested paths.

**Agent 3 - Contracts (contracts-reviewer):**
Review changes to public APIs, data models, and type definitions for breaking changes.

Present consolidated findings. Critical issues must be addressed before merge.

## Step 10: Finalize Changes

When user says "complete", "mark as complete", or similar:

**For all fixes (worktree and main):**

1. **Create branch** (if on main, not already on a branch):
   ```bash
   git checkout -b fix/{fix-description}
   ```

2. **Commit and push**:
   - Stage all changes
   - Create conventional commit with fix summary
   - Push to remote

3. **Create PR** with fix summary

4. **Run Step 9a PR reviewers** (doc-enforcer + 3 review agents)

5. **Address critical findings** before merge

6. **Merge PR and delete branch**

**Additional steps for worktree fixes:**

7. Remove worktree: `git worktree remove {path}`

8. Update fix PROGRESS.md: stage → `complete`

9. Update project STATE.md Feature Registry: fix status → `complete`

**Note**: For in-feature fixes (Scenario B-related from Step 1a), Step 10 does not apply. The fix is committed as part of the feature's /build finalization.

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
