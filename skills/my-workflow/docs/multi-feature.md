# Multi-Feature Workflow Guide

This guide documents how the my-workflow system handles multiple features in a single project.

## Core Principle

**Only ONE feature can be actively building at a time.** Multiple features can be planned, paused, or blocked, but execution focus remains singular. This preserves simplicity and prevents context fragmentation.

## Feature Lifecycle

```text
[drafted] → [ready] → [active] → [complete]
                ↓         ↓
            [blocked]  [paused]
```

| State | Description |
|-------|-------------|
| **drafted** | SPEC.md exists but no PLAN.md yet |
| **ready** | PLAN.md approved, waiting to build |
| **active** | Currently executing (`/build` in progress) |
| **paused** | Started, then suspended (via `/stop` or switching) |
| **blocked** | Depends on another feature that isn't complete |
| **complete** | All tasks verified |

## Feature Registry

The Feature Registry in STATE.md tracks all features:

```markdown
## Feature Registry

| Feature | Status | Progress | Dependencies |
|---------|--------|----------|--------------|
| user-auth | active | 3/5 | - |
| dashboard | blocked | 0/4 | user-auth |
| api-rate | ready | 0/3 | - |
```

## Common Scenarios

### Planning Multiple Features Before Building

1. Run `/plan` for first feature → status becomes `ready`
2. Run `/plan` again → prompted with options:
   - Pause nothing (no active build), proceed with planning
3. Repeat for additional features
4. Run `/build` → shown Feature Registry, pick which to build first

### Switching Features Mid-Build

1. Building Feature A, need to pause → run `/stop`
2. Feature A becomes `paused` in registry
3. Next session, `/start` shows:
   - Resume Feature A
   - Switch to Feature B (if ready)
   - Start fresh

### Cross-Feature Requests During Build

When user says "also add Feature B" during Feature A:

1. System assesses: same-feature or cross-feature?
2. Shows impact and 3 options:
   - Add to current plan (extends build)
   - Add to BACKLOG.md (plan later)
   - Create separate plan (new feature in registry)
3. User decides based on context

### Feature Dependencies

Notation in BACKLOG.md:

```markdown
- [ ] dashboard-redesign (depends: user-auth) - Needs auth context
- [ ] api-rate-limiting (depends: user-auth, core-api) - Multiple deps
```

**Behavior:**

- **At plan time**: Warning if dependency not complete
- **At build time**: Cannot select blocked features
- **When dependency completes**: Prompt to unblock dependents

## Decision Trees

### When to Switch Features

```text
Mid-build, want to work on something else?
    │
    ├─ Is it urgent/blocking?
    │       │
    │       ├─ Yes → Pause current (/stop), build new
    │       └─ No  → Add to backlog, continue current
    │
    └─ Is current feature near completion?
            │
            ├─ Yes → Finish it, then switch
            └─ No  → Consider pausing if new work is higher priority
```

### When to Batch Plan vs Separate

```text
User provides multiple features to implement
    │
    ├─ Are they related (shared domain)?
    │       │
    │       ├─ Yes, with shared dependencies → Plan as phases of one feature
    │       └─ Yes, but independent → Plan separately, note relationship
    │
    └─ Are they unrelated?
            │
            └─ Plan separately, each in Feature Registry
```

## Best Practices

1. **Complete before switching**: Finishing a feature is better than pausing multiple features partially done

2. **Keep features small**: Large features are harder to pause/resume cleanly

3. **Use dependencies explicitly**: Mark blocking dependencies in BACKLOG.md and PLAN.md

4. **Review registry regularly**: Before starting work, check what's paused/blocked

5. **One active, many ready**: It's fine to have multiple features planned and ready, but only build one at a time

## Integration with Workflows

| Command | Multi-Feature Behavior |
|---------|------------------------|
| `/start` | Shows Feature Registry from HANDOFF.md, offers resume/switch |
| `/plan` | Detects active feature, offers pause/queue/draft |
| `/build` | Shows registry, filters blocked, offers selection |
| `/stop` | Marks active feature as paused, snapshots registry |

## Example Session

```text
Session 1:
/start → New project
/plan user-auth → Creates spec, status: ready
/plan api-rate → Creates spec, status: ready
/build → Shows both, user picks user-auth
... builds 3/5 tasks ...
/stop → user-auth: paused (3/5), api-rate: ready (0/3)

Session 2:
/start → Shows registry
  1. Resume user-auth (3/5)
  2. Switch to api-rate
User picks 1 → continues user-auth
... completes remaining tasks ...
/build → user-auth: complete, api-rate: ready
User picks api-rate → builds it
```
