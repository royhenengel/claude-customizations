# Compound Workflow Integration Research

## Problem Analysis

### Why /compound Has Never Been Used

/compound was ported from the compound-engineering plugin and adapted for solo workflow, but has zero documented solutions after months of project work. Root causes:

1. **No trigger points**: Nothing in /fix or /build invokes /compound. The skill only activates on explicit manual invocation, which never happens organically.

2. **No reverse lookup**: When encountering a problem, /fix doesn't check existing solutions. Even if solutions existed, they wouldn't surface during investigation.

### What Works Well

- memory-boundaries.md clearly defines when to use /compound vs other systems
- Solution document template is solid (Problem, Investigation, Root Cause, Solution, Prevention)
- 3-agent extraction pattern (Problem Extractor, Solution Extractor, Category Classifier) is well-structured for quality output
- Storage path (planning/solutions/) is correctly placed
- INDEX.md structure is clean and ready

## Codebase Analysis

### Integration Points in /fix

| Step | Current Behavior | Integration |
|------|------------------|-------------|
| Step 2: Git History Search | Searches commits only | Add: search planning/solutions/ first |
| Step 9: Convention Check | Checks if fix reveals conventions | Add: auto-invoke /compound after this step |
| Step 10: Finalize Changes | Commit and push | No change needed |

Insertion points:

- **Step 2** (beginning): Search solutions before investigating. If a match exists, present it immediately. Highest-value integration because it saves investigation time.

- **After Step 9** (new Step 9a): Auto-invoke /compound with fix context. Context is fresh, the causal chain is documented in the conversation. No user prompt needed.

### Integration Points in /build

| Step | Current Behavior | Integration |
|------|------------------|-------------|
| Step 5: Execute Tasks | Deviation rules 1-3 auto-fix | After fix, auto-invoke /compound |
| Step 12: Completion | Shows completion banner | No change needed |

Insertion point:

- **Step 5** (after deviation fix): When deviation rules 1-3 fire and auto-fix an issue, auto-invoke /compound immediately while context is fresh. More effective than waiting until Step 12 when context may be stale.

## Key Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Hybrid automation: auto-capture + user review | Offers are easy to ignore (leads to zero capture). Auto-capture ensures solutions accumulate. User can delete/edit solutions at any time. |
| D2 | Solution search in /fix Step 2 (beginning) | Highest-value integration: surfaces known solutions before wasting investigation time. |
| D3 | Auto-invoke /compound after /fix Step 9 | Context is freshest right after fix is verified. No prompt, just capture. |
| D4 | Auto-invoke /compound in /build Step 5 after deviation fixes | Capture immediately when context is fresh, not at completion when details are stale. |
| D5 | Keep 3-agent extraction pattern | Agents aren't the problem. Missing trigger points are the problem. Parallel extraction produces better structured output. |
| D6 | No changes to categories or INDEX.md | Categories are fine as-is. Let taxonomy emerge from actual solutions. |

## Upstream Comparison

The compound-engineering plugin (8.3k stars) uses /workflows:compound as the final phase in a 4-phase cycle: plan, work, review, compound. Key difference: they compound at phase boundaries. Our approach auto-captures at the moment of fix (when context is freshest), which should produce higher-quality solutions.
