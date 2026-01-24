# Workflow: /brainstorm

## Purpose

Turn unclear ideas into fully formed designs through collaborative dialogue.

## When to Use

- User invokes `/brainstorm` directly
- `/plan` offers this when requirements are unclear
- User has an idea but hasn't defined scope or approach
- Need to explore alternatives before committing to a plan

## Entry Point

User invokes `/brainstorm` directly, or `/plan` offers it when requirements seem unclear.

## The Process

### 1. Understand Current Context

Check project state:
- Read `planning/STATE.md` for current focus
- Check `planning/specs/` for existing features
- Look at recent work to understand project direction

### 2. Explore the Idea (One Question at a Time)

Ask questions to refine understanding:

- **Purpose**: What problem does this solve? Who benefits?
- **Scope**: What's in scope vs explicitly out of scope?
- **Constraints**: Technical limitations, timeline, dependencies?
- **Success criteria**: How do we know it's done?

**Key principles:**
- ONE question per message
- Prefer multiple choice when possible
- Open-ended is fine for exploratory topics
- Don't overwhelm with multiple questions at once

### 3. Propose Approaches (2-3 Options)

Once you understand the idea, present alternatives:

```
Based on what you've described, here are approaches:

**Option A: {Name}** (Recommended)
- How it works: ...
- Pros: ...
- Cons: ...
- Why I recommend it: ...

**Option B: {Name}**
- How it works: ...
- Pros: ...
- Cons: ...

**Option C: {Name}** (if applicable)
- How it works: ...
- Pros: ...
- Cons: ...

Which approach resonates with you?
```

Lead with your recommendation and explain reasoning.

### 4. Present Design Incrementally

Once approach is chosen, present the design:

- Break into sections of 200-300 words
- After each section, ask: "Does this look right so far?"
- Cover: architecture, components, data flow, error handling
- Be ready to revise if something doesn't fit

**Sections to cover:**
1. Overview and goals
2. Architecture/structure
3. Key components
4. Data flow
5. Error handling
6. Testing approach (if applicable)

### 5. Determine Plan Scope

Based on the design complexity, determine appropriate structure:

**Simple** (a few tasks):
- Single PLAN.md with 2-3 tasks
- No phases needed

**Feature** (clear scope):
- SPEC.md + PLAN.md
- Single feature directory

**Multi-feature** (complex):
- Multiple specs under planning/specs/
- Phased roadmap

Ask user to confirm the scope determination.

## Output

Write the validated design to:
```
planning/specs/{feature-name}/
├── SPEC.md          # Requirements from brainstorm
└── RESEARCH.md      # Alternatives considered, decisions made
```

Update `planning/STATE.md`:

- Stage: planning
- Current Focus: {feature name}
- Add to Progress: "Brainstorming complete for {feature}"

## Transition

After brainstorm completes:

```text
Brainstorm complete!

Created:
- planning/specs/{feature}/SPEC.md (requirements)
- planning/specs/{feature}/RESEARCH.md (decisions)

Next: Ready to create the implementation plan?
(This will generate PLAN.md with executable tasks)
```

If yes, continue with the `/plan` workflow's planning phase.

## Key Principles

- **One question at a time** - Don't overwhelm
- **Multiple choice preferred** - Easier to answer
- **YAGNI ruthlessly** - Remove unnecessary features
- **Explore alternatives** - Always propose 2-3 approaches
- **Incremental validation** - Present in sections, validate each
- **Be flexible** - Revise when something doesn't fit

## Integration with /plan

```text
/plan invoked (or /brainstorm directly)
    |
    v
Requirements clear?
    |
    +-- No/Unclear --> Run brainstorm.md workflow
    |                      |
    |                      v
    |                  SPEC.md + RESEARCH.md created
    |                      |
    +-- Yes ----------+----+
                      |
                      v
                Continue to planning phase
                (create PLAN.md)
```
