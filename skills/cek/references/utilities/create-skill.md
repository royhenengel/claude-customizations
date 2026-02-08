# Create Skill

Guide for creating effective skills using TDD methodology.

## Overview

**Writing skills IS TDD applied to process documentation.**

Write test cases (pressure scenarios), watch them fail (baseline), write skill (documentation), watch tests pass (compliance), refactor (close loopholes).

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if it teaches the right thing.

## What is a Skill?

A reusable reference guide for proven techniques, patterns, or tools that helps future Claude instances find and apply effective approaches.

**Skills are:** Reusable techniques, patterns, tools, reference guides
**Skills are NOT:** Narratives about how you solved a problem once

## When to Create

**Create when:**
- Technique wasn't obvious to you
- You'd reference this across projects
- Pattern applies broadly
- Others would benefit

**Don't create for:**
- One-off solutions
- Standard practices well-documented elsewhere
- Project-specific conventions (put in CLAUDE.md)

## Skill Types

- **Technique**: Concrete method with steps (condition-based-waiting)
- **Pattern**: Way of thinking (flatten-with-flags)
- **Reference**: API docs, syntax guides

## Directory Structure

```
skills/
  skill-name/
    SKILL.md              # Main reference (required)
    references/           # Detailed documentation
    scripts/              # Executable tools
    assets/               # Files for output
```

## SKILL.md Structure

```yaml
---
name: Skill-Name-With-Hyphens
description: Use when [triggers] - [what it does in third person]
---
```

**Frontmatter**:
- Only `name` (64 chars max) and `description` (1024 chars max)
- Name: letters, numbers, hyphens only
- Description: Third person, includes what AND when to use

**Body Structure**:
```markdown
# Skill Name

## Overview
Core principle in 1-2 sentences.

## When to Use
Bullet list with SYMPTOMS and use cases

## Core Pattern
Before/after comparison

## Quick Reference
Table or bullets for scanning

## Common Mistakes
What goes wrong + fixes
```

## The Iron Law

```
NO SKILL WITHOUT A FAILING TEST FIRST
```

Write skill before testing? Delete it. Start over.

**No exceptions:**
- Not for "simple additions"
- Not for "documentation updates"
- Delete means delete

## RED-GREEN-REFACTOR

### RED: Baseline Testing

Run scenarios WITHOUT skill:
- What choices did agents make?
- What rationalizations? (verbatim)
- Which pressures triggered violations?

### GREEN: Write Minimal Skill

Address specific rationalizations. Don't add content for hypothetical cases.

Run same scenarios WITH skill. Agent should comply.

### REFACTOR: Close Loopholes

Agent found new rationalization? Add explicit counter. Re-test.

## Testing All Skill Types

**Discipline Skills** (TDD, testing requirements):
- Academic questions: Understand rules?
- Pressure scenarios: Comply under stress?
- Multiple pressures: time + sunk cost + exhaustion

**Technique Skills** (how-to guides):
- Application: Apply correctly?
- Variation: Handle edge cases?
- Missing info: Instruction gaps?

**Pattern Skills** (mental models):
- Recognition: Know when applies?
- Application: Use the model?
- Counter-examples: Know when NOT to apply?

**Reference Skills** (documentation):
- Retrieval: Find right information?
- Application: Use it correctly?
- Gap testing: Common cases covered?

## Skill Creation Checklist

**RED Phase:**
- [ ] Create pressure scenarios (3+ pressures for discipline)
- [ ] Run WITHOUT skill - document baseline verbatim
- [ ] Identify patterns in failures

**GREEN Phase:**
- [ ] Name uses only letters, numbers, hyphens
- [ ] YAML frontmatter with name and description
- [ ] Description starts with "Use when..."
- [ ] Description in third person
- [ ] Keywords for search (errors, symptoms)
- [ ] Clear overview with core principle
- [ ] Address specific baseline failures
- [ ] Run WITH skill - verify compliance

**REFACTOR Phase:**
- [ ] Identify NEW rationalizations
- [ ] Add explicit counters
- [ ] Build rationalization table
- [ ] Create red flags list
- [ ] Re-test until bulletproof

**Quality:**
- [ ] Flowchart only if decision non-obvious
- [ ] Quick reference table
- [ ] Common mistakes section
- [ ] No narrative storytelling

## Progressive Disclosure

Three-level loading:
1. **Metadata** - Always in context (~100 words)
2. **SKILL.md body** - When triggered (<5k words)
3. **Bundled resources** - As needed (unlimited)

## Notes

- See `/apply-anthropic-skill-best-practices` for official Anthropic guidance
- Use TDD skill for testing methodology
- Commit and push after creation
