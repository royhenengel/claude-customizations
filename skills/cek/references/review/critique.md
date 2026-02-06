# Work Critique

Comprehensive multi-perspective review using specialized judges with debate and consensus building.

## Overview

Implements a sophisticated review pattern combining:
- **Multi-Agent Debate**: Multiple specialized judges provide independent perspectives
- **LLM-as-a-Judge**: Structured evaluation framework for consistent assessment
- **Chain-of-Verification (CoVe)**: Each judge validates their own critique before submission
- **Consensus Building**: Judges debate findings to reach agreement on recommendations

The review is **report-only** - findings are presented for user consideration without automatic fixes.

## Usage

`/critique [files, commits, or context]`

## Variables

- SCOPE: Files, commits, or context to review (default: recent changes in conversation)

## Workflow

### Phase 1: Context Gathering

1. **Identify scope**:
   - If arguments provided: Use them to identify specific files, commits, or context
   - If no arguments: Review recent conversation history and file changes
   - Ask user if scope is unclear

2. **Capture context**:
   - Original requirements or user request
   - Files modified or created
   - Decisions made during implementation
   - Constraints or assumptions

3. **Summarize for confirmation**:
   ```
   Review Scope:
   - Original request: [summary]
   - Files changed: [list]
   - Approach taken: [brief description]

   Proceeding with multi-agent review...
   ```

### Phase 2: Independent Judge Reviews (Parallel)

Spawn three specialized judge agents in parallel using Task tool.

#### Judge 1: Requirements Validator

Assesses alignment with original requirements:
- List all requirements from original request
- Check each against implementation
- Identify gaps, over-delivery, or misalignments
- Self-verification with 3-5 questions
- Score: X/10 with coverage breakdown

#### Judge 2: Solution Architect

Evaluates technical approach and design decisions:
- Analyze chosen approach
- Consider alternatives with trade-offs
- Evaluate design patterns and best practices
- Self-verification questions
- Score: X/10 with approach assessment

#### Judge 3: Code Quality Reviewer

Assesses implementation quality and refactoring opportunities:
- Code readability and clarity
- Code smells and complexity
- Naming, structure, organization
- Duplication and coupling
- Error handling and edge cases
- Score: X/10 with specific issues

### Phase 3: Cross-Review and Debate

After receiving all judge reports:

1. **Synthesize findings**:
   - Identify areas of agreement
   - Identify contradictions or disagreements
   - Note gaps in any review

2. **Conduct debate** (if disagreements exist):
   - Present conflicting viewpoints
   - Ask judges to review each other's findings
   - Spawn follow-up agents with context of previous reviews

3. **Reach consensus**:
   - Synthesize debate outcomes
   - Identify better-supported viewpoints
   - Document unresolved disagreements

### Phase 4: Consensus Report

```markdown
# Work Critique Report

## Executive Summary
[2-3 sentences summarizing overall assessment]

**Overall Quality Score**: X/10

---

## Judge Scores

| Judge | Score | Key Finding |
|-------|-------|-------------|
| Requirements Validator | X/10 | [summary] |
| Solution Architect | X/10 | [summary] |
| Code Quality Reviewer | X/10 | [summary] |

---

## Strengths
[Synthesized list with specific examples]

## Issues & Gaps

### Critical Issues
[Must-fix items]

### High Priority
[Important but not blocking]

### Medium Priority
[Nice to have improvements]

---

## Requirements Alignment
**Requirements Met**: X/Y
**Coverage**: Z%

## Solution Architecture
**Chosen Approach**: [description]
**Alternatives Considered**: [list with reasoning]

## Refactoring Recommendations
[Prioritized list with before/after examples]

---

## Areas of Consensus
[Where all judges agreed]

## Areas of Debate
[Where judges disagreed with resolution]

---

## Action Items (Prioritized)

**Must Do**:
- [ ] [Critical action]

**Should Do**:
- [ ] [High priority action]

**Could Do**:
- [ ] [Medium priority action]

---

## Learning Opportunities
[Lessons for future work]

---

**Verdict**: Ready to ship | Needs improvements | Requires significant rework
```

## Guidelines

- Be objective: Base assessments on evidence
- Be specific: Cite file locations, line numbers, code examples
- Be constructive: Frame criticism as opportunities
- Be balanced: Acknowledge both strengths and weaknesses
- Be actionable: Provide concrete recommendations
- Consider context: Account for constraints and timelines

## Notes

- Report-only command - does not make changes
- Review may take 2-5 minutes due to multi-agent coordination
- Disagreements between judges are valuable insights
- Use findings to inform future development decisions
