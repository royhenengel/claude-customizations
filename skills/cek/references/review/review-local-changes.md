# Local Changes Review

Comprehensive review of local uncommitted changes using specialized agents with improvement suggestions.

## Overview

Similar to PR review but for local changes before commit. Includes code improvement suggestions alongside issue detection.

## Usage

`/review-local-changes [review-aspects]`

## Variables

- ASPECTS: Optional focus areas (default: all applicable)

**Important**: Skip reviewing `spec/` and `reports/` folders unless specifically asked.

## Workflow

### Phase 1: Preparation

1. **Determine Scope**
   ```bash
   git status --short
   git diff --name-only
   ```

2. **Launch Haiku agent** to find instruction files: CLAUDE.md, AGENTS.md, constitution.md, README.md

3. **Analyze changes** with Haiku agent:
   - Run `git diff --name-only` and `git diff --stat`
   - Identify file types and scope
   - Return summary with change statistics

4. If no changes, inform user and exit

### Phase 2: Issue and Improvement Detection

**Available Review Agents** (Sonnet):

| Agent | Focus |
|-------|-------|
| security-auditor | Security vulnerabilities |
| bug-hunter | Bugs, issues, silent failures |
| code-quality-reviewer | Guidelines, maintainability, **improvement suggestions** |
| contracts-reviewer | Type design, API changes, data modeling |
| test-coverage-reviewer | Test coverage quality |
| historical-context-reviewer | Git history, previous commits |

**Applicability**:
- Always: bug-hunter, code-quality-reviewer, security-auditor, historical-context-reviewer
- Test files changed: test-coverage-reviewer
- Types/API/data changed: contracts-reviewer

**Note**: code-quality-reviewer should provide specific improvement and simplification suggestions.

### Phase 3: Confidence Scoring

For each issue, launch Haiku agent with confidence scale:

- 0: False positive, pre-existing
- 25: Might be real, unverified
- 50: Verified but nitpick
- 75: Verified, important, will be hit
- 100: Confirmed, frequent

**Filter threshold**: Score >= 80

### Report Format

```markdown
# Local Changes Review Report

## Quality Assessment

**Quality Gate**: READY TO COMMIT / NEEDS FIXES

**Blocking Issues Count**: X

### Code Quality Scores
- **Security**: X/Y
  - Vulnerabilities: Critical: X, High: X, Medium: X, Low: X
- **Test Coverage**: X/Y
- **Code Quality**: X/Y
- **Maintainability**: Excellent / Good / Needs Improvement

---

## Required Actions

### Must Fix Before Commit
1. [Blocking issue]

### Better to Fix Before Commit
1. [Important issue]

### Consider for Future
1. [Non-blocking suggestion]

---

## Found Issues & Bugs

| File:Lines | Issue | Evidence | Impact |
|-----------|-------|----------|--------|
| `file:lines` | [description] | [evidence] | [impact] |

**Impact types**:
- **Critical**: Runtime errors, data loss, system crash
- **High**: Core feature breaks, data corruption
- **Medium**: Edge case errors, performance issues
- **Low**: Code smells, maintainability

---

## Security Vulnerabilities

| Severity | File:Lines | Type | Risk | Fix |
|----------|-----------|------|------|-----|
| [severity] | `file:lines` | [type] | [risk] | [fix] |

---

## Failed Checklist Items

| File:Lines | Issue | Description | Fix Required |
|-----------|-------|-------------|--------------|
| [file]:[lines] | [brief] | [detailed] | [fix] |

---

## Code Improvements & Simplifications

1. **[Improvement description]**
   - **Priority**: High
   - **Affects**: `[file]:[function/method]`
   - **Reasoning**: [why this matters]
   - **Effort**: Low/Medium/High
```

### No Issues Found

```markdown
# Local Changes Review Report

## All Clear!

No critical issues found. The code changes look good!

**Checked for**:
- Bugs and logical errors
- Security vulnerabilities
- Code quality and maintainability
- Test coverage
- Guidelines compliance

**Quality Gate**: READY TO COMMIT

---

## Optional Improvements

[Non-blocking suggestions if any]
```

## False Positive Examples

- Pre-existing issues in unchanged code
- Looks like bug but isn't
- Pedantic nitpicks
- Linter/typechecker catches
- General quality issues unless in CLAUDE.md
- Issues silenced in code
- Intentional functionality changes

## Guidelines

- Security first: High/Critical security issues block commit
- Quantify everything
- Be pragmatic: Focus on real issues
- Skip trivial issues in large changes (>500 lines)
- Improvements should be actionable with code examples
- Consider effort vs impact
- Align with project standards

## Notes

- Review happens **before commit** - opportunity to catch issues early
- Don't block reasonable changes for minor style issues
- Improvements can be addressed in future iterations
