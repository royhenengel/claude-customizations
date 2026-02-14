# Workflow Scenario Maps

Visual maps of every decision point and path through each workflow command.

## /start - Entry Point and Routing Hub

**Role**: /start serves three jobs:

1. **Initialize** - Set up planning structure for new projects
2. **Orient** - Show current state (what's in flight, what's available)
3. **Route** - Direct to the right next action (/plan, /fix, /build, or switch worktree)

/start never does implementation work. It reads state and routes to the appropriate workflow.

![/start Scenario Map](diagrams/start-scenario-map.png)

### Scenarios

| Entry State | Path | Outcome |
|---|---|---|
| No planning/ directory | New project setup | Structure created, OVERVIEW.md guided, first feature offered |
| Worktree + feature PROGRESS.md | Resume | Shows status, suggests /build |
| Worktree + no PROGRESS.md | New feature | Suggests /plan |
| Main branch | Dashboard | Shows features in flight + backlog, offers Plan/Fix/Switch |

### Main Branch Options

| Option | Action | Result |
|---|---|---|
| 1. Plan a feature | Derive name, create worktree, open VS Code | User runs /plan in new window |
| 2. Fix an issue | Assess complexity | Substantial: fix worktree + /fix. Quick: /fix on main |
| 3. Switch to worktree | List active worktrees with stage + progress | Opens selected worktree in VS Code |

### New Project Lifecycle

```
/start → Create structure → Brownfield detection → OVERVIEW.md → First feature?
  → Describe feature → Create worktree → /plan
  → Explore on own → End
  → Fix first → Assess → worktree or /fix on main
```

### Mermaid Source

```mermaid
flowchart TD
    START["/start invoked"] --> SCAN["Scan project"]
    SCAN --> EXISTS{"planning/ exists?"}

    EXISTS -->|"No"| NEW["New Project Setup"]
    EXISTS -->|"Yes"| ENV{"Environment?"}

    ENV -->|"Worktree"| WT_BRANCH["Get branch name"]
    ENV -->|"Main"| MAIN_READ["Read Feature Registry\nDiscover worktrees"]

    WT_BRANCH --> WT_STATE{"Feature PROGRESS.md?"}
    WT_STATE -->|"Exists"| WT_RESUME["Show status, suggest /build"]
    WT_STATE -->|"Missing"| WT_NEW["Suggest /plan"]

    MAIN_READ --> MAIN_DASH["Show Dashboard"]
    MAIN_DASH --> MAIN_CHOICE{"What to do?"}

    MAIN_CHOICE -->|"1. Plan"| PLAN_WT["Create worktree → /plan"]
    MAIN_CHOICE -->|"2. Fix"| FIX_ASSESS{"Complexity?"}
    MAIN_CHOICE -->|"3. Switch"| SWITCH["List worktrees → Open"]

    FIX_ASSESS -->|"Substantial"| FIX_WT["Fix worktree → /fix"]
    FIX_ASSESS -->|"Quick"| FIX_MAIN["/fix on main"]

    NEW --> DIRS["Create structure + hooks"]
    DIRS --> BROWN{"Brownfield?"}
    BROWN -->|"Yes"| CODEBASE["/map-codebase"]
    BROWN -->|"No"| SKIP["Skip"]
    CODEBASE --> OVERVIEW["OVERVIEW.md"]
    SKIP --> OVERVIEW
    OVERVIEW --> FIRST{"First feature?"}
    FIRST -->|"Describe"| FIRST_WT["Worktree → /plan"]
    FIRST -->|"Explore"| END["End"]
    FIRST -->|"Fix"| FIRST_FIX["Assess → worktree or main"]
```

---

## /plan - Specification and Planning

**Role**: Create complete feature specification and executable plan. Worktree-only workflow (redirects to worktree creation if on main).

![/plan Scenario Map](diagrams/plan-scenario-map.png)

### Scenarios

| Entry State | Path | Outcome |
|---|---|---|
| No planning/ | Error | Suggest /start |
| Main branch | Redirect | Create worktree, instruct /plan in new window, STOP |
| Worktree + already planned | Skip | Suggest /build |
| Worktree + new feature | Plan | Full planning flow |

### Planning Flow

```
Backlog → Selection → Clarify (if needed) → Create directory
  → CLAUDE.md → SPEC.md → Validate → RESEARCH.md → PLAN.md
  → Feature PROGRESS.md → Update registry → Ready for /build
```

### Selection Types

| Type | Flow |
|---|---|
| Explore idea | 4 questions (purpose, scope, constraints, success) → 2-3 approaches |
| From backlog | Use item, remove from backlog |
| Something specific | Use description directly |
| Continue from spec | Load existing spec |

### Mermaid Source

```mermaid
flowchart TD
    START["/plan invoked"] --> PREREQ{"planning/ exists?"}
    PREREQ -->|"No"| SUGGEST_START["Suggest /start"]
    PREREQ -->|"Yes"| ENV{"Environment?"}

    ENV -->|"Main"| REDIRECT["Create worktree → STOP"]
    ENV -->|"Worktree"| CHECK{"Already planned?"}

    CHECK -->|"Yes"| BUILD["Suggest /build"]
    CHECK -->|"No"| SELECT["Show backlog, ask what to plan"]

    SELECT --> TYPE{"Selection"}
    TYPE -->|"Explore"| CLARIFY["4 questions → approaches"]
    TYPE -->|"Backlog"| USE_BL["Use item"]
    TYPE -->|"Specific"| USE_DESC["Use description"]
    TYPE -->|"Continue"| USE_SPEC["Load spec"]

    CLARIFY --> CREATE["Create feature directory"]
    USE_BL --> CREATE
    USE_DESC --> CREATE
    USE_SPEC --> CREATE

    CREATE --> DOCS["CLAUDE.md → SPEC.md → RESEARCH.md → PLAN.md"]
    DOCS --> STATE["Feature PROGRESS.md + registry"]
    STATE --> DONE["Ready for /build"]
```

