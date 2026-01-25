# Workflow: /stop

## Purpose

Pause work with comprehensive handoff for clean session transitions.

## When to Use

- Context is filling up (offer at 15%, auto at 10%)
- Taking a break from work
- Switching to different task
- End of work session

## Entry Point

User invokes `/stop` or context reaches critical level.

## Triggers

### Manual

User says `/stop` or "pause", "stop", "take a break", "save progress".

### Automatic (Context Health)

| Level | Action |
|-------|--------|
| **15% remaining** | Offer: "Context getting full. Run /stop to save progress?" |
| **10% remaining** | Auto-trigger: "Creating handoff before context fills." |

## Steps

### 1. Capture Current State

Read:
- `planning/STATE.md` - current stage and progress
- `planning/specs/*/PLAN.md` - active plan (if any)
- Recent work - what was just done

### 2. Gather Handoff Information

Collect (all sections are REQUIRED):

- **Working/Not Working**: Explicit verdict on what functions vs what's broken/incomplete
- **Decisions made**: Every significant choice with rationale (from STATE.md + conversation)
- **Remaining tasks**: Checklist of incomplete tasks from PLAN.md
- **Next steps**: Clear actions for resuming (different from remaining tasks - these are immediate actions)
- **Open questions**: Uncertainties that need resolution
- **Files changed**: Recent modifications

### 3. Create HANDOFF.md

```markdown
# Session Handoff

**Created**: {timestamp}
**Stage**: {current stage from STATE.md}

## Feature Registry Snapshot

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| {active-feature} | paused | {n}/{m} | - |
| {other features...} | {status} | {progress} | {deps} |

## Resume Point

**Feature**: {active feature name}
**Task**: {current task number and name}
**Task Progress**: {if partially complete, what's done on current task}

## Task Checklist ({feature-name})

Copy from STATE.md Progress section:

- [x] Task 1: {description}
- [x] Task 2: {description}
- [~] Task 3: {description} (partial progress note if applicable)
- [ ] Task 4: {description}
- [ ] Task 5: {description}

## Session Summary

{Brief description of what was worked on this session}

## Current State (REQUIRED)

### What's Working

- {Thing 1 that works and how to verify}
- {Thing 2 that works and how to verify}

### What's Not Working

- {Thing 1 that's broken or incomplete}
- {Blocker or issue if any}

**Verdict**: {One-line summary: "Core functionality works, edge cases incomplete" or similar}

## Decisions Made (REQUIRED)

| Decision | Rationale | Alternatives Rejected |
|----------|-----------|----------------------|
| {Decision 1} | {Why this choice} | {What else was considered} |
| {Decision 2} | {Why this choice} | {What else was considered} |

If no decisions were made this session, state: "No architectural decisions this session."

## Progress (REQUIRED)

### Completed This Session

- [x] {Task 1 from PLAN.md}
- [x] {Task 2 from PLAN.md}

### Remaining Tasks (from PLAN.md)

- [ ] {Task 3 - exact task name from plan}
- [ ] {Task 4 - exact task name from plan}
- [ ] {Task 5 - exact task name from plan}

Copy remaining tasks directly from PLAN.md. Do not summarize or paraphrase.

## Next Steps (REQUIRED)

Immediate actions when resuming (not the same as Remaining Tasks above):

1. {First action - e.g., "Review test failures from last run"}
2. {Second action - e.g., "Address open question about X"}
3. {Third action - e.g., "Continue with Task 3 from plan"}

## Open Questions

- {Question 1 that needs resolution}
- {Question 2 that needs user input}

## Files Changed

| File | Change |
|------|--------|
| `path/to/file.ts` | {What changed} |
| `path/to/other.ts` | {What changed} |

## Context for Next Session

{Any additional context that would be helpful}

---

*This handoff was created by /stop. Delete after resuming.*
```

Write to `planning/HANDOFF.md`.

### 4. Update STATE.md

```markdown
**Stage**: stopping
**Last Updated**: {timestamp}

## Active Feature

**Name**: {feature-name}
**Status**: paused
**Progress**: {n}/{m}

## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| {feature-name} | paused | {n}/{m} | - |
| {other features...} | {status} | {progress} | {deps} |

## Current Focus

Session paused - see HANDOFF.md for resume context

## Progress

{Copy progress from handoff}

## Notes

- Session ended: {timestamp}
- Handoff created: planning/HANDOFF.md
```

### 5. Completion Message

```
Session paused!

Created: planning/HANDOFF.md

When you return:
1. Run /start - it will detect HANDOFF.md
2. You'll see a summary of where you left off
3. Confirm to continue or start fresh

Handoff contents:
- Current state: {summary}
- Progress: {X} tasks done, {Y} remaining
- Next steps: {first step}

Take care! 👋
```

## Resume Behavior

When `/start` detects HANDOFF.md:

1. Read HANDOFF.md completely
2. Summarize: "Last session ended with: {summary}"
3. Show: Current state, decisions, next steps
4. Ask: "Ready to continue from here, or start fresh?"

**If continuing:**
- Delete HANDOFF.md (it's temporary)
- Update STATE.md with resumed focus
- Pick up at "Next Steps" from handoff

**If starting fresh:**
- Archive HANDOFF.md to `planning/archive/`
- Reset STATE.md
- Begin new work

## Handoff Principles

### Comprehensive but Scannable

Include everything needed to resume, but organized for quick scanning:
- Headers for sections
- Tables for structured data
- Lists for steps

### Delete After Resume

HANDOFF.md is temporary. Once resumed, it's deleted.
This prevents stale handoffs from accumulating.

### No Auto-Commit

User prefers manual commits. /stop does NOT commit changes.
If user wants to commit, they do it separately.

## Auto-Handoff Behavior

When context reaches 10%:

```
⚠️ Context at 10% remaining.

Creating automatic handoff to preserve session state...

{Create HANDOFF.md}

Handoff saved to planning/HANDOFF.md

Run /start in a new session to continue.
```

This ensures work is never lost to context exhaustion.

## Integration Flow

```
/stop invoked (or auto-triggered)
    |
    v
Read current state (STATE.md, recent work)
    |
    v
Gather handoff information
    |
    v
Create planning/HANDOFF.md
    |
    v
Update STATE.md (stage: stopping)
    |
    v
"Session paused! Run /start to resume."
```

## Error Handling

**No planning/ directory:**
```
No active project found.
Nothing to save - no handoff needed.
```

**Already stopped (HANDOFF.md exists):**
```
A handoff already exists from {timestamp}.

Options:
1. Update it with current context
2. Keep existing and exit
3. Delete and create fresh handoff
```
