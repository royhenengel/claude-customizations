---
description: Clarify unclear ideas through collaborative dialogue
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion, EnterPlanMode, ExitPlanMode, TodoWrite, WebSearch, WebFetch
---

# /brainstorm - Explore and Clarify Ideas

Turn unclear ideas into fully formed designs through one-question-at-a-time exploration.

## Step 1: Get the Idea

If no idea was provided with the command, ask:

"What idea would you like to explore?"

## Step 2: Understand Context

Ask ONE question at a time to understand:
- What problem does this solve?
- Who is affected?
- What does success look like?

## Step 3: Research (if needed)

If the idea involves unfamiliar technology or patterns, research first using WebSearch/WebFetch.

## Step 4: Propose Approaches

Present 2-3 approaches with clear trade-offs:

```text
Based on our discussion, here are the approaches I see:

**Approach A: [Name]**
- How: [Brief description]
- Pros: [Benefits]
- Cons: [Drawbacks]

**Approach B: [Name]**
- How: [Brief description]
- Pros: [Benefits]
- Cons: [Drawbacks]

Which approach resonates with you?
```

## Step 5: Validate Incrementally

Once an approach is selected, validate details one at a time. Don't assume - ask.

## Step 6: Create Spec

Create `planning/specs/{feature-name}/`:
- `spec.md` - The clarified feature specification
- `research.md` - Any research findings (if applicable)

## Step 7: Update State

Update `planning/STATE.md`:
- Stage: planning
- Current Focus: {feature-name}
- Add decision to Decisions section

## Step 8: Show Next Steps

```text
Feature clarified and documented!

Created:
- planning/specs/{feature-name}/spec.md
- planning/specs/{feature-name}/research.md (if applicable)

Next: Run /plan to create an implementation plan for this feature.
```
