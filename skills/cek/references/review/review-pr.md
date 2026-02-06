# Pull Request Review

Comprehensive pull request review using specialized agents with confidence scoring and GitHub integration.

## Overview

Multi-phase review workflow that:
1. Analyzes PR scope and context
2. Launches specialized review agents in parallel
3. Scores issues by confidence and impact
4. Posts filtered findings to GitHub

## Usage

`/review-pr [review-aspects]`

## Variables

- ASPECTS: Optional focus areas for review (default: all applicable)

**Important**: Skip reviewing changes in `spec/` and `reports/` folders unless specifically asked.

## Workflow

### Phase 1: Preparation

1. **Determine Review Scope**
   ```bash
   git status
   git diff --stat
   git diff origin/master --stat  # or origin/main
   ```

2. **Launch parallel Haiku agents**:
   - Check PR eligibility (not closed, not draft)
   - Find instruction files: CLAUDE.md, AGENTS.md, constitution.md, README.md
   - Split files by change volume for parallel analysis

3. **Add PR description** if missing

### Phase 2: Issue Detection

**Available Review Agents** (Sonnet or Opus):

| Agent | Focus |
|-------|-------|
| security-auditor | Security vulnerabilities |
| bug-hunter | Bugs, issues, silent failures |
| code-quality-reviewer | Guidelines, maintainability, quality |
| contracts-reviewer | Type design, API changes, data modeling |
| test-coverage-reviewer | Test coverage quality and completeness |
| historical-context-reviewer | Git history, blame, previous PRs |

**Applicability Rules**:
- Code/config changes (non-cosmetic): bug-hunter, security-auditor
- Code changes (logic, formatting): code-quality-reviewer
- Test files changed: test-coverage-reviewer
- Types/API/data modeling changed: contracts-reviewer
- High complexity or context needed: historical-context-reviewer

Launch all applicable agents in parallel with full file list and project guidelines.

### Phase 3: Confidence and Impact Scoring

For each issue found, launch Haiku agent to score:

**Confidence Score (0-100)**:
- 0: False positive, pre-existing issue
- 25: Might be real, unverified
- 50: Verified but nitpick or rare
- 75: Verified, important, will be hit in practice
- 100: Confirmed, frequent, evidence proves it

**Impact Score (0-100)**:
- 0-20 (Low): Code smell, style inconsistency
- 21-40 (Medium-Low): Maintainability issue, no functional impact
- 41-60 (Medium): Edge case errors, performance, future difficulty
- 61-80 (High): Core feature breaks, data corruption, tech debt
- 81-100 (Critical): Runtime errors, data loss, security breaches

**Threshold Table**:

| Impact | Min Confidence |
|--------|----------------|
| 81-100 (Critical) | 50 |
| 61-80 (High) | 65 |
| 41-60 (Medium) | 75 |
| 21-40 (Medium-Low) | 85 |
| 0-20 (Low) | 95 |

Filter issues not meeting threshold.

### Phase 4: Post Review

**Preferred**: Use `mcp__github_inline_comment__create_inline_comment` for line-specific feedback.

**Fallback**: Use GitHub CLI API:
- Multiple issues: `gh api repos/{owner}/{repo}/pulls/{pr}/reviews`
- Single issue: `gh api repos/{owner}/{repo}/pulls/{pr}/comments`

**Comment Template**:
```markdown
**[Category]**: [Brief description]

**Evidence**: [What indicates this issue]

**Impact**: [Critical/High/Medium/Low]
[Consequence if unfixed]

**Confidence**: [X/100]
[Justification]

**Suggested Fix**:
[Actionable guidance]
```

### Report Format

```markdown
# PR Review Report

**Quality Gate**: PASS / FAIL

**Blocking Issues Count**: X
- Security: X/Y (Vulnerabilities: Critical: X, High: X, Medium: X, Low: X)
- Test Coverage: X/Y
- Code Quality: X/Y

## Required Actions

### Must Fix Before Merge
1. [Blocking issue]

### Better to Fix Before Merge
1. [Important issue]

## Found Issues

| Link | Issue | Evidence | Impact |
|------|-------|----------|--------|
| [file:lines] | [description] | [evidence] | [impact] |

## Security Vulnerabilities

| Severity | Link | Type | Risk | Fix |
|----------|------|------|------|-----|
| [severity] | [file:lines] | [type] | [risk] | [fix] |
```

### No Issues Found

```markdown
# PR Review Report

No issues found. Checked for bugs and CLAUDE.md compliance.
```

## False Positive Examples

- Pre-existing issues
- Looks like bug but isn't
- Pedantic nitpicks
- Linter/typechecker/compiler catches (imports, types, formatting)
- General quality issues unless in CLAUDE.md
- Issues silenced in code (lint ignore)
- Intentional functionality changes
- Issues on unmodified lines

## Notes

- Use `gh` CLI for GitHub interaction
- Make todo list first
- Cite and link each bug with full SHA URLs
- Security issues automatically block merge
- Quantify everything (no "some", "many", "few")
- Large PRs (>500 lines): Focus on architecture and security
