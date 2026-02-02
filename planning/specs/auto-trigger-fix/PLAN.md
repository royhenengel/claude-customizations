# Auto-Trigger /fix Implementation Plan

## Objective

Implement automatic issue detection via two hooks (UserPromptSubmit + PostToolUse) that prompt to run /fix when issues are detected.

## Context

@planning/specs/auto-trigger-fix/SPEC.md
@planning/specs/auto-trigger-fix/RESEARCH.md
@commands/fix.md

## Task Summary

| # | Task | Type | Dependencies | Blocking |
|---|------|------|--------------|----------|
| 1 | Create detection script | auto | - | - |
| 2 | Create UserPromptSubmit hook | auto | Task 1 | - |
| 3 | Create PostToolUse hook | auto | Task 1 | - |
| 4 | Wire hooks into hooks.json | auto | Tasks 2, 3 | - |
| 5 | Test with issue language | checkpoint:human-verify | Task 4 | yes |
| 6 | Test with tool errors | checkpoint:human-verify | Task 5 | yes |
| 7 | Test exclusions | checkpoint:human-verify | Task 6 | yes |

## Tasks

### Task 1: Create detection script

**Type**: auto
**Files**: `hooks/scripts/detect-issue.js`
**Dependencies**: None

**Context**: Shared detection logic for both hooks. Analyzes input text for issue patterns and returns detection result.

**Action**:
- Create `hooks/scripts/` directory if needed
- Implement detection function with:
  - Trigger patterns (error keywords, problem phrases, fix requests, symptoms)
  - Exclusion patterns (conceptual, future tense, questions about)
  - Build detection (check STATE.md for `Stage: building`)
- Export functions for both user message and tool output analysis
- Use case-insensitive matching
- Return object: `{ detected: boolean, reason: string, source: string }`

**Verify**: Script loads without errors
**Done**: Detection script exists with pattern matching logic

---

### Task 2: Create UserPromptSubmit hook configuration

**Type**: auto
**Files**: `hooks/issue-detector-user.json`
**Dependencies**: Task 1

**Context**: Hook that fires on every user message to detect issue language.

**Action**:
- Create hook configuration with:
  - Event: `UserPromptSubmit`
  - Type: `command` (runs detect-issue.js)
  - Passes user message to script
- Script returns prompt injection if issue detected
- Prompt format:
  ```
  Issue detected in user message.

  This looks like an issue. Run /fix process?

  If user confirms, invoke the /fix skill with context:
  - Original message: "{message}"
  - Detection source: UserPromptSubmit
  ```

**Verify**: Hook JSON is valid
**Done**: UserPromptSubmit hook configuration exists

---

### Task 3: Create PostToolUse hook configuration

**Type**: auto
**Files**: `hooks/issue-detector-tool.json`
**Dependencies**: Task 1

**Context**: Hook that fires after tool execution to detect errors.

**Action**:
- Create hook configuration with:
  - Event: `PostToolUse`
  - Matcher: `Bash` (focus on command execution errors)
  - Type: `command` (runs detect-issue.js with tool output)
- Check for non-zero exit codes and error patterns
- Script returns prompt injection if error detected
- Prompt format:
  ```
  Error detected in tool output.

  This looks like an issue. Run /fix process?

  If user confirms, invoke the /fix skill with context:
  - Tool: {tool_name}
  - Error output: {snippet}
  - Detection source: PostToolUse
  ```

**Verify**: Hook JSON is valid
**Done**: PostToolUse hook configuration exists

---

### Task 4: Wire hooks into hooks.json

**Type**: auto
**Files**: `.claude/hooks.json`
**Dependencies**: Tasks 2, 3

**Context**: Register the new hooks in the main hooks configuration.

**Action**:
- Read existing `.claude/hooks.json`
- Add UserPromptSubmit hook entry
- Add PostToolUse hook entry (merge with existing if present)
- Preserve existing hooks (don't overwrite)
- Use relative paths to hook configurations

**Verify**: `cat .claude/hooks.json` shows new hooks
**Done**: Both hooks registered in hooks.json

---

### Task 5: Test with issue language

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 4

**Context**: Verify detection works for clear issue language.

**Action**:
1. Send message: "This function is broken"
2. Verify prompt appears asking to run /fix
3. Decline the prompt
4. Verify normal flow continues

**Verify**: Manual verification
**Done**: Human confirms detection and prompt work correctly

---

### Task 6: Test with tool errors

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 5

**Context**: Verify PostToolUse hook detects errors.

**Action**:
1. Run a command that fails: `ls /nonexistent`
2. Verify prompt appears asking to run /fix
3. Accept the prompt
4. Verify /fix workflow starts

**Verify**: Manual verification
**Done**: Human confirms error detection and /fix handoff work

---

### Task 7: Test exclusions

**Type**: checkpoint:human-verify
**Blocking**: yes
**Dependencies**: Task 6

**Context**: Verify exclusion patterns prevent false positives.

**Action**:
1. Send: "What causes memory leaks?" (conceptual)
2. Verify NO prompt appears
3. Send: "This might break later" (future tense)
4. Verify NO prompt appears

**Verify**: Manual verification
**Done**: Human confirms exclusions work correctly

## Verification

- [ ] UserPromptSubmit hook triggers on issue language
- [ ] PostToolUse hook triggers on tool errors
- [ ] Exclusion patterns prevent false positives
- [ ] /fix process starts with context when confirmed
- [ ] No interruption during active /build

## Success Criteria

- Detects obvious issues with clear language patterns
- Rarely triggers on non-issue discussions
- When confirmed, /fix process starts with full context preserved
