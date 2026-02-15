# Build Phase: Complete

**Phase**: Complete (Steps 8-13)
**When**: Stage is `building` with all tasks checked in Progress.
**Result**: Feature finalized, SUMMARY.md created, PR merged.

Read the feature STATE.md for current context before proceeding.

CRITICAL: Steps 8-13 MUST execute after all tasks complete. Skipping any step is a compliance failure.

Common Rationalizations for Skipping Completion (All Wrong):

| Excuse | Reality |
|--------|---------|
| "The code works, we're done" | Working code is step 8. Steps 9-13 still remain. |
| "No security issues in this change" | You don't know that without running the check. |
| "Quality review isn't needed for small changes" | Small changes introduce bugs too. Run the review. |
| "SUMMARY.md is just documentation" | SUMMARY.md is the audit trail. Without it, work is undocumented. |
| "I'll create the PR later" | Later never comes. Finalize now. |

## Step 8: Verify Completion

After all tasks complete:

- Run verification steps from PLAN.md
- Check success criteria
- Confirm all tests pass

You MUST run ALL verification steps. Do NOT skip verification because the tasks "looked clean".

## Step 8a: Pre-Completion Security Check

Before finalizing, verify against the security checklist:

1. **Review all changed files** for:
   - Hardcoded credentials (API keys, passwords, tokens)
   - Unvalidated input (user input, API responses, file content)
   - Injection vulnerabilities (SQL, shell, XSS)

2. **If security issue found**:
   - Fix before proceeding
   - Note in feature STATE.md under Notes
   - If architectural (requires new auth system, etc.) -> Rule 4 stop

3. **Checklist**:
   - [ ] No hardcoded credentials
   - [ ] Input validation at boundaries
   - [ ] Injection prevention (parameterized queries, escaped commands)
   - [ ] XSS mitigation (escaped user content)
   - [ ] Secure error handling (errors logged, not exposed)

## Step 9: Quality Review (Multi-Perspective)

Launch 3 specialized review agents in parallel.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 QUALITY REVIEW: Multi-Perspective Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching 3 specialized reviewers in parallel...
```

**Agent 1 - Code Quality (cek-code-quality-reviewer):**
- Clean Code principles and DRY
- SOLID principles adherence
- Naming conventions (no utils/helpers/common)
- Code size limits (functions < 50 lines, files < 200 lines)
- Provide: pass/fail per item, quality score (0-100), issues with file:line, severity

**Agent 2 - Security (cek-security-auditor):**
- OWASP Top 10 vulnerabilities
- Input validation and sanitization
- Authentication/authorization gaps
- Sensitive data exposure, hardcoded credentials
- Provide: pass/fail, attack scenarios with file:line, severity, remediation

**Agent 3 - Architecture (architect-reviewer):**
- Clean Architecture alignment
- Design pattern appropriateness
- Technical debt introduction
- Project conventions compliance
- Provide: alignment assessment, tech debt items with severity, file:line citations

**After all reviews complete:**

1. Consolidate by severity:
   - **Critical**: Must fix before completion
   - **Important**: Should fix
   - **Minor**: Nice to fix

2. Present consolidated review:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 REVIEW COMPLETE: {feature}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Summary:
- Code Quality: {score}/100 | {pass/fail count}
- Security: {pass/fail count} | {severity counts}
- Architecture: {alignment} | {tech debt items}

Critical Issues ({count}):
{list with file:line and reviewer source}

Important Issues ({count}):
{list with file:line and reviewer source}

Minor Issues ({count}):
{list with file:line and reviewer source}

Options:
1. Fix all critical issues now
2. Fix critical + important issues now
3. Fix all issues now
4. Add non-critical to BACKLOG.md and proceed
5. Proceed as-is (not recommended if critical issues exist)
```

3. If fixing, launch appropriate developer subagent
4. Re-run affected reviews after fixes

## Step 9a: Documentation Review

Launch docs-enforcer agent in audit mode.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOCUMENTATION REVIEW: Compliance Check
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching docs-enforcer agent...
```

Focus: documentation type system compliance, required sections present, feature spec directory complete. Present findings alongside code quality results.

## Step 10: Create SUMMARY.md

**REQUIRED** - Cannot be skipped. SUMMARY.md must exist before declaring a feature complete.

```markdown
# {Feature} Implementation Summary

**Completed**: {timestamp}
**Plan**: planning/specs/{feature}/PLAN.md

## What Was Built

{Description of implemented feature}

## Tasks Completed

- [x] Task 1: {description} - {outcome}
- [x] Task 2: {description} - {outcome}

## Deviations

| Rule | What Happened | Resolution |
|------|---------------|------------|
| {rule} | {discovery} | {action taken} |

## Verification

- [x] {Verification 1} - PASSED
- [x] {Verification 2} - PASSED

## Files Changed

- `path/to/file.ts` - {what changed}

## Next Steps

- {Follow-up work identified}
- {Enhancements logged for later}
```

Write to `planning/specs/{feature}/SUMMARY.md`.

## Step 11: Update State Files and Feature CLAUDE.md

**Feature STATE.md** (`planning/specs/{feature}/STATE.md`):
- Set stage to `complete`
- Mark all tasks as checked in Progress
- Update Current State with final summary

**Project STATE.md** (`planning/STATE.md`) Feature Registry:
- Set feature status to `complete`

**Feature CLAUDE.md** (`planning/specs/{feature}/CLAUDE.md`):
- Set status to "Implementation complete. See SUMMARY.md for details."

## Step 12: Completion Message

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Build Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Implemented: {feature name}
Tasks: {N} completed
Deviations: {N} (see SUMMARY.md)

Created:
- planning/specs/{feature}/SUMMARY.md

Next steps:
- Review the changes
- Run `/plan` for next feature
```

## Step 13: Finalize Changes

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

On merge: feature spec directory archives naturally. Project STATE.md registry is the only shared file updated. This applies to both features (`/build`) and fixes (`/fix`).

## Step 13a: PR Review

After PR is created, launch review agents on the full PR diff.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PR REVIEW: Full Diff Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Launching PR reviewers in parallel...
```

Launch in parallel:

**Agent 1 - Code Review (code-reviewer):**
Overall code quality, consistency, potential issues missed in per-task reviews. Pass/fail with file:line citations.

**Agent 2 - Test Coverage (test-coverage-reviewer):**
New/modified code has adequate test coverage. Flag untested paths. Coverage assessment with specific gaps.

**Agent 3 - Contracts (contracts-reviewer):**
Breaking changes to public APIs, data models, type definitions. Backwards compatibility, type safety. Severity levels.

**After all reviews complete:**
- Critical issues: address before merge
- Important issues: fix or acknowledge
- Minor issues: note for later

If critical issues found, fix and re-run affected reviews before merge.

## Integration Flow

```
/build invoked -> build-setup.md
    |
    v
Check prerequisites -> Load PLAN.md -> Update STATE.md (stage: building)
    |
    v
build-execute.md
    |
    v
For each task: Select agent -> Launch subagent -> Apply deviation rules -> Update progress
    |
    v
build-complete.md
    |
    v
Verify completion -> Security check -> Quality review -> SUMMARY.md -> Finalize
```
