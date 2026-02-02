# Auto-Trigger /fix Specification

## Goal

Automatically detect when the user describes an issue or when Claude encounters errors, and offer to run the /fix workflow. Reduces friction by eliminating the need to explicitly invoke /fix.

## User Stories

- As a developer, I want issues to be detected automatically so that I don't forget to use the /fix workflow
- As a developer, I want a smoother transition from describing a problem to fixing it
- As a developer, I want the explicit /fix invocation to not break my flow

## Requirements

### Functional

- [ ] Detect issue-related language in user messages (bug, error, broken, failing, crash, etc.)
- [ ] Detect errors in tool output (non-zero exit codes, stack traces, build failures)
- [ ] Prompt user for confirmation before running /fix
- [ ] Skip detection during active /build workflows
- [ ] Skip detection for conceptual discussions about bugs
- [ ] Pass original context to /fix when invoked

### Non-Functional

- [ ] Minimal latency impact on normal messages
- [ ] Low false positive rate (don't trigger on discussions)

## Constraints

- Always confirm before running /fix (confidence threshold is future improvement)
- Must not interrupt active /build workflows
- Must distinguish between "fix this bug" vs "what is a bug"

## Success Criteria

- [ ] Detects obvious issues with clear language patterns
- [ ] Rarely triggers on non-issue discussions (low false positives)
- [ ] When confirmed, /fix process starts with full context preserved
