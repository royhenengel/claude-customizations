---
description: Create or detail a stage plan
---

# Create Stage Plan

Generate a detailed plan for execution.

## Essential Principles

### Solo Developer + Claude

You are planning for ONE person (the user) and ONE implementer (Claude).
No teams. No stakeholders. No ceremonies. No coordination overhead.
The user is the visionary/product owner. Claude is the builder.

### Plans Are Prompts

PLAN.md is not a document that gets transformed into a prompt.
PLAN.md IS the prompt. It contains:
- Objective (what and why)
- Context (@file references)
- Tasks (type, files, action, verify, done, checkpoints)
- Verification (overall checks)
- Success criteria (measurable)
- Output (SUMMARY.md specification)

When planning a stage, you are writing the prompt that will execute it.

### Scope Control

Plans must complete within ~50% of context usage to maintain consistent quality.

**The quality degradation curve:**
- 0-30% context: Peak quality (comprehensive, thorough, no anxiety)
- 30-50% context: Good quality (engaged, manageable pressure)
- 50-70% context: Degrading quality (efficiency mode, compression)
- 70%+ context: Poor quality (self-lobotomization, rushed work)

**Critical insight:** Claude doesn't degrade at 80% - it degrades at ~40-50% when it sees context mounting and enters "completion mode." By 80%, quality has already crashed.

**Solution:** Aggressive atomicity - split stages into many small, focused plans.

Examples:
- `01-01-PLAN.md` - Stage 1, Plan 1 (2-3 tasks: database schema only)
- `01-02-PLAN.md` - Stage 1, Plan 2 (2-3 tasks: database client setup)
- `01-03-PLAN.md` - Stage 1, Plan 3 (2-3 tasks: API routes)
- `01-04-PLAN.md` - Stage 1, Plan 4 (2-3 tasks: UI components)

Each plan is independently executable, verifiable, and scoped to **2-3 tasks maximum**.

**Atomic task principle:** Better to have 10 small, high-quality plans than 3 large, degraded plans. Each commit should be surgical, focused, and maintainable.

**Autonomous execution:** Plans without checkpoints execute via subagent with fresh context - impossible to degrade.

### Human Checkpoints

**Claude automates everything that has a CLI or API.** Checkpoints are for verification and decisions, not manual work.

**Checkpoint types:**
- `checkpoint:human-verify` - Human confirms Claude's automated work (visual checks, UI verification)
- `checkpoint:decision` - Human makes implementation choice (auth provider, architecture)

**Rarely needed:** `checkpoint:human-action` - Only for actions with no CLI/API (email verification links, account approvals requiring web login with 2FA)

**Critical rule:** If Claude CAN do it via CLI/API/tool, Claude MUST do it. Never ask human to:
- Deploy to Vercel/Railway/Fly (use CLI)
- Create Stripe webhooks (use CLI/API)
- Run builds/tests (use Bash)
- Write .env files (use Write tool)
- Create database resources (use provider CLI)

**Protocol:** Claude automates work → reaches checkpoint:human-verify → presents what was done → waits for confirmation → resumes

### Deviation Rules

Plans are guides, not straitjackets. Real development always involves discoveries.

**During execution, deviations are handled automatically via 5 embedded rules:**

1. **Auto-fix bugs** - Broken behavior → fix immediately, document in Summary
2. **Auto-add missing critical** - Security/correctness gaps → add immediately, document
3. **Auto-fix blockers** - Can't proceed → fix immediately, document
4. **Ask about architectural** - Major structural changes → stop and ask user
5. **Log enhancements** - Nice-to-haves → auto-log to ISSUES.md, continue

**No user intervention needed for Rules 1-3, 5.** Only Rule 4 (architectural) requires user decision.

**All deviations documented in Summary** with: what was found, what rule applied, what was done, commit hash.

**Result:** Flow never breaks. Bugs get fixed. Scope stays controlled. Complete transparency.

### Ship Fast Iterate Fast

