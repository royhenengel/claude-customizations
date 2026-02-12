# Compound Workflow Integration Implementation Plan

## Objective

Make /compound a functioning part of the development workflow by adding automatic solution capture in /fix and /build, plus reverse lookup of existing solutions when investigating problems.

## Context

@planning/specs/compound-workflow-integration/SPEC.md
@planning/specs/compound-workflow-integration/RESEARCH.md
@planning/specs/compound-workflow-integration/DISCOVERY.md
@skills/Learning/compound/SKILL.md
@skills/Code-Quality/fix/SKILL.md
@skills/Planning/my-workflow/workflows/build.md
@rules/memory-boundaries.md

## Task Summary

| # | Task | Type | Dependencies |
|---|------|------|--------------|
| 1 | Add solution search to /fix Step 2 | auto | - |
| 2 | Add auto-capture to /fix after Step 9 | auto | - |
| 3 | Add auto-capture to /build deviation rules | auto | - |
| 4 | End-to-end verification | checkpoint:human-verify | Tasks 1-3 |
| 5 | Update STATE.md and BACKLOG.md | auto | Task 4 |

## Tasks

### Task 1: Add solution search to /fix Step 2

**Type**: auto
**Files**: `skills/Code-Quality/fix/SKILL.md`
**Dependencies**: None

**Context**: /fix Step 2 (Git History Search) searches commits for related work but doesn't check existing solutions. If a matching solution exists, it should surface before investigation begins. This is the highest-value integration point because it saves investigation time.

**Action**:

Add to the beginning of Step 2 (Git History Search), before the git log commands:

```markdown
**Check existing solutions first:**

If `planning/solutions/` exists, search for matching problems:

\`\`\`bash
# Search solution files for related keywords
grep -rl "<relevant-keyword>" planning/solutions/ 2>/dev/null | head -5
\`\`\`

If matching solutions found, present them:

\`\`\`text
Found existing solution(s) that may match:
- planning/solutions/{category}/{filename}.md: {title from frontmatter}

Review before investigating? (yes/no)
\`\`\`

If user says yes, read the matching solution(s) and assess applicability. If the solution matches, apply it directly. If not, proceed with investigation.
```

Keep the rest of Step 2 unchanged.

**Verify**: Read /fix SKILL.md and confirm the solution search appears before git history search in Step 2.

**Done**: /fix Step 2 checks planning/solutions/ before investigating. Rest of /fix unchanged.

---

### Task 2: Add auto-capture to /fix after Step 9

**Type**: auto
**Files**: `skills/Code-Quality/fix/SKILL.md`
**Dependencies**: None

**Context**: After a fix is verified (Step 8) and conventions checked (Step 9), the fix context is fresh. Auto-invoke /compound here without prompting the user. Solutions accumulate automatically; user can review/delete later.

**Action**:

Add a new Step 9a between Step 9 (Convention Check) and Step 10 (Finalize Changes):

```markdown
## Step 9a: Auto-Capture Solution

If the fix involved a non-trivial root cause (not a typo, missing import, or obvious error):

Automatically invoke `/compound` with context from this fix session. Pass the root cause analysis from Step 5 as context.

Do not prompt the user. The solution document is written to `planning/solutions/` automatically. The user can review, edit, or delete solutions at any time.

Skip this step for trivial fixes (typos, missing imports, obvious syntax errors).
```

**Verify**: Read /fix SKILL.md and confirm Step 9a exists between Step 9 and Step 10. Confirm it does not prompt the user.

**Done**: /fix auto-captures solutions after non-trivial fixes without user intervention.

---

### Task 3: Add auto-capture to /build deviation rules

**Type**: auto
**Files**: `skills/Planning/my-workflow/workflows/build.md`
**Dependencies**: None

**Context**: During build execution, deviation rules 1-3 fire when bugs, security gaps, or blockers are auto-fixed. These fixes should be captured immediately while context is fresh, not deferred to completion when details are stale.

**Action**:

In Step 5 (Execute Tasks), add to the deviation rules section. After the deviation fix is applied and noted in STATE.md, add an auto-capture instruction:

```markdown
**After applying deviation rules 1-3**, if the fix involved a non-trivial root cause:

Automatically invoke `/compound` with the deviation context (what triggered it, what was fixed, why). Do not prompt the user. The solution document is written to `planning/solutions/` automatically.

Skip for trivial fixes (missing imports, typos, obvious config errors).
```

Add this after the existing deviation rules table and before Rule 4 Triggers.

**Verify**: Read build.md and confirm auto-capture instruction appears in the deviation rules section. Confirm it does not prompt the user.

**Done**: /build auto-captures solutions when deviation rules 1-3 fire for non-trivial fixes.

---

### Task 4: End-to-end verification

**Type**: checkpoint:human-verify
**Dependencies**: Tasks 1-3

**Context**: Verify the modified workflows read correctly and integration points are natural.

**Action**:

Verify each integration point:

1. Read `skills/Code-Quality/fix/SKILL.md` - confirm solution search in Step 2 and auto-capture in Step 9a

2. Read `skills/Planning/my-workflow/workflows/build.md` - confirm auto-capture in deviation rules section

3. Read `skills/Learning/compound/SKILL.md` - confirm unchanged (no modifications to skill internals)

4. Verify `rules/memory-boundaries.md` still accurately describes /compound (should need no changes)

Present summary of all changes for human review.

**Verify**: Human confirms all integration points read naturally and don't disrupt existing workflows.

**Done**: Human approves the changes.

---

### Task 5: Update STATE.md and BACKLOG.md

**Type**: auto
**Dependencies**: Task 4

**Context**: After verification, update project tracking to reflect this feature's completion.

**Action**:

1. Update `planning/STATE.md`:
   - Update compound-workflow-integration status to complete in Feature Registry
   - Update Current Focus
   - Update Progress section with completed tasks
   - Add decision records for hybrid automation approach

2. Update `planning/BACKLOG.md`:
   - Mark "Clarify /compound and integrate into workflow" as complete
   - Mark "Possibly automate /compound?" as resolved (superseded by hybrid approach)
   - Mark "Master using compound lessons system" as resolved (now achievable through automatic workflow integration)

**Verify**: Read STATE.md and BACKLOG.md to confirm updates.

**Done**: Project tracking reflects feature completion. Backlog items resolved.

## Verification

- [ ] /fix Step 2 searches planning/solutions/ before git history
- [ ] /fix Step 9a auto-invokes /compound after non-trivial fixes (no prompt)
- [ ] /build deviation rules auto-invoke /compound after non-trivial fixes (no prompt)
- [ ] /compound skill unchanged (3-agent extraction preserved)
- [ ] All auto-capture skips trivial fixes

## Success Criteria

- /fix and /build both auto-capture solutions without user prompting
- /fix searches existing solutions before investigating
- /compound skill internals unchanged
- At least 1 solution documented end-to-end (may happen in first real use, not necessarily during this build)
