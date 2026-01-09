# My Workflow

## Flow

```
BROWNFIELD                          GREENFIELD
     │                                   │
     ▼                                   │
/map-codebase                            │
(7 analysis docs)                        │
     │                                   │
     └──────────►  brainstorming  ◄──────┘
                        │
                        ▼
                    BRIEF.md
                        │
                        ▼
                   ROADMAP.md
                        │
                        ▼
              PLAN.md (per phase)
                        │
                        ▼
               Subagent per task
                        │
            ┌───────────┴───────────┐
            ▼                       ▼
       STATE.md              features/CLAUDE.md
    (progress/handoff)        (what we built)
```

## Steps

| Step | Tool | Output |
|------|------|--------|
| Analyze existing code | `/map-codebase` | `.planning/codebase/*.md` (7 docs) |
| Explore the idea | `brainstorming` skill | `docs/plans/<date>-<topic>-design.md` |
| Define vision | `taches-create-plans` | `.planning/BRIEF.md` |
| Structure phases | `taches-create-plans` | `.planning/ROADMAP.md` |
| Plan phase | `taches-create-plans` | `.planning/phases/XX/PLAN.md` |
| Execute | Subagent per task | Code changes |
| Track progress | Manual/auto | `STATE.md` |
| Document features | `living-requirements` | `features/*/CLAUDE.md` |

## STATE.md Format

TODO: Define structure

## When to Use

**Structured mode triggers:**
- Will take more than one session
- More than 3-5 distinct tasks
- Multiple files or systems involved
- Significant work could be lost if context drifts

If none of these → use lightweight mode (TodoWrite only)