No enterprise process. No approval gates. No multi-week timelines.
Plan → Execute → Ship → Learn → Repeat.

**Milestone-driven:** Ship v1.0 → mark milestone → plan v1.1 → ship → repeat.
Milestones mark shipped versions and enable continuous iteration.

### Milestone Boundaries

Milestones mark shipped versions (v1.0, v1.1, v2.0).

**Purpose:**
- Historical record in MILESTONES.md (what shipped when)
- Greenfield → Brownfield transition marker
- Git tags for releases
- Clear completion rituals

**Default approach:** Extend existing roadmap with new stages.
- v1.0 ships (stages 1-4) → add stages 5-6 for v1.1
- Continuous stage numbering (01-99)
- Milestone groupings keep roadmap organized

**Archive ONLY for:** Separate codebases or complete rewrites (rare).

### Anti-Enterprise Patterns

NEVER include in plans:
- Team structures, roles, RACI matrices
- Stakeholder management, alignment meetings
- Sprint ceremonies, standups, retros
- Multi-week estimates, resource allocation
- Change management, governance processes
- Documentation for documentation's sake

If it sounds like corporate PM theater, delete it.

### Context Awareness

Monitor token usage via system warnings.

**At 25% remaining**: Mention context getting full
**At 15% remaining**: Pause, offer handoff
**At 10% remaining**: Auto-create handoff, stop

Never start large operations below 15% without user confirmation.

### User Gates

Never charge ahead at critical decision points. Use gates:
- **AskUserQuestion**: Structured choices (2-4 options)
- **Inline questions**: Simple confirmations
- **Decision gate loop**: "Ready, or ask more questions?"

Mandatory gates:
- Before writing PLAN.md (confirm breakdown)
- After low-confidence research
- On verification failures
- After stage completion with issues
- Before starting next stage with previous issues

### Git Versioning

All planning artifacts are version controlled. Commit outcomes, not process.

- Check for repo on invocation, offer to initialize
- Commit only at: initialization, stage completion, handoff
- Intermediate artifacts (PLAN.md, RESEARCH.md, FINDINGS.md) NOT committed separately
- Git log becomes project history

## Context Scan

**Run on every invocation** to understand current state:

```bash
# Check git status
git rev-parse --git-dir 2>/dev/null || echo "NO_GIT_REPO"

# Check for planning structure
ls -la .planning/ 2>/dev/null
ls -la .planning/stages/ 2>/dev/null

# Find any continue-here files
find . -name ".continue-here.md" -type f 2>/dev/null

# Check for existing artifacts
[ -f .planning/OVERVIEW.md ] && echo "OVERVIEW: exists"
[ -f .planning/ROADMAP.md ] && echo "ROADMAP: exists"
```

**If NO_GIT_REPO detected:**
Inline question: "No git repo found. Initialize one? (Recommended for version control)"
If yes: `git init`

**Present findings before intake question.**

## Domain Expertise

**Domain expertise lives in `~/.claude/skills/expertise/`**

Before creating roadmap or stage plans, determine if domain expertise should be loaded.

### Scan Domains

```bash
ls ~/.claude/skills/expertise/ 2>/dev/null
```

This reveals available domain expertise (e.g., macos-apps, iphone-apps, unity-games, nextjs-ecommerce).

**If no domain skills found:** Proceed without domain expertise (graceful degradation). The command works fine without domain-specific context.

### Inference Rules

If user's request contains domain keywords, INFER the domain:

