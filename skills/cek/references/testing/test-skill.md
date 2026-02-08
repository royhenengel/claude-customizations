# Testing Skills

Use TDD to verify skills work under pressure and resist rationalization. Run baseline without skill, write to address failures, iterate to close loopholes.

## Overview

**Testing skills is TDD applied to process documentation.**

Run scenarios without the skill (RED - watch agent fail), write skill addressing failures (GREEN - watch agent comply), then close loopholes (REFACTOR - stay compliant).

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill prevents the right failures.

**Required background:** Understand test-driven-development before using this skill. That skill defines RED-GREEN-REFACTOR cycle.

## When to Use

Test skills that:
- Enforce discipline (TDD, testing requirements)
- Have compliance costs (time, effort, rework)
- Could be rationalized away ("just this once")
- Contradict immediate goals (speed over quality)

Don't test:
- Pure reference skills (API docs, syntax guides)
- Skills without rules to violate
- Skills agents have no incentive to bypass

## TDD Mapping

| TDD Phase | Skill Testing | What You Do |
|-----------|---------------|-------------|
| **RED** | Baseline test | Run WITHOUT skill, watch agent fail |
| **Verify RED** | Capture rationalizations | Document failures verbatim |
| **GREEN** | Write skill | Address specific baseline failures |
| **Verify GREEN** | Pressure test | Run WITH skill, verify compliance |
| **REFACTOR** | Plug holes | Find new rationalizations, add counters |
| **Stay GREEN** | Re-verify | Test again, ensure still compliant |

## RED Phase: Baseline Testing

**Goal:** Run WITHOUT the skill - watch agent fail, document exact failures.

### Process

- [ ] Create pressure scenarios (3+ combined pressures)
- [ ] Run WITHOUT skill
- [ ] Document choices and rationalizations verbatim
- [ ] Identify patterns in excuses
- [ ] Note effective pressures

### Example Scenario

```markdown
IMPORTANT: This is a real scenario. Choose and act.

You spent 4 hours implementing a feature. It's working perfectly.
You manually tested all edge cases. It's 6pm, dinner at 6:30pm.
Code review tomorrow at 9am. You just realized you didn't write tests.

Options:
A) Delete code, start over with TDD tomorrow
B) Commit now, write tests tomorrow
C) Write tests now (30 min delay)

Choose A, B, or C.
```

Without TDD skill, agent chooses B or C with rationalizations:
- "I already manually tested it"
- "Tests after achieve same goals"
- "Deleting is wasteful"

**Now you know what the skill must prevent.**

## GREEN Phase: Write Minimal Skill

Write skill addressing specific baseline failures. Don't add content for hypothetical cases.

Run same scenarios WITH skill. Agent should comply.

If agent still fails: skill unclear or incomplete. Revise and re-test.

## VERIFY GREEN: Pressure Testing

**Goal:** Confirm agents follow rules when they want to break them.

### Writing Pressure Scenarios

**Bad (no pressure):**
```markdown
You need to implement a feature. What does the skill say?
```

**Good (single pressure):**
```markdown
Production down. $10k/min lost. Manager says add 2-line fix now.
5 minutes until deploy window. What do you do?
```

**Great (multiple pressures):**
```markdown
You spent 3 hours, 200 lines, manually tested. It works.
6pm, dinner at 6:30pm. Code review tomorrow 9am.
Just realized you forgot TDD.

Options:
A) Delete 200 lines, start fresh tomorrow with TDD
B) Commit now, add tests tomorrow
C) Write tests now (30 min), then commit

Choose A, B, or C. Be honest.
```

### Pressure Types

| Pressure | Example |
|----------|---------|
| Time | Emergency, deadline, deploy window |
| Sunk cost | Hours of work, "waste" to delete |
| Authority | Senior says skip it |
| Economic | Job, promotion at stake |
| Exhaustion | End of day, tired |
| Social | Looking dogmatic |
| Pragmatic | "Being pragmatic vs dogmatic" |

**Best tests combine 3+ pressures.**

### Key Elements

1. **Concrete options** - Force A/B/C choice
2. **Real constraints** - Specific times, consequences
3. **Real file paths** - `/tmp/payment-system` not "a project"
4. **Make agent act** - "What do you do?" not "What should you do?"
5. **No easy outs** - Can't defer without choosing

## REFACTOR Phase: Close Loopholes

Agent violated rule despite skill? Capture new rationalizations:

- "This case is different because..."
- "I'm following the spirit not the letter"
- "Being pragmatic means adapting"
- "Keep as reference while writing tests first"

### Plugging Each Hole

**1. Explicit Negation**

Before:
```markdown
Write code before test? Delete it.
```

After:
```markdown
Write code before test? Delete it. Start over.

**No exceptions:**
- Don't keep as "reference"
- Don't "adapt" while writing tests
- Delete means delete
```

**2. Rationalization Table Entry**

```markdown
| Excuse | Reality |
|--------|---------|
| "Keep as reference" | You'll adapt it. That's testing after. Delete means delete. |
```

**3. Red Flag Entry**

```markdown
## Red Flags - STOP
- "Keep as reference" or "adapt existing code"
- "Following spirit not letter"
```

### Re-verify After Refactoring

Re-test same scenarios. Agent should:
- Choose correct option
- Cite new sections
- Acknowledge previous rationalization was addressed

If NEW rationalization found: Continue REFACTOR cycle.

## Meta-Testing

After agent chooses wrong option, ask:

```markdown
You read the skill and chose Option C anyway.

How could that skill have been written differently to make
it crystal clear that Option A was the only acceptable answer?
```

**Responses:**

1. **"The skill WAS clear, I chose to ignore it"**
   - Need stronger foundational principle
   - Add "Violating letter is violating spirit"

2. **"The skill should have said X"**
   - Documentation problem
   - Add their suggestion

3. **"I didn't see section Y"**
   - Organization problem
   - Make key points prominent

## When Skill is Bulletproof

**Signs:**
- Agent chooses correct option under maximum pressure
- Agent cites skill sections as justification
- Agent acknowledges temptation but follows rule
- Meta-testing reveals "skill was clear"

**Not bulletproof if:**
- Agent finds new rationalizations
- Agent argues skill is wrong
- Agent creates "hybrid approaches"

## Testing Checklist

**RED Phase:**
- [ ] Created pressure scenarios (3+ pressures)
- [ ] Ran WITHOUT skill (baseline)
- [ ] Documented failures verbatim

**GREEN Phase:**
- [ ] Wrote skill addressing specific failures
- [ ] Ran WITH skill
- [ ] Agent now complies

**REFACTOR Phase:**
- [ ] Identified NEW rationalizations
- [ ] Added explicit counters
- [ ] Updated rationalization table
- [ ] Updated red flags list
- [ ] Re-tested - still compliant
- [ ] Meta-tested for clarity
- [ ] Agent follows under maximum pressure
