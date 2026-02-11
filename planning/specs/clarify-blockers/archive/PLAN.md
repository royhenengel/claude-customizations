# Clarify Rule 3 (Blockers) Implementation Plan

## Objective

Clarify the distinction between Bug (Rule 1), Blocker (Rule 3), and Gap (Rule 6) in deviation rules. Update documentation with clear definitions, examples, and a decision tree.

## Context

@planning/specs/clarify-blockers/SPEC.md
@planning/specs/clarify-blockers/RESEARCH.md
@skills/my-workflow/workflows/build.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Update deviation rules table in build.md | auto | - | - |
| 2 | Add examples section for Rules 1, 3, 6 in build.md | auto | Task 1 | - |
| 3 | Add decision tree quick reference in build.md | auto | Task 2 | - |
| 4 | Update SKILL.md deviation handling summary | auto | Task 1 | - |
| 5 | Update flow diagram files | auto | Task 1 | - |
| 6 | Verify consistency across all files | checkpoint:human-verify | Tasks 1-5 | yes |

## Tasks

### Task 1: Update deviation rules table in build.md

**Type**: auto
**Files**: skills/my-workflow/workflows/build.md
**Dependencies**: None

**Context**: The main deviation rules table at line ~283 needs clearer trigger definitions based on root cause distinction.

**Action**:

Update the table from:

```
| **1. Auto-fix bugs** | Broken behavior found | Fix immediately |
| **3. Auto-fix blockers** | Can't proceed | Fix immediately |
```

To:

```
| **1. Auto-fix bugs** | Code logic error (wrong output, failed test, crash) | Fix immediately |
| **3. Auto-fix blockers** | Environment/setup issue (missing dep, bad import path, config) | Fix immediately |
```

Also update Rule 6 trigger for clarity:
```
| **6. Gap detected** | Plan ordering issue (need functionality not yet built) | Invoke Gap Protocol |
```

**Verify**: Read updated table, confirm no overlap in trigger definitions
**Done**: Each rule has distinct, non-overlapping trigger based on root cause

---

### Task 2: Add examples section for Rules 1, 3, 6 in build.md

**Type**: auto
**Files**: skills/my-workflow/workflows/build.md
**Dependencies**: Task 1

**Context**: Concrete examples make abstract definitions actionable. Add after the main deviation table.

**Action**:

Add new section after the deviation table (after line ~294):

```markdown
### Deviation Examples

**Rule 1 (Bug) - Code is wrong:**
- Function returns incorrect value (logic error)
- Test fails because implementation doesn't match spec
- Null pointer exception from missing check
- Race condition causing intermittent failures

**Rule 3 (Blocker) - Environment is wrong:**
- `npm install` fails - dependency not in package.json
- Import path points to moved/renamed file
- Environment variable not set
- Database connection refused
- Circular dependency blocking module load

**Rule 6 (Gap) - Plan is wrong:**
- Task 5 needs UserService, but Task 3 (create UserService) isn't complete
- Test requires mock that wasn't created in earlier task
- Integration depends on API endpoint not yet implemented
```

**Verify**: Each example clearly maps to one rule only
**Done**: 3+ examples per rule type, no ambiguous cases

---

### Task 3: Add decision tree quick reference in build.md

**Type**: auto
**Files**: skills/my-workflow/workflows/build.md
**Dependencies**: Task 2

**Context**: A decision tree provides quick rule selection during execution.

**Action**:

Add after the examples section:

```markdown
### Rule Selection Quick Reference

```
Issue encountered during task:
│
├─ Can you START the task at all?
│  └─ NO → Is it missing planned functionality?
│         ├─ YES → Rule 6 (Gap) - invoke Gap Protocol
│         └─ NO → Rule 3 (Blocker) - fix environment/setup
│
└─ YES, task started but something went wrong:
   └─ Is the CODE producing wrong results?
      ├─ YES → Rule 1 (Bug) - fix the code
      └─ NO → Re-evaluate (likely Rule 3 or 6)
```

**Summary**: Bugs are code problems. Blockers are setup problems. Gaps are plan problems.
```

**Verify**: Decision tree covers all scenarios in examples
**Done**: Tree produces correct rule for each example from Task 2

---

### Task 4: Update SKILL.md deviation handling summary

**Type**: auto
**Files**: skills/my-workflow/SKILL.md
**Dependencies**: Task 1

**Context**: SKILL.md has a summary section around line 284-289 that lists deviation rules. Update to match new definitions.

**Action**:

Find the deviation handling section (around line 284):
```
1. **Bug?** → Fix it, note in STATE.md
...
3. **Blocker?** → Fix it, note in STATE.md
```

Update to:
```
1. **Bug?** (code logic error) → Fix it, note in STATE.md
2. **Security gap?** → Fix it, note in STATE.md
3. **Blocker?** (environment/setup issue) → Fix it, note in STATE.md
4. **Architecture change?** → STOP. Ask user.
5. **Enhancement idea?** → Add to BACKLOG.md, continue
6. **Gap?** (plan ordering issue) → Invoke Gap Protocol
```

**Verify**: Summary matches build.md definitions
**Done**: Parenthetical clarifications added to rules 1, 3, 6

---

### Task 5: Update flow diagram files

**Type**: auto
**Files**:
- skills/my-workflow/my-workflow-flow.md
- skills/my-workflow/my-workflow-flow.mmd
**Dependencies**: Task 1

**Context**: Flow diagrams show "Bug/Blocker" combined. Update to show distinction.

**Action**:

In my-workflow-flow.md (around line 41):
Change: `│     ├── Deviation? ──► Bug/Blocker ──► Auto-fix immediately`
To: `│     ├── Deviation? ──► Bug (code) ──► Auto-fix immediately`
Add: `│     │               ├── Blocker (env) ──► Auto-fix immediately`

In my-workflow-flow.mmd (around line 49):
Change: `DEV -->|Bug/Blocker| FIX["Auto-fix"]`
To:
```
DEV -->|Bug - code| FIX["Auto-fix code"]
DEV -->|Blocker - env| FIXENV["Auto-fix env"]
```

**Verify**: Diagrams show Bug and Blocker as separate paths
**Done**: Both diagram files updated with distinction

---

### Task 6: Verify consistency across all files

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Tasks 1-5

**Context**: All files should use consistent terminology and definitions.

**Action**: Review changes in all modified files:
1. build.md - main definitions, examples, decision tree
2. SKILL.md - summary matches
3. my-workflow-flow.md - diagram updated
4. my-workflow-flow.mmd - mermaid source updated

**Verify**:
- [ ] Rule 1 consistently described as "code logic error"
- [ ] Rule 3 consistently described as "environment/setup issue"
- [ ] Rule 6 consistently described as "plan ordering issue"
- [ ] No file still uses ambiguous "can't proceed" for Rule 3

**Done**: Human confirms all files are consistent

## Verification

- [ ] Read Rules 1, 3, 6 consecutively - no confusion
- [ ] Decision tree produces correct rule for all examples
- [ ] No terminology conflicts between files

## Success Criteria

- Reading Rules 1, 3, and 6 consecutively produces no "but what about..." questions
- A new user can correctly categorize sample scenarios using the decision tree
- Examples cover common development scenarios
