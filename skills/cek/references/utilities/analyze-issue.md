# Analyze Issue

Analyze a GitHub issue and create a detailed technical specification.

## Usage

`/analyze-issue [issue number]`

## Steps

1. **Check if issue is loaded**
   - Look for file in `./specs/issues/`
   - Pattern: `<NNN>-<kebab-case-title>.md`
   - If not found, fetch from GitHub

2. **Fetch issue** (if needed)
   - Read load-issues.md for fetch instructions
   - Save following the format

3. **Understand requirements** thoroughly

4. **Review related code and structure**

5. **Create technical specification**

## Specification Format

```markdown
# Technical Specification for Issue #[NUMBER]

## Issue Summary
- Title: [from GitHub]
- Description: [brief from issue]
- Labels: [from issue]
- Priority: [High/Medium/Low]

## Problem Statement
[1-2 paragraphs explaining the problem]

## Technical Approach
[Detailed technical approach]

## Implementation Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Test Plan
1. Unit Tests:
   - [test scenario]
2. Component Tests:
   - [test scenario]
3. Integration Tests:
   - [test scenario]

## Files to Modify
- [file path]: [changes]

## Files to Create
- [file path]: [purpose]

## Existing Utilities to Leverage
- [utility name/path]: [purpose]

## Success Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]

## Out of Scope
- [item 1]
- [item 2]
```

## Output

Save specification to:
`./specs/issues/<NNN>-<kebab-case-title>.specs.md`

Example: Issue #7 "Make code review trigger on SQL and sh changes"
→ `./specs/issues/007-make-code-review-trigger-on-sql-sh-changes.specs.md`

After saving, confirm:
- Issue number and title analyzed
- File path where saved
- Key highlights (2-3 bullet points)

## Guidelines

- Follow TDD principles
- Apply KISS approach
- Respect 300-line file limit