| Keywords | Domain Skill |
|----------|--------------|
| "macOS", "Mac app", "menu bar", "AppKit", "SwiftUI desktop" | expertise/macos-apps |
| "iPhone", "iOS", "iPad", "mobile app", "SwiftUI mobile" | expertise/iphone-apps |
| "Unity", "game", "C#", "3D game", "2D game" | expertise/unity-games |
| "MIDI", "MIDI tool", "sequencer", "MIDI controller", "music app", "MIDI 2.0", "MPE", "SysEx" | expertise/midi |
| "Agent SDK", "Claude SDK", "agentic app" | expertise/with-agent-sdk |
| "Python automation", "workflow", "API integration", "webhooks", "Celery", "Airflow", "Prefect" | expertise/python-workflow-automation |
| "UI", "design", "frontend", "interface", "responsive", "visual design", "landing page", "website design", "Tailwind", "CSS", "web design" | expertise/ui-design |

If domain inferred, confirm:
```
Detected: [domain] project → expertise/[skill-name]
Load this expertise for planning? (Y / see other options / none)
```

### No Inference

If no domain obvious from request, present options:

```
What type of project is this?

Available domain expertise:
1. macos-apps - Native macOS with Swift/SwiftUI
2. iphone-apps - Native iOS with Swift/SwiftUI
3. unity-games - Unity game development
4. swift-midi-apps - MIDI/audio apps
5. with-agent-sdk - Claude Agent SDK apps
6. ui-design - Stunning UI/UX design & frontend development
[... any others found in expertise/]

N. None - proceed without domain expertise
C. Create domain skill first

Select:
```

### Load Domain

When domain selected, use intelligent loading:

**Step 1: Read domain SKILL.md**
```bash
cat ~/.claude/skills/expertise/[domain]/SKILL.md 2>/dev/null
```

This loads core principles and routing guidance (~5k tokens).

**Step 2: Determine what references are needed**

Domain SKILL.md should contain a `<references_index>` section that maps planning contexts to specific references.

**Step 3: Load only relevant references**

Based on the stage being planned (from ROADMAP), load ONLY the references mentioned for that type of work.

**Context efficiency:**
- SKILL.md only: ~5k tokens
- SKILL.md + selective references: ~8-12k tokens
- All references (old approach): ~20-27k tokens

Announce: "Loaded [domain] expertise ([X] references for [stage-type])."

**If domain skill not found:** Inform user and offer to proceed without domain expertise.

**If SKILL.md doesn't have references_index:** Fall back to loading all references with warning about context usage.

### When to Load

Domain expertise should be loaded BEFORE:
- Creating roadmap (stages should be domain-appropriate)
- Planning stages (tasks must be domain-specific)

Domain expertise is NOT needed for:
- Creating overview (vision is domain-agnostic)
- Resuming from handoff (context already established)
- Transition between stages (just updating status)

## Intake

Based on scan results, present context-aware options:

**If handoff found:**
```
Found handoff: .planning/stages/XX/.continue-here.md
[Summary of state from handoff]

1. Resume from handoff
2. Discard handoff, start fresh
3. Different action
```

**If planning structure exists:**
```
Project: [from OVERVIEW or directory]
Overview: [exists/missing]
Roadmap: [X stages defined]
Current: [stage status]

What would you like to do?
1. Plan next stage
2. Execute current stage
3. Create handoff (stopping for now)
4. View/update roadmap
5. Something else
```

**If no planning structure:**
```
No planning structure found.

What would you like to do?
1. Start new project (create overview)
2. Create roadmap from existing overview
3. Jump straight to stage planning
4. Get guidance on approach
```

**Wait for response before proceeding.**

## Routing

| Response | Action |
|----------|--------|
| "overview", "new project", "start", 1 (no structure) | Run `/init` |
| "roadmap", "stages", 2 (no structure) | Create Roadmap (below) |
| "stage", "plan stage", "next stage", 1 (has structure) | Plan Stage (below) |
| "execute", "run", "do it", "build it", 2 (has structure) | Run `/execute` |
| "handoff", "pack up", "stopping", 3 (has structure) | Create handoff |
| "resume", "continue", 1 (has handoff) | Resume from handoff |

## Hierarchy

The planning hierarchy (each level builds on previous):

