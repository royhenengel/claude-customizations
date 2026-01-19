# My Workflow System Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MY WORKFLOW SYSTEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /start ─────────────────────────────────────────────────────────────────►  │
│     │                                                                       │
│     ├── HANDOFF.md exists? ──► Resume previous session                      │
│     │                                                                       │
│     └── New project? ────────► Brainstorm first ──► /brainstorm             │
│                        │                                                    │
│                        └─────► Define directly ──► OVERVIEW.md              │
│                                                    CLAUDE.md                │
│                                                    STATE.md                 │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /brainstorm (standalone) ──────────────────────────────────────────────►   │
│     │                                                                       │
│     ├── One question at a time                                              │
│     ├── Propose 2-3 approaches                                              │
│     └── Creates: SPEC.md + RESEARCH.md                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /plan ─────────────────────────────────────────────────────────────────►   │
│     │                                                                       │
│     ├── Requirements clear? ──► No ──► Offer /brainstorm                    │
│     │                                                                       │
│     └── Yes ──► Gather requirements                                         │
│                    │                                                        │
│                    └── SPEC.md with [NEEDS CLARIFICATION]                   │
│                           │                                                 │
│                           └── All resolved? ──► RESEARCH.md                 │
│                                                 PLAN.md                     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /build ────────────────────────────────────────────────────────────────►   │
│     │                                                                       │
│     ├── Load PLAN.md as prompt                                              │
│     │                                                                       │
│     ├── Execute task via subagent (fresh 200k context)                      │
│     │      │                                                                │
│     │      └── Task Types: auto | checkpoint:human-verify                   │
│     │                      checkpoint:decision | checkpoint:human-action    │
│     │                                                                       │
│     ├── Deviation? ──► Bug/Blocker ──► Auto-fix immediately                 │
│     │               ├── Security gap ──► Auto-add critical fix              │
│     │               ├── Architecture ──► STOP + ASK user                    │
│     │               ├── Enhancement ──► Log to BACKLOG.md                   │
│     │               └── Gap detected ──► Gap Protocol (see below)           │
│     │                                                                       │
│     ├── More tasks? ──► Context > 15% ──► Continue                          │
│     │               ├── Context < 15% ──► Offer /stop                       │
│     │               └── Context < 10% ──► Auto /stop                        │
│     │                                                                       │
│     └── Complete ──► SUMMARY.md                                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /stop ─────────────────────────────────────────────────────────────────►   │
│     │                                                                       │
│     ├── Park full context                                                   │
│     └── Creates: HANDOFF.md ──► Next session loops to /start                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                        DOCUMENT OWNERSHIP TABLE                             │
├──────────────┬──────────────────────────────────────────────────────────────┤
│ Document     │ Answers                                                      │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ OVERVIEW.md  │ WHY are we building this? WHO is it for?                     │
│ SPEC.md      │ WHAT are we building? (requirements)                         │
│ RESEARCH.md  │ HOW did we decide? (alternatives, decisions)                 │
│ PLAN.md      │ HOW do we execute? (tasks, verification)                     │
│ STATE.md     │ WHERE are we now? (stage, progress)                          │
│ SUMMARY.md   │ WHAT happened? (outcomes, deviations)                        │
│ HANDOFF.md   │ WHAT to continue? (context for next session)                 │
└──────────────┴──────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              TASK TYPES                                     │
├─────────────────────────┬───────────────────────────────────────────────────┤
│ Type                    │ Description                                       │
├─────────────────────────┼───────────────────────────────────────────────────┤
│ auto                    │ Claude executes autonomously                      │
│ checkpoint:human-verify │ Human reviews/approves output                     │
│ checkpoint:decision     │ Human chooses from options (pros/cons table)      │
│ checkpoint:human-action │ Human performs action (always blocking)           │
└─────────────────────────┴───────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEVIATION RULES                                   │
├─────────────────────────┬───────────────────────────────────────────────────┤
│ Rule                    │ Trigger → Action                                  │
├─────────────────────────┼───────────────────────────────────────────────────┤
│ 1. Auto-fix bugs        │ Broken behavior → Fix immediately, note STATE.md  │
│ 2. Auto-add critical    │ Security/correctness gap → Add immediately        │
│ 3. Auto-fix blockers    │ Can't proceed → Fix immediately                   │
│ 4. Ask architectural    │ Major structural change → STOP + ASK user         │
│ 5. Log enhancements     │ Nice-to-have idea → Append to BACKLOG.md          │
│ 6. Gap Protocol         │ Prerequisite missing → See Gap Protocol below     │
└─────────────────────────┴───────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                           GAP PROTOCOL (Rule 6)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  When a plan-modifying gap is detected:                                     │
│                                                                             │
│  1. PRESERVE ──► Push current task context to Gap Stack in STATE.md         │
│  2. SCOPE ────► Assess impact: new task? different feature?                 │
│  3. MODIFY ───► Update PLAN.md if needed (mark "Added via Gap Protocol")    │
│  4. EXECUTE ──► Complete the gap task                                       │
│  5. RETURN ───► Pop stack, show reminder, resume original task              │
│                                                                             │
│  For user additions ("also add X"): Show impact assessment first            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
