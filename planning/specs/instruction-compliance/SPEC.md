# Instruction Compliance Fix Specification

## Goal

Improve Claude's compliance with user-defined instructions by reducing instruction volume, adding enforcement mechanisms, and improving instruction design. Six documented incidents show a systemic pattern of rules being loaded but not followed.

## User Stories

- As a user, I want my rules files to contain only critical overrides so that Claude pays attention to them instead of drowning in noise
- As a user, I want build workflow phases loaded on demand so that only relevant instructions compete for attention
- As a user, I want hooks to enforce critical workflow steps so that build completion steps are never silently skipped

## Requirements

### Functional

- [ ] Rules files pruned: remove instructions that duplicate Claude's default behavior or overlap with CLAUDE.md
- [ ] build.md split into phase files, each loaded only when relevant
- [ ] Build SKILL.md routes to correct phase based on feature PROGRESS.md stage
- [ ] Critical rules use prescriptive language (MUST/NEVER) with rationalizations tables
- [ ] Build completion guard hook prevents skipping steps 8-13
- [ ] All existing workflows (/start, /plan, /build) continue to function

### Non-Functional

- [ ] Total always-loaded rules volume reduced by ≥30% (from 628 lines)
- [ ] No individual phase file exceeds 400 lines
- [ ] Hook has zero false positives on non-build contexts

## Constraints

- Changes only affect markdown instruction files and hook configuration (no code changes)
- Must work within Claude Code's skill loading mechanism (@ references expand eagerly)
- Hook must be shell-based (Claude Code hooks requirement)
- Cannot test instruction compliance empirically within a single session (verification is structural)

## Success Criteria

- [ ] Rules files total ≤440 lines (30% reduction from 628)
- [ ] build.md replaced by 3 phase files, each ≤400 lines
- [ ] Build SKILL.md uses Read tool routing instead of @ expansion
- [ ] ≥1 enforcement hook installed and configured
- [ ] Rationalizations tables added for subagent delegation and build completion
- [ ] /start, /plan, /build workflows produce identical behavior on happy path