```
OVERVIEW.md       → Human vision (you read this)
    ↓
ROADMAP.md        → Stage structure (overview)
    ↓
RESEARCH.md       → Research prompt (optional, for unknowns)
    ↓
FINDINGS.md       → Research output (if research done)
    ↓
PLAN.md           → THE PROMPT (Claude executes this)
    ↓
SUMMARY.md        → Outcome (existence = stage complete)
```

**Rules:**
- Roadmap requires Overview (or prompts to create one)
- Stage plan requires Roadmap (knows stage scope)
- PLAN.md IS the execution prompt
- SUMMARY.md existence marks stage complete
- Each level can look UP for context

## Output Structure

All planning artifacts go in `.planning/`:

```
.planning/
├── OVERVIEW.md                 # Human vision
├── ROADMAP.md                  # Stage structure + tracking
└── stages/
    ├── 01-foundation/
    │   ├── 01-01-PLAN.md       # Plan 1: Database setup
    │   ├── 01-01-SUMMARY.md    # Outcome (exists = done)
    │   ├── 01-02-PLAN.md       # Plan 2: API routes
    │   ├── 01-02-SUMMARY.md
    │   ├── 01-03-PLAN.md       # Plan 3: UI components
    │   └── .continue-here-01-03.md  # Handoff (temporary, if needed)
    └── 02-auth/
        ├── 02-01-RESEARCH.md   # Research prompt (if needed)
        ├── 02-01-FINDINGS.md   # Research output
        ├── 02-02-PLAN.md       # Implementation prompt
        └── 02-02-SUMMARY.md
```

**Naming convention:**
- Plans: `{stage}-{plan}-PLAN.md` (e.g., 01-03-PLAN.md)
- Summaries: `{stage}-{plan}-SUMMARY.md` (e.g., 01-03-SUMMARY.md)
- Stage folders: `{stage}-{name}/` (e.g., 01-foundation/)

Files sort chronologically. Related artifacts (plan + summary) are adjacent.

---

## Workflow: Create Roadmap

### Check Overview

```bash
cat .planning/OVERVIEW.md 2>/dev/null || echo "No overview found"
```

**If no overview exists:**
Ask: "No overview found. Want to create one first, or proceed with roadmap?"

If proceeding without overview, gather quick context:
- What are we building?
- What's the rough scope?

### Identify Stages

Based on the overview/context, identify 3-6 stages.

Good stages are:
- **Coherent**: Each delivers something complete
- **Sequential**: Later stages build on earlier
- **Sized right**: 1-3 days of work each (for solo + Claude)

Common stage patterns:
- Foundation → Core Feature → Enhancement → Polish
- Setup → MVP → Iteration → Launch
- Infrastructure → Backend → Frontend → Integration

### Confirm Stages

Present the stage breakdown inline:

"Here's how I'd break this down:

1. [Stage name] - [goal]
2. [Stage name] - [goal]
3. [Stage name] - [goal]
...

Does this feel right? (yes / adjust)"

If "adjust": Ask what to change, revise, present again.

### Decision Gate

After stages confirmed, use AskUserQuestion:
- header: "Ready"
- question: "Ready to create the roadmap, or would you like me to ask more questions?"
- options:
  - "Create roadmap" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create roadmap" selected.

### Create Structure

```bash
mkdir -p .planning/stages
```

### Write ROADMAP.md

#### Initial Roadmap (v1.0 Greenfield)

