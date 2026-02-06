---
name: status
description: Show project planning status and progress
---

Display the current state of project planning and execution.

## Process

1. **Check for planning structure:**
   ```bash
   ls -la .planning/ 2>/dev/null || echo "No .planning directory"
   ```

2. **Read core files:**
   ```bash
   cat .planning/OVERVIEW.md 2>/dev/null
   cat .planning/ROADMAP.md 2>/dev/null
   ```

3. **Scan stages:**
   ```bash
   ls -la .planning/stages/ 2>/dev/null
   ```

4. **Find plans and summaries:**
   ```bash
   find .planning/stages -name "*-PLAN.md" 2>/dev/null
   find .planning/stages -name "*-SUMMARY.md" 2>/dev/null
   ```

5. **Check for handoff:**
   ```bash
   cat .planning/HANDOFF.md 2>/dev/null
   ```

## Output Format

```
# Project Status: [Project Name]

## Overview
[One-line from OVERVIEW.md]

## Progress
| Stage | Plans | Status |
|-------|-------|--------|
| 01-foundation | 2/3 | In progress |
| 02-features | 0/2 | Not started |
| 03-polish | 0/1 | Not started |

## Current Work
**Active Stage**: 01-foundation
**Active Plan**: 01-02-PLAN.md - [description]
**Last Completed**: 01-01-SUMMARY.md - [date]

## Handoff
[If HANDOFF.md exists, show summary]
[If no handoff: "No active handoff"]

## Next Steps
1. [Based on ROADMAP and current progress]
2. [Suggested next action]
```

## No Planning Structure

If no `.planning/` directory exists:

```
# Project Status

No planning structure found.

To get started:
- Run /init to create project OVERVIEW and ROADMAP
- Run /plan to create detailed stage plans

Current directory: [pwd]
Git status: [branch, clean/dirty]
```

## Quick Commands

After showing status, suggest relevant commands:

- If no structure: "Run `/init` to start planning"
- If has roadmap but no plans: "Run `/plan` to plan next stage"
- If has active plan: "Run `/execute .planning/stages/XX-name/XX-YY-PLAN.md` to continue"
- If has handoff: "Review HANDOFF.md and continue from there"
