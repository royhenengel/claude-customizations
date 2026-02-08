# My Workflow System Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MY WORKFLOW SYSTEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /start ─────────────────────────────────────────────────────────────────►  │
│     │                                                                       │
│     ├── Current State in STATE.md? ──► Resume previous session              │
│     │                                                                       │
│     └── New project? ──► Define OVERVIEW.md, CLAUDE.md, STATE.md            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  /plan ─────────────────────────────────────────────────────────────────►   │
│     │                                                                       │
│     ├── "Explore a new idea" ──► Inline clarification                       │
│     │      └── Purpose → Scope → Constraints → Success → Approaches         │
│     │                                                                       │
│     ├── "Pick from backlog" / "Add specific" ──► Gather requirements        │
│     │                                                                       │
│     └── All resolved? ──► SPEC.md + RESEARCH.md + PLAN.md                                         │
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
│     ├── Deviation? ──► Bug (code) ──► Auto-fix immediately                  │
│     │               ├── Blocker (env) ──► Auto-fix immediately              │
│     │               ├── Security gap ──► Auto-add critical fix              │
│     │               ├── Architecture ──► STOP + ASK user                    │
│     │               ├── Enhancement ──► Log to BACKLOG.md                   │
│     │               └── Gap detected ──► Gap Protocol (see below)           │
│     │                                                                       │
│     ├── More tasks? ──► Context > 15% ──► Continue                          │
│     │               ├── Context < 15% ──► Mention context filling           │
│     │               └── Context < 10% ──► Complete task, end session        │
│     │                                                                       │
│     └── Complete ──► SUMMARY.md                                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Session ends naturally (Current State maintained in STATE.md)              │
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
│ STATE.md     │ WHERE are we now? (stage, progress, current state)           │
│ SUMMARY.md   │ WHAT happened? (outcomes, deviations)                        │
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