```markdown
# Roadmap: [Project Name]

## Overview

[One paragraph describing the journey from start to finish]

## Stages

- [ ] **Stage 1: [Name]** - [One-line description]
- [ ] **Stage 2: [Name]** - [One-line description]
- [ ] **Stage 3: [Name]** - [One-line description]
- [ ] **Stage 4: [Name]** - [One-line description]

## Stage Details

### Stage 1: [Name]
**Goal**: [What this stage delivers]
**Depends on**: Nothing (first stage)
**Plans**: [Number of plans, e.g., "3 plans" or "TBD after research"]

Plans:
- [ ] 01-01: [Brief description of first plan]
- [ ] 01-02: [Brief description of second plan]
- [ ] 01-03: [Brief description of third plan]

### Stage 2: [Name]
**Goal**: [What this stage delivers]
**Depends on**: Stage 1
**Plans**: [Number of plans]

Plans:
- [ ] 02-01: [Brief description]

### Stage 3: [Name]
**Goal**: [What this stage delivers]
**Depends on**: Stage 2
**Plans**: [Number of plans]

Plans:
- [ ] 03-01: [Brief description]
- [ ] 03-02: [Brief description]

### Stage 4: [Name]
**Goal**: [What this stage delivers]
**Depends on**: Stage 3
**Plans**: [Number of plans]

Plans:
- [ ] 04-01: [Brief description]

## Progress

| Stage | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. [Name] | 0/3 | Not started | - |
| 2. [Name] | 0/1 | Not started | - |
| 3. [Name] | 0/2 | Not started | - |
| 4. [Name] | 0/1 | Not started | - |
```

#### Milestone-Grouped Roadmap (After v1.0 Ships)

After completing first milestone, reorganize roadmap with milestone groupings:

```markdown
# Roadmap: [Project Name]

## Milestones

- ✅ **v1.0 MVP** - Stages 1-4 (shipped YYYY-MM-DD)
- 🚧 **v1.1 [Name]** - Stages 5-6 (in progress)
- 📋 **v2.0 [Name]** - Stages 7-10 (planned)

## Stages

<details>
<summary>✅ v1.0 MVP (Stages 1-4) - SHIPPED YYYY-MM-DD</summary>

### Stage 1: [Name]
**Goal**: [What this stage delivers]
**Plans**: 3 plans

Plans:
- [x] 01-01: [Brief description]
- [x] 01-02: [Brief description]
- [x] 01-03: [Brief description]

[... more completed stages ...]

</details>

### 🚧 v1.1 [Name] (In Progress)

**Milestone Goal:** [What v1.1 delivers]

#### Stage 5: [Name]
**Goal**: [What this stage delivers]
**Depends on**: Stage 4
**Plans**: 1 plan

Plans:
- [ ] 05-01: [Brief description]

[... more stages ...]

## Progress

| Stage | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | YYYY-MM-DD |
| 2. Features | v1.0 | 2/2 | Complete | YYYY-MM-DD |
| 5. Security | v1.1 | 0/1 | Not started | - |
```

**Notes:**
- Milestone emoji: ✅ shipped, 🚧 in progress, 📋 planned
- Completed milestones collapsed in `<details>` for readability
- Current/future milestones expanded
- Continuous stage numbering (01-99)

### Create Stage Directories

```bash
mkdir -p .planning/stages/01-{stage-name}
mkdir -p .planning/stages/02-{stage-name}
# etc.
```

### Git Commit Initialization

Commit project initialization (overview + roadmap together):

```bash
git add .planning/
git commit -m "$(cat <<'EOF'
docs: initialize [project-name] ([N] stages)

[One-liner from OVERVIEW.md]

Stages:
1. [stage-name]: [goal]
2. [stage-name]: [goal]
3. [stage-name]: [goal]
EOF
)"
```

Confirm: "Committed: docs: initialize [project] ([N] stages)"

### Offer Next

```
Project initialized:
- Overview: .planning/OVERVIEW.md
- Roadmap: .planning/ROADMAP.md
- Committed as: docs: initialize [project] ([N] stages)

What's next?
1. Plan Stage 1 in detail
2. Review/adjust stages
3. Done for now
```

### Stage Naming

Use `XX-kebab-case-name` format:
- `01-foundation`
- `02-authentication`
- `03-core-features`
- `04-polish`

Numbers ensure ordering. Names describe content.

### Anti-Patterns

- Don't add time estimates
- Don't create Gantt charts
- Don't add resource allocation
- Don't include risk matrices
- Don't plan more than 6 stages (scope creep)

