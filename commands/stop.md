---
description: Create handoff document and pause work cleanly
---

Create a handoff document capturing current state for future continuation.

## When to Use

- End of work session
- Need to switch contexts
- Handing off to another person/session
- Before any potentially disruptive action

## Process

1. **Gather current state:**
   ```bash
   git status
   git log --oneline -5
   git diff --stat
   cat .planning/ROADMAP.md 2>/dev/null
   ls .planning/stages/*/PLAN.md 2>/dev/null
   ```

2. **Check TodoWrite for active tasks**

3. **Create HANDOFF.md:**

```markdown
# Handoff: [Project/Feature Name]

**Created**: [timestamp]
**Session**: [brief description of what was being worked on]

## Current State

### Active Work
- **Stage**: [current stage]
- **Plan**: [current plan if any]
- **Task**: [specific task in progress]

### Progress
- [x] Completed task 1
- [x] Completed task 2
- [ ] In progress: task 3 (50% done)
- [ ] Not started: task 4

### Files Modified (uncommitted)
```
[git status output or summary]
```

## Context

### What Was Being Done
[2-3 sentences explaining the current work]

### Why This Approach
[Brief explanation of decisions made]

### Key Decisions Made
- Decision 1: [what and why]
- Decision 2: [what and why]

## To Continue

### Immediate Next Steps
1. [Specific next action]
2. [Following action]
3. [After that]

### Commands to Run
```bash
# Suggested commands to resume
[relevant commands]
```

### Files to Review
- `path/to/file.ts` - [why to review]
- `path/to/other.ts` - [why to review]

## Blockers / Questions

[Any blockers or open questions, or "None"]

## Notes

[Any additional context that would help continuation]
```

4. **Save handoff:**
   ```bash
   # Write to .planning/HANDOFF.md
   ```

5. **Confirm:**
   ```
   Handoff created: .planning/HANDOFF.md

   Summary:
   - [X] tasks completed
   - [Y] tasks remaining
   - [uncommitted changes status]

   To resume: Run /status to see current state
   ```

## If No Planning Structure

If no `.planning/` exists, create minimal handoff:

```bash
mkdir -p .planning
# Write HANDOFF.md with just git state and notes
```

## Clean Exit Checklist

Before creating handoff, consider:

- [ ] All tests passing? (or note failures)
- [ ] Any uncommitted changes? (commit or note)
- [ ] Any running processes to stop?
- [ ] Any temporary files to clean?
- [ ] Browser tabs or resources to note?

Present checklist to user if any items need attention.
