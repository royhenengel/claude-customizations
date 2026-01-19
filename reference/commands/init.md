---
description: Initialize a new project or feature with proper structure
---

# Initialize Project/Feature

You are starting a new project or feature. Follow this workflow:

## Step 1: Assess Context

Determine the starting point:
- **Brownfield** (existing codebase): Run `/map-codebase` first to analyze the existing code
- **Greenfield** (new project): Skip to brainstorming

## Step 2: Explore the Idea (Brainstorming)

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections (200-300 words), checking after each section whether it looks right so far.

### The Process

**Understanding the idea:**
- Check out the current project state first (files, docs, recent commits)
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible, but open-ended is fine too
- Only one question per message - if a topic needs more exploration, break it into multiple questions
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**
- Propose 2-3 different approaches with trade-offs
- Present options conversationally with your recommendation and reasoning
- Lead with your recommended option and explain why

**Presenting the design:**
- Once you believe you understand what you're building, present the design
- Break it into sections of 200-300 words
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify if something doesn't make sense

### After the Design

**Documentation:**
- Write the validated design to `docs/plans/YYYY-MM-DD-<topic>-design.md`
- Use `elements-of-style:writing-clearly-and-concisely` skill if available
- Commit the design document to git

### Key Principles

- **One question at a time** - Don't overwhelm with multiple questions
- **Multiple choice preferred** - Easier to answer than open-ended when possible
- **YAGNI ruthlessly** - Remove unnecessary features from all designs
- **Explore alternatives** - Always propose 2-3 approaches before settling
- **Incremental validation** - Present design in sections, validate each
- **Be flexible** - Go back and clarify when something doesn't make sense

## Step 3: Create OVERVIEW (Brief)

### Gather Vision

Ask the user (conversationally, not AskUserQuestion):

1. **What are we building?** (one sentence)
2. **Why does this need to exist?** (the problem it solves)
3. **What does success look like?** (how we know it worked)
4. **Any constraints?** (tech stack, timeline, budget, etc.)

Keep it conversational. Don't ask all at once - let it flow naturally.

### Decision Gate

After gathering context, use AskUserQuestion:
- header: "Ready"
- question: "Ready to create the overview, or would you like me to ask more questions?"
- options:
  - "Create overview" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create overview" selected.

### Create Structure

```bash
mkdir -p .planning
```

### Write OVERVIEW.md

Write to `.planning/OVERVIEW.md` using this template:

#### Greenfield (v1.0)

```markdown
# [Project Name]

**One-liner**: [What this is in one sentence]

## Problem

[What problem does this solve? Why does it need to exist?
2-3 sentences max.]

## Success Criteria

How we know it worked:

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

## Constraints

[Any hard constraints: tech stack, timeline, budget, dependencies]

- [Constraint 1]
- [Constraint 2]

## Out of Scope

What we're NOT building (prevents scope creep):

- [Not doing X]
- [Not doing Y]
```

#### Brownfield (v1.1+)

After shipping v1.0, update OVERVIEW.md to include current state:

```markdown
# [Project Name]

## Current State (Updated: YYYY-MM-DD)

**Shipped:** v[X.Y] [Name] (YYYY-MM-DD)
**Status:** [Production / Beta / Internal / Live with users]
**Users:** [If known: "~500 downloads, 50 DAU" or "Internal use only" or "N/A"]
**Feedback:** [Key themes from user feedback, or "Initial release, gathering feedback"]
**Codebase:**
- [X,XXX] lines of [primary language]
- [Key tech stack: framework, platform, deployment target]
- [Notable dependencies or architecture]

**Known Issues:**
- [Issue 1 from v1.x that needs addressing]
- [Issue 2]
- [Or "None" if clean slate]

## v[Next] Goals

**Vision:** [What's the goal for this next iteration?]

**Motivation:**
- [Why this work matters now]
- [User feedback driving it]
- [Technical debt or improvements needed]

**Scope (v[X.Y]):**
- [Feature/improvement 1]
- [Feature/improvement 2]
- [Feature/improvement 3]

**Success Criteria:**
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

**Out of Scope:**
- [Not doing X in this version]
- [Not doing Y in this version]

---

<details>
<summary>Original Vision (v1.0 - Archived for reference)</summary>

[Original v1.0 content here with checkboxes marked [x] for achieved goals]

</details>
```

### Guidelines

- Keep under 50 lines
- Success criteria must be measurable/verifiable
- Out of scope prevents "while we're at it" creep
- This is the ONLY human-focused document

### Anti-Patterns

- Don't write a business plan
- Don't include market analysis
- Don't add stakeholder sections
- Don't create executive summaries
- Don't add timelines (that's roadmap's job)

Keep it focused: What, Why, Success, Constraints.

## Step 4: Offer Next Steps

After creating overview:

```
Overview created: .planning/OVERVIEW.md

NOTE: Overview is NOT committed yet. It will be committed with the roadmap as project initialization.

What's next?
1. Create roadmap now (recommended - commits overview + roadmap together)
2. Review/edit overview
3. Done for now (overview will remain uncommitted)
```

## Step 5: Handoff

Once OVERVIEW.md exists, inform user:
- "Structure created. Run `/plan` to detail the first stage."
- Update STATE.md with initialization timestamp
