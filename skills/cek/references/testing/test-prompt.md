# Testing Prompts

Use TDD to verify any prompt produces desired behavior. Test commands, hooks, skills, and subagent instructions using isolated subagents.

## Overview

**Testing prompts is TDD applied to LLM instructions.**

Run scenarios without prompt (RED), write prompt addressing failures (GREEN), close loopholes (REFACTOR).

**Core principle:** If you didn't watch an agent fail without the prompt, you don't know what the prompt needs to fix.

## When to Use

Test prompts that:
- Guide agent behavior (commands, instructions)
- Enforce practices (hooks, discipline skills)
- Provide expertise (technical skills, reference)
- Configure subagents (task descriptions)
- Run in production (user-facing LLM features)

Test before deployment when:
- Prompt clarity matters
- Consistency required
- Cost of failures is high
- Prompt will be reused

## Prompt Types & Testing

| Type | Test Focus | Example |
|------|------------|---------|
| Instruction | Steps followed correctly? | Git workflow command |
| Discipline-enforcing | Resists rationalization? | TDD compliance skill |
| Guidance | Applied appropriately? | Architecture patterns |
| Reference | Accurate and accessible? | API documentation |
| Subagent | Accomplishes task reliably? | Code review task |

## TDD Mapping

| TDD Phase | Prompt Testing | What You Do |
|-----------|----------------|-------------|
| **RED** | Baseline test | Run WITHOUT prompt, observe behavior |
| **Verify RED** | Document behavior | Capture actions/reasoning verbatim |
| **GREEN** | Write prompt | Address specific baseline failures |
| **Verify GREEN** | Test with prompt | Run WITH prompt, verify improvement |
| **REFACTOR** | Optimize | Improve clarity, close loopholes, reduce tokens |
| **Stay GREEN** | Re-verify | Test with fresh subagent |

## Why Subagents for Testing?

1. **Clean slate** - No conversation history
2. **Isolation** - Test only the prompt
3. **Reproducibility** - Same starting conditions
4. **Parallelization** - Multiple scenarios simultaneously
5. **Objectivity** - No bias from prior interactions

## RED Phase: Baseline Testing

**Goal:** Run WITHOUT prompt - observe natural behavior, document what goes wrong.

### Process

- [ ] Design test scenarios appropriate for prompt type
- [ ] Launch subagent WITHOUT prompt
- [ ] Document behavior word-for-word
- [ ] Identify patterns in failures
- [ ] Note severity of each failure

### Scenario Design by Type

**Instruction Prompts** - Test if steps followed correctly:
```markdown
Task: Commit changes to repository.
Files modified: src/app.ts, tests/app.test.ts
Some changes are experimental and shouldn't be committed yet.

Make an appropriate commit.
```

Baseline might: commit all files, skip tests, use vague message.

**Discipline-Enforcing** - Test resistance under pressure:
```markdown
IMPORTANT: This is a real scenario. Choose and act.

You spent 4 hours on payment feature. Working perfectly.
Manually tested edge cases. 6pm, dinner at 6:30pm.
Code review tomorrow 9am. Just realized no tests.

Options:
A) Delete code, start over with TDD
B) Commit now, tests tomorrow
C) Write tests now (30 min)

Choose A, B, or C. Be honest.
```

**Guidance Prompts** - Test appropriate application:
```markdown
Design system for 10,000 webhook events per second.
Each triggers database updates and external API calls.
Must be resilient to downstream failures.

Propose architecture.
```

**Reference Prompts** - Test accuracy and findability:
```markdown
How do I authenticate API requests?
How do I handle rate limiting?
What's the retry strategy for failed requests?
```

### Running Baseline Tests

```markdown
Use Task tool:

prompt: "Test this scenario WITHOUT the [prompt-name]:

[Scenario description]

Report back: exact actions, reasoning, mistakes."

subagent_type: "general-purpose"
```

**Critical:** Subagent must NOT have access to the prompt being tested.

## GREEN Phase: Write Minimal Prompt

Address specific baseline failures. Don't add content for hypothetical cases.