Stages are buckets of work, not project management artifacts.

### Success Criteria

Roadmap is complete when:
- [ ] `.planning/ROADMAP.md` exists
- [ ] 3-6 stages defined with clear names
- [ ] Stage directories created
- [ ] Dependencies noted if any
- [ ] Status tracking in place

---

## Workflow: Plan Stage

### Identify Stage

Check roadmap for stages:
```bash
cat .planning/ROADMAP.md
ls .planning/stages/
```

If multiple stages available, ask which one to plan.
If obvious (first incomplete stage), proceed.

Read any existing PLAN.md or FINDINGS.md in the stage directory.

### Check Research Needed

For this stage, assess:
- Are there technology choices to make?
- Are there unknowns about the approach?
- Do we need to investigate APIs or libraries?

If yes: Create RESEARCH.md, gather findings, then return here.
If no: Proceed with planning.

### Gather Stage Context

For this specific stage, understand:
- What's the stage goal? (from roadmap)
- What exists already? (scan codebase if mid-project)
- What dependencies are met? (previous stages complete?)
- Any research findings? (FINDINGS.md)

```bash
# If mid-project, understand current state
ls -la src/ 2>/dev/null
cat package.json 2>/dev/null | head -20
```

### Break Into Tasks

Decompose the stage into tasks.

Each task must have:
- **Type**: auto, checkpoint:human-verify, checkpoint:decision (human-action rarely needed)
- **Task name**: Clear, action-oriented
- **Files**: Which files created/modified (for auto tasks)
- **Action**: Specific implementation (including what to avoid and WHY)
- **Verify**: How to prove it worked
- **Done**: Acceptance criteria

**Identify checkpoints:**
- Claude automated work needing visual/functional verification? → checkpoint:human-verify
- Implementation choices to make? → checkpoint:decision
- Truly unavoidable manual action (email link, 2FA)? → checkpoint:human-action (rare)

**Critical:** If external resource has CLI/API (Vercel, Stripe, Upstash, GitHub, etc.), use type="auto" to automate it. Only checkpoint for verification AFTER automation.

### Estimate Scope

After breaking into tasks, assess scope against the **quality degradation curve**.

**ALWAYS split if:**
- >3 tasks total
- Multiple subsystems (DB + API + UI = separate plans)
- >5 files modified in any single task
- Complex domains (auth, payments, data modeling)

**Aggressive atomicity principle:** Better to have 10 small, high-quality plans than 3 large, degraded plans.

**If scope is appropriate (2-3 tasks, single subsystem, <5 files per task):**
Proceed to confirm breakdown for a single plan.

**If scope is large (>3 tasks):**
Split into multiple plans by:
- Subsystem (01-01: Database, 01-02: API, 01-03: UI, 01-04: Frontend)
- Dependency (01-01: Setup, 01-02: Core, 01-03: Features, 01-04: Testing)
- Complexity (01-01: Layout, 01-02: Data fetch, 01-03: Visualization)
- Autonomous vs Interactive (group auto tasks for subagent execution)

**Each plan must be:**
- 2-3 tasks maximum
- ~50% context target (not 80%)
- Independently committable

**Autonomous plan optimization:**
- Plans with NO checkpoints → will execute via subagent (fresh context)
- Plans with checkpoints → execute in main context (user interaction required)
- Try to group autonomous work together for maximum fresh contexts

### Confirm Breakdown

Present the breakdown inline:

**If single plan (2-3 tasks):**
```
Here's the proposed breakdown for Stage [X]:

### Tasks (single plan: {stage}-01-PLAN.md)
1. [Task name] - [brief description] [type: auto/checkpoint]
2. [Task name] - [brief description] [type: auto/checkpoint]
[3. [Task name] - [brief description] [type: auto/checkpoint]] (optional 3rd task if small)

Autonomous: [yes/no] (no checkpoints = subagent execution with fresh context)

Does this breakdown look right? (yes / adjust / start over)
```

