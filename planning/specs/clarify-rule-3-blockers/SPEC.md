# Clarify Rule 3 (Blockers) Specification

## Goal

Clarify the distinction between Bug (Rule 1), Blocker (Rule 3), and Gap (Rule 6) in the deviation rules. The current definitions overlap and cause confusion about when to apply which rule.

## Problem Statement

Current deviation rules have ambiguous boundaries:

- **Rule 1** "Broken behavior found" could mean a bug OR a blocker
- **Rule 3** "Can't proceed" overlaps with bugs that also prevent progress
- **Rule 6** "Prerequisite missing" overlaps with Rule 3 blockers

This ambiguity leads to inconsistent rule application during /build execution.

## Requirements

### Functional

- [ ] Define clear, mutually exclusive criteria for Bug vs Blocker vs Gap
- [ ] Add 2-3 concrete examples for each rule type
- [ ] Update deviation rules table in build.md with clearer trigger definitions
- [ ] Add decision tree or quick reference for rule selection

### Non-Functional

- [ ] Definitions must be unambiguous (no overlap between rule triggers)
- [ ] Examples must be realistic (drawn from actual development scenarios)

## Proposed Definitions

Based on backlog analysis:

| Type | Definition | Key Signal |
|------|------------|------------|
| **Bug (Rule 1)** | Code error that breaks existing functionality | Tests fail, wrong output, crash |
| **Blocker (Rule 3)** | External dependency preventing task execution | Missing package, broken import, env issue |
| **Gap (Rule 6)** | Missing planned functionality that another task depends on | Plan ordering issue, prerequisite incomplete |

**Decision logic:**
1. Can you start the task at all? No → Blocker (Rule 3)
2. Does existing code behave incorrectly? Yes → Bug (Rule 1)
3. Is planned functionality missing that you need? Yes → Gap (Rule 6)

## Constraints

- Changes limited to documentation (build.md, SKILL.md, my-workflow-flow files)
- Must not change the fundamental rule numbering (backwards compatibility)
- Must not add new rules

## Success Criteria

- [ ] Reading Rules 1, 3, and 6 consecutively produces no "but what about..." questions
- [ ] A new user can correctly categorize 5 sample scenarios using the decision tree
- [ ] Examples cover common development scenarios (dependencies, imports, test failures)
