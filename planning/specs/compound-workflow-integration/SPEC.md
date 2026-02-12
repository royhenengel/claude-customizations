# Compound Workflow Integration Specification

## Goal

Make /compound a functioning part of the development workflow. Currently it exists as an isolated skill with zero usage. This feature adds automatic solution capture in /fix and /build, plus reverse lookup of existing solutions when investigating problems.

## User Stories

- As a developer using /fix, I want existing solutions searched before investigation so that I don't re-investigate known issues

- As a developer using /fix, I want solutions auto-captured after fixing bugs so that knowledge compounds without manual intervention

- As a developer using /build, I want solutions auto-captured when deviation fixes occur so that unexpected problems get documented automatically

## Requirements

### Functional

- [ ] /fix Step 2 searches planning/solutions/ for matching problems before git history search
- [ ] /fix auto-invokes /compound after non-trivial fixes (no user prompt)
- [ ] /build auto-invokes /compound when deviation rules 1-3 fire (no user prompt)
- [ ] /compound produces valid solution documents in planning/solutions/

### Non-Functional

- [ ] Auto-capture adds minimal overhead to /fix and /build execution time
- [ ] Solutions can be reviewed and deleted by user at any time (normal file management)
- [ ] /compound skill internals unchanged (3-agent extraction pattern preserved)

## Constraints

- Must not break existing /fix or /build workflows
- /compound remains a standalone skill (can also be invoked independently)
- Solutions stored in planning/solutions/ (per memory-boundaries.md)
- No changes to /compound skill structure or categories
- No changes to memory-boundaries.md (already accurate)

## Success Criteria

- [ ] /fix searches existing solutions when investigating a problem
- [ ] /fix auto-captures solutions after non-trivial fixes
- [ ] /build auto-captures solutions after deviation fixes
- [ ] At least 1 solution documented end-to-end to verify the flow
