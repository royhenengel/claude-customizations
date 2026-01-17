# {Feature Name} Implementation Plan

## Objective

{What and why - copied from spec}

## Context

@planning/specs/{feature}/spec.md
@planning/specs/{feature}/research.md
{@other relevant files}

## Task Summary

| # | Task | Type | Blocking |
|---|------|------|----------|
| 1 | {name} | auto | - |
| 2 | {name} | checkpoint:human-verify | yes |
| 3 | {name} | checkpoint:decision | yes |

## Tasks

### Task 1: {Description}

**Type**: auto
**Files**: {files to touch}
**Action**: {What to do}
**Verify**: {How to verify it worked}
**Done**: {Completion criteria}

---

### Task 2: {Description}

**Type**: checkpoint:human-verify
**Blocking**: yes
**Files**: {files to touch}
**Action**: {What to do}
**Verify**: {Manual verification steps for human}
**Done**: {Human confirms completion}

---

### Task 3: {Description}

**Type**: checkpoint:decision
**Blocking**: yes
**Question**: {Decision that needs to be made}
**Options**:

| Option | Pros | Cons |
|--------|------|------|
| A: {name} | {pros} | {cons} |
| B: {name} | {pros} | {cons} |

**Default**: {recommended option and why}
**Action**: {What to do after decision}
**Done**: {Decision recorded, action taken}

---

### Task 4: {Description}

**Type**: checkpoint:human-action
**Blocking**: yes
**Action**: {What the human needs to do}
**Instructions**: {Step-by-step for the human}
**Done**: {Human confirms action complete}

## Verification

- [ ] {Overall verification 1}
- [ ] {Overall verification 2}

## Success Criteria

{Measurable outcomes from spec}

---

## Task Type Reference

| Type | Description | Blocking |
|------|-------------|----------|
| `auto` | Claude executes autonomously | No |
| `checkpoint:human-verify` | Human reviews/approves output | Configurable |
| `checkpoint:decision` | Human chooses from options | Configurable |
| `checkpoint:human-action` | Human performs action | Always |
