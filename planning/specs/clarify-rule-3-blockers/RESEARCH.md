# Clarify Rule 3 (Blockers) Research

## Information Gathered

### Current Rule Definitions

From [build.md:283-290](../../skills/my-workflow/workflows/build.md#L283-L290):

| Rule | Current Trigger | Current Action |
|------|-----------------|----------------|
| 1 | "Broken behavior found" | Fix immediately |
| 2 | "Security/correctness gap" | Add immediately |
| 3 | "Can't proceed" | Fix immediately |
| 6 | "Prerequisite missing / plan needs modification" | Invoke Gap Protocol |

### Overlap Analysis

**Rule 1 vs Rule 3:**
- A bug can prevent proceeding (overlaps with Rule 3)
- A blocker can manifest as "broken behavior" (overlaps with Rule 1)

**Rule 3 vs Rule 6:**
- A missing prerequisite is a reason you "can't proceed" (overlaps)
- Both involve something blocking progress

**Rule 2 vs Rule 6:**
- "Correctness gap" could be interpreted as "missing functionality"
- Security is clear, but "correctness" is ambiguous

### Prior Incident

From [incident-2026-01-29-autonomous-decisions.md](../../incident-2026-01-29-autonomous-decisions.md):

During deletion cascade implementation, API limitations were treated as "blockers" and autonomously worked around. Each workaround was actually a design decision with alternatives that should have triggered Rule 4 (ask for approval).

**Key insight from incident**: "Workarounds are not bug fixes - they're architecture choices that require user input."

This demonstrates how ambiguous Rule 3 ("auto-fix blockers") can be misinterpreted to justify autonomous implementation of significant design changes.

### Reference Implementation Analysis

From [execute-phase.md:565-587](../../skills/my-workflow/ref/taches-create-plans/workflows/execute-phase.md#L565-L587):

Rule 3 examples provided:
- Missing dependency not in package.json
- Import path points to non-existent file
- Environment variable not set
- Circular dependency blocking module resolution

These are all **external/environmental** issues, not code logic bugs.

### Real-World Scenario Mapping

| Scenario | Current Ambiguity | Proposed Rule |
|----------|-------------------|---------------|
| Test fails because logic is wrong | Rule 1 or 3? | **Rule 1** (bug in code) |
| npm install fails, missing dep | Rule 1 or 3? | **Rule 3** (external blocker) |
| Task 5 needs function from Task 3, but Task 3 incomplete | Rule 3 or 6? | **Rule 6** (plan ordering gap) |
| Import path wrong after refactor | Rule 1 or 3? | **Rule 3** (environmental) |
| Function returns wrong value | Rule 1 or 3? | **Rule 1** (logic bug) |
| Database connection string missing | Rule 3 | **Rule 3** (clear) |

## Approach

**Clarify based on root cause, not symptom:**

- **Bug (Rule 1)**: The code itself is wrong (logic error, incorrect implementation)
- **Blocker (Rule 3)**: The environment/setup is wrong (missing dep, bad path, config issue)
- **Gap (Rule 6)**: The plan execution order is wrong (need something not yet built)

**Key distinction**: Bugs are **code problems**, blockers are **setup problems**, gaps are **plan problems**.

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| A: Clarify with root cause distinction | Clear mental model, matches examples | Requires updating docs | SELECTED |
| B: Merge Rules 1 and 3 into single "Fix issues" rule | Simpler | Loses useful distinction for tracking | Rejected |
| C: Add flowchart only, keep definitions | Visual aid helps | Doesn't fix underlying ambiguity | Rejected |

## Files to Modify

1. `skills/my-workflow/workflows/build.md` - Main deviation rules table and descriptions
2. `skills/my-workflow/SKILL.md` - Summary deviation handling section
3. `skills/my-workflow/my-workflow-flow.md` - ASCII flow diagram
4. `skills/my-workflow/my-workflow-flow.mmd` - Mermaid diagram source

## Open Questions

None. Requirements are clear from backlog analysis.
