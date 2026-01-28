# Everything Claude Code Migration Specification

## Goal

Integrate three features from affaan-m/everything-claude-code into claude-customizations:
1. Session Compaction Hooks - preserve context on unexpected compaction
2. Rules System - add security/coding standards as always-on context
3. Continuous Learning v2 - observe patterns and evolve instincts

## User Stories

- As a user, I want my session state preserved when context compacts so that I don't lose work
- As a user, I want security and coding standards enforced automatically so that I produce quality code
- As a user, I want my patterns observed and learned so that Claude adapts to my preferences over time

## Requirements

### Functional

#### Phase 1: Session Compaction Hooks
- [ ] PreCompact hook writes to planning/COMPACTION-LOG.md on compaction events
- [ ] SessionEnd hook creates lightweight HANDOFF.md if /stop wasn't called
- [ ] Both hooks integrate with existing planning/ directory structure
- [ ] Hooks are Node.js for cross-platform compatibility

#### Phase 2: Rules System
- [ ] Create skills/my-workflow/rules/ directory
- [ ] Add security-checklist.md (8 verification points)
- [ ] Add coding-standards.md (immutability, validation, file size limits)
- [ ] Add model-selection.md (Haiku/Sonnet/Opus guidance)
- [ ] Wire rules reference into SKILL.md
- [ ] Security check runs before commit in /build workflow

#### Phase 3: Continuous Learning v2
- [ ] Create ~/.claude/homunculus/ directory structure
- [ ] Port observe.sh hook for PreToolUse/PostToolUse observation
- [ ] Add observation hooks to hooks configuration
- [ ] Port instinct-cli.py for managing instincts
- [ ] Create /instinct-status, /instinct-export, /instinct-import, /evolve commands
- [ ] Bootstrap initial instincts from AI Chat Prefs

### Non-Functional

- [ ] Hooks must not block session startup/shutdown (async, always exit 0)
- [ ] Observation logging must cap at 10MB with rotation
- [ ] Background observer is optional (disabled by default to avoid API cost)
- [ ] All scripts cross-platform (Node.js or Python, not bash)

## Constraints

- Integrate with existing planning/ structure, don't create parallel systems
- Rules complement deviation rules, don't replace them
- Instincts sync with (not replace) AI Chat Prefs
- No breaking changes to existing my-workflow commands

## Success Criteria

- [ ] Context compaction triggers automatic state preservation
- [ ] Security checklist runs on every /build commit
- [ ] At least 5 instincts bootstrapped from existing preferences
- [ ] /instinct-status shows learned patterns with confidence scores
- [ ] No regressions in existing workflow commands

## Open Questions

None - requirements clear from source analysis.