**If multiple plans (>3 tasks or multiple subsystems):**
```
Here's the proposed breakdown for Stage [X]:

This stage requires 3 plans to maintain quality:

### Plan 1: {stage}-01-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]
3. [Task name] - [brief description] [type]

### Plan 2: {stage}-02-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]

### Plan 3: {stage}-03-PLAN.md - [Subsystem/Component Name]
1. [Task name] - [brief description] [type]
2. [Task name] - [brief description] [type]

Each plan is independently executable and scoped to ~50% context.

Does this breakdown look right? (yes / adjust / start over)
```

Wait for confirmation before proceeding.

If "adjust": Ask what to change, revise, present again.
If "start over": Return to gather stage context step.

### Approach Ambiguity

If multiple valid approaches exist for any task:

Use AskUserQuestion:
- header: "Approach"
- question: "For [task], there are multiple valid approaches:"
- options:
  - "[Approach A]" - [tradeoff description]
  - "[Approach B]" - [tradeoff description]
  - "Decide for me" - Use your best judgment

Only ask if genuinely ambiguous. Don't ask obvious choices.

### Decision Gate

After breakdown confirmed, use AskUserQuestion:
- header: "Ready"
- question: "Ready to create the stage prompt, or would you like me to ask more questions?"
- options:
  - "Create stage prompt" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create stage prompt" selected.

### Write Stage Prompt (PLAN.md)

**Naming:** Use `{stage}-{plan}-PLAN.md` format (e.g., `01-02-PLAN.md` for Stage 1, Plan 2)

```markdown
---
stage: XX-name
type: execute
domain: [optional - if domain skill loaded]
---

<objective>
[What this stage accomplishes - from roadmap stage goal]

Purpose: [Why this matters for the project]
Output: [What artifacts will be created]
</objective>

<context>
@.planning/OVERVIEW.md
@.planning/ROADMAP.md
[If research exists:]
@.planning/stages/XX-name/FINDINGS.md
[Relevant source files:]
@src/path/to/relevant.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: [Action-oriented name]</name>
  <files>path/to/file.ext, another/file.ext</files>
  <action>[Specific implementation - what to do, how to do it, what to avoid and WHY]</action>
  <verify>[Command or check to prove it worked]</verify>
  <done>[Measurable acceptance criteria]</done>
</task>

<task type="auto">
  <name>Task 2: [Action-oriented name]</name>
  <files>path/to/file.ext</files>
  <action>[Specific implementation]</action>
  <verify>[Command or check]</verify>
  <done>[Acceptance criteria]</done>
</task>

<task type="checkpoint:decision" gate="blocking">
  <decision>[What needs deciding]</decision>
  <context>[Why this decision matters]</context>
  <options>
    <option id="option-a">
      <name>[Option name]</name>
      <pros>[Benefits and advantages]</pros>
      <cons>[Tradeoffs and limitations]</cons>
    </option>
    <option id="option-b">
      <name>[Option name]</name>
      <pros>[Benefits and advantages]</pros>
      <cons>[Tradeoffs and limitations]</cons>
    </option>
  </options>
  <resume-signal>[How to indicate choice - "Select: option-a or option-b"]</resume-signal>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>[What Claude just built that needs verification]</what-built>
  <how-to-verify>
    1. Run: [command to start dev server/app]
    2. Visit: [URL to check]
    3. Test: [Specific interactions]
    4. Confirm: [Expected behaviors]
  </how-to-verify>
  <resume-signal>Type "approved" to continue, or describe issues to fix</resume-signal>
</task>

</tasks>

<verification>
Before declaring stage complete:
- [ ] [Specific test command]
- [ ] [Build/type check passes]
- [ ] [Behavior verification]
</verification>

<success_criteria>
- All tasks completed
- All verification checks pass
- No errors or warnings introduced
- [Stage-specific criteria]
</success_criteria>

<output>
After completion, create `.planning/stages/XX-name/{stage}-{plan}-SUMMARY.md`:

# Stage [X] Plan [Y]: [Name] Summary

**[Substantive one-liner - what shipped, not "stage complete"]**

## Accomplishments
- [Key outcome 1]
- [Key outcome 2]

## Files Created/Modified
- `path/to/file.ts` - Description
- `path/to/another.ts` - Description

## Decisions Made
[Key decisions and rationale, or "None"]

## Issues Encountered
[Problems and resolutions, or "None"]

## Next Step
[If more plans in this stage: "Ready for {stage}-{next-plan}-PLAN.md"]
[If stage complete: "Stage complete, ready for next stage"]
</output>
```