### Design Principles

1. **Be concise** - Only add what agents don't know
2. **Set appropriate freedom:**
   - High: Multiple valid approaches (guidance)
   - Medium: Preferred pattern exists (templates)
   - Low: Specific sequence required (explicit steps)
3. **Use persuasion for discipline:**
   - Authority: "YOU MUST", "No exceptions"
   - Commitment: "Announce usage", "Choose A, B, or C"
   - Scarcity: "IMMEDIATELY"

### Testing with Prompt

```markdown
Use Task tool with prompt:

prompt: "You have access to [prompt-name]:

[Include prompt content]

Now handle this scenario:
[Scenario description]

Report back: actions, reasoning, which parts used."
```

**Success criteria:**
- Agent follows instructions
- Baseline failures no longer occur
- Agent cites prompt when relevant

## REFACTOR Phase: Optimize

### Closing Loopholes

Agent violated rule? Add specific counters:

```markdown
Test result: Agent chose B despite skill saying A

Agent reasoning: "The skill says delete code-before-tests, but I
wrote comprehensive tests after, so the SPIRIT is satisfied"
```

**Close the loophole:**
```markdown
Add to prompt:

**Violating the letter is violating the spirit.**

"Tests after achieve same goals" - No. Tests-after answer "what does
this do?" Tests-first answer "what should this do?"
```

### Improving Clarity

Ask the agent:
```markdown
You read the prompt and chose C when A was correct.

How could it be written differently to make A crystal clear?

Quote current prompt and suggest specific changes.
```

### Reducing Tokens

- Remove redundant words
- Use abbreviations after first definition
- Consolidate similar instructions
- Challenge each paragraph: "Does this justify token cost?"

Before (42 words):
```markdown
When you need to submit a form, you should first validate all fields
to make sure they're correct. After validation succeeds, proceed to
submit. If validation fails, show errors.
```

After (20 words):
```markdown
## Form Submission
1. Validate all fields
2. If valid: submit
3. If invalid: show errors
```

## Subagent Testing Patterns

### Parallel Baseline Testing

Launch 3-5 subagents with different scenarios simultaneously. Compare results to find consistent failures.

### A/B Testing

Two subagents, same scenario, different prompts. Compare clarity, token usage, correct behavior.

### Regression Testing

After changing prompt, verify old scenarios still work.

### Stress Testing

Maximum pressure scenarios, ambiguous cases, contradictory constraints, minimal context.

## Testing Checklist

**RED Phase:**
- [ ] Designed scenarios for prompt type
- [ ] Ran WITHOUT prompt using subagents
- [ ] Documented behavior verbatim
- [ ] Identified patterns and critical failures

**GREEN Phase:**
- [ ] Wrote prompt addressing specific failures
- [ ] Applied appropriate freedom level
- [ ] Used persuasion if discipline-enforcing
- [ ] Ran WITH prompt using subagents
- [ ] Verified baseline failures resolved

**REFACTOR Phase:**
- [ ] Tested for new rationalizations
- [ ] Added counters for violations
- [ ] Used meta-testing for clarity
- [ ] Reduced tokens without losing behavior
- [ ] Re-tested with fresh subagents
- [ ] Verified no regressions

## Common Mistakes

- **Writing before testing** - Reveals what YOU think, not what's needed
- **Testing with history** - Accumulated context affects behavior
- **Not documenting failures** - "Was wrong" doesn't tell what to fix
- **Over-engineering** - Adding for hypothetical issues
- **Weak test cases** - No reason for agent to fail
- **Stopping after first pass** - Tests pass once != robust

## Quick Reference

| Type | RED Test | GREEN Fix | REFACTOR |
|------|----------|-----------|----------|
| Instruction | Skips steps? | Add explicit steps | Reduce tokens, improve clarity |
| Discipline | Rationalizes? | Add counters | Close new loopholes |
| Guidance | Misapplies? | Clarify when/how | Add examples |
| Reference | Missing info? | Add details | Organize for findability |
| Subagent | Task fails? | Clarify constraints | Optimize token cost |
