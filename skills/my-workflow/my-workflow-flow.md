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
│     │               ├── Architecture ──► STOP + ASK user                    │
│     │               └── Enhancement ──► Log + continue                      │
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
│ Trigger                 │ Action                                            │
├─────────────────────────┼───────────────────────────────────────────────────┤
│ Bug/Blocker found       │ Auto-fix immediately                              │
│ Security gap            │ Auto-add critical fix                             │
│ Architecture change     │ STOP + ASK user for decision                      │
│ Enhancement idea        │ Log to STATE.md, continue                         │
└─────────────────────────┴───────────────────────────────────────────────────┘
```
