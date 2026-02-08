# Workflow: /stop

> **DEPRECATED**: Manual /stop is no longer required. Current State in STATE.md is maintained automatically during /build. Use this command only to manually refresh the Current State summary.

## Purpose

Optional utility to manually refresh the Current State section in STATE.md. Not required for normal workflow - Current State is maintained automatically during /build.

## When to Use

- **Optional**: Manually refresh Current State summary
- **Optional**: Add notes to Current State before ending session
- **Not needed**: For normal session endings (Current State is auto-maintained)

## Entry Point

User invokes `/stop` when they want to manually refresh Current State.

## Triggers

### Manual

User says `/stop` or "refresh state", "update current state".

## Steps

### 1. Read Current STATE.md

Read `planning/STATE.md` to understand:

- Current feature and progress
- Existing Current State section
- Recent decisions and work

### 2. Summarize Recent Work

Based on the conversation and recent changes:

- What was accomplished this session
- What's currently working
- What's not working or incomplete
- Any blockers or issues

### 3. Update Current State Section

Update the Current State section in STATE.md:

```markdown
## Current State

### What's Working

- {Thing 1 that works and how to verify}
- {Thing 2 that works and how to verify}

### What's Not Working

- {Thing 1 that's broken or incomplete}
- {Blocker or issue if any}

**Verdict**: {One-line summary: "Core functionality works, edge cases incomplete" or similar}
```

### 4. Confirmation Message

```
Current State refreshed!

Updated: planning/STATE.md

Summary:
- Working: {brief list}
- Not Working: {brief list}
- Verdict: {one-line verdict}
```

## Integration Flow

```
/stop invoked
    |
    v
Read STATE.md
    |
    v
Summarize recent work
    |
    v
Update Current State section in STATE.md
    |
    v
"Current State refreshed!"
```

## Error Handling

**No planning/ directory:**

```
No active project found.
Nothing to refresh.
```

**No STATE.md:**

```
No STATE.md found.
Run /start first to initialize project state.
```