---

## /build - Plan Execution

**Role**: Execute the plan with subagent delegation, deviation rules, and quality gates. Handles both fresh starts and resume from interrupted sessions.

![/build Scenario Map](diagrams/build-scenario-map.png)

### Scenarios

| Entry State | Path | Outcome |
|---|---|---|
| No PLAN.md | Error | Suggest /plan |
| Worktree | Auto-detect | Feature from branch name |
| Main + multiple features | Select | Show registry, user picks |
| Stage=building + tasks checked | Resume | Preserve progress, continue |
| Stage=planning or ready | Fresh | Create task list, set building |

### Deviation Rules

| Rule | Trigger | Action | Blocks? |
|---|---|---|---|
| 1. Bug | Wrong output, failed test | Auto-fix, note in PROGRESS.md | No |
| 2. Critical | Security/correctness gap | Auto-add, note in PROGRESS.md | No |
| 3. Blocker | Missing dep, bad import | Auto-fix, note in PROGRESS.md | No |
| 4. Architectural | Technology/scope/structure change | STOP, ask user | Yes |
| 5. Enhancement | Nice-to-have idea | Log to BACKLOG.md | No |
| 6. Gap | Plan ordering issue | Gap Protocol | Depends |

### Completion Flow

```
All tasks complete → Verify + Security check
  → Quality Review (3 agents: Code + Security + Architecture)
  → Doc-enforcer audit
  → Create SUMMARY.md
  → Update state → complete
  → Commit, push, create PR
  → PR Review (3 agents: Code + Tests + Contracts)
  → Merge PR, cleanup worktree
```

### Mermaid Source

```mermaid
flowchart TD
    START["/build invoked"] --> PREREQ{"PLAN.md exists?"}
    PREREQ -->|"No"| PLAN["Suggest /plan"]
    PREREQ -->|"Yes"| ENV{"Environment?"}

    ENV -->|"Worktree"| AUTO["Auto-detect from branch"]
    ENV -->|"Main"| REGISTRY["Show registry, select"]

    AUTO --> LOAD["Read PROGRESS.md + PLAN.md"]
    REGISTRY --> LOAD

    LOAD --> RESUME{"Resume?"}
    RESUME -->|"Yes"| PRESERVE["Preserve progress"]
    RESUME -->|"No"| FRESH["Fresh start"]

    PRESERVE --> EXEC["Execute tasks"]
    FRESH --> EXEC

    EXEC --> TASK["Select agent → Launch → Deviation rules"]
    TASK --> UPDATE["Update PROGRESS.md"]
    UPDATE --> MORE{"More?"}
    MORE -->|"Yes"| TASK
    MORE -->|"No"| VERIFY["Verify + Review + Summary"]
    VERIFY --> PR["PR → Review → Merge"]
```

---

## /fix - Issue Resolution

**Role**: Thorough fix workflow with git history, root cause analysis, and regression prevention. Three distinct scenarios based on context.

![/fix Scenario Map](diagrams/fix-scenario-map.png)

### Scenarios

| Entry State | Scenario | State Tracking | Steps | Completion |
|---|---|---|---|---|
| Fix worktree (Type: fix or no PROGRESS.md) | A | Full fix PROGRESS.md | 1-10 | Branch + PR + merge + cleanup |
| Feature worktree (Type: feature), related | B (related) | Feature Notes section | 2-8 only | Part of feature /build |
| Feature worktree, unrelated | B (unrelated) | None | N/A | BACKLOG or new worktree |
| Main branch | Main | None | 1-10 | Branch + PR + merge |

### Investigation Flow (All Scenarios)

```
Git history → Conventions → Map affected areas → Root cause analysis
  → Propose fix (STOP for approval)
  → Implement → Regression checklist → Convention check
```

### Completion Flow (Scenario A + Main)

```
Step 9a: Doc-enforcer + PR Review (3 agents)
Step 10: Create branch → Commit → Push → PR → Review → Merge
  Worktree: + Remove worktree + Update STATE → complete
```

### In-Feature Fix (Scenario B-related)

```
Steps 2-8 only → Track in feature PROGRESS.md Notes
Skip Steps 9a + 10 → Fix committed with feature /build
```

### Mermaid Source

```mermaid
flowchart TD
    START["/fix invoked"] --> ISSUE{"Issue detailed?"}
    ISSUE -->|"Yes"| SUMMARIZE["Summarize"]
    ISSUE -->|"No"| GATHER["Gather details"]

    SUMMARIZE --> DETECT["Worktree Detection"]
    GATHER --> DETECT

    DETECT --> ENV{"Environment?"}
    ENV -->|"Main"| MAIN["Full 10-step, branch in Step 10"]
    ENV -->|"Worktree"| STATE{"PROGRESS.md type?"}

    STATE -->|"fix / none"| A["Scenario A: Fix worktree"]
    STATE -->|"feature"| B["Scenario B: Feature worktree"]

    B --> REL{"Related?"}
    REL -->|"Yes"| INFEAT["Steps 2-8, feature Notes"]
    REL -->|"No"| UNREL["BACKLOG or new worktree"]

    MAIN --> INVEST["Steps 2-5: Investigate"]
    A --> INVEST
    INFEAT --> INVEST

    INVEST --> PROPOSE["Step 6: Propose fix"]
    PROPOSE --> IMPL["Steps 7-9: Implement"]

    IMPL --> WHICH{"Scenario?"}
    WHICH -->|"A or Main"| QUALITY["9a + 10: Review + PR"]
    WHICH -->|"B"| SKIP["Skip, part of /build"]
```