### Good Task Examples

```markdown
<task type="auto">
  <name>Task 1: Add User model to database schema</name>
  <files>prisma/schema.prisma</files>
  <action>Add User model with fields: id (cuid), email (unique), passwordHash, createdAt, updatedAt. Add Session relation. Use @db.VarChar(255) for email to prevent index issues.</action>
  <verify>npx prisma validate passes, npx prisma generate succeeds</verify>
  <done>Schema valid, types generated, no errors</done>
</task>

<task type="auto">
  <name>Task 2: Create login API endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>POST endpoint that accepts {email, password}, validates against User table using bcrypt, returns JWT in httpOnly cookie with 15-min expiry. Use jose library for JWT (not jsonwebtoken - it has CommonJS issues with Next.js).</action>
  <verify>curl -X POST /api/auth/login -d '{"email":"test@test.com","password":"test"}' -H "Content-Type: application/json" returns 200 with Set-Cookie header</verify>
  <done>Valid credentials return 200 + cookie, invalid return 401, missing fields return 400</done>
</task>
```

### Bad Task Examples

```markdown
# Phase 1: Foundation

## Tasks

### Task 1: Set up authentication
**Action**: Add auth to the app
**Done when**: Users can log in
```

This is useless. No XML structure, no @context, no verification, no specificity.

**If you can't specify Files + Action + Verify + Done, the task is too vague.**

### Task Quality

Good tasks:
- "Add User model to Prisma schema with email, passwordHash, createdAt"
- "Create POST /api/auth/login endpoint with bcrypt validation"
- "Add protected route middleware checking JWT in cookies"

Bad tasks:
- "Set up authentication" (too vague)
- "Make it secure" (not actionable)
- "Handle edge cases" (which ones?)

### Offer Next

**If single plan:**
```
Stage plan created: .planning/stages/XX-name/{stage}-01-PLAN.md
[X] tasks defined.

What's next?
1. Execute plan (run `/execute`)
2. Review/adjust tasks
3. Done for now
```

**If multiple plans:**
```
Stage plans created:
- {stage}-01-PLAN.md ([X] tasks) - [Subsystem name]
- {stage}-02-PLAN.md ([X] tasks) - [Subsystem name]
- {stage}-03-PLAN.md ([X] tasks) - [Subsystem name]

Total: [X] tasks across [Y] focused plans.

What's next?
1. Execute first plan (run `/execute`)
2. Review/adjust tasks
3. Done for now
```

### Anti-Patterns

- Don't add story points
- Don't estimate hours
- Don't assign to team members
- Don't add acceptance criteria committees
- Don't create sub-sub-sub tasks

Tasks are instructions for Claude, not Jira tickets.

### Success Criteria

Stage planning is complete when:
- [ ] One or more PLAN files exist with XML structure ({stage}-{plan}-PLAN.md)
- [ ] Each plan has: Objective, context, tasks, verification, success criteria, output
- [ ] @context references included
- [ ] Each plan has 2-3 tasks (scoped to ~50% context)
- [ ] Each task has: Type, Files (if auto), Action, Verify, Done
- [ ] Checkpoints identified and properly structured
- [ ] Tasks are specific enough for Claude to execute
- [ ] If multiple plans: logical split by subsystem/dependency/complexity
- [ ] User knows next steps
