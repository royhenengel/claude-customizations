# Fix Tests

Systematically fix all failing tests after business logic changes or refactoring.

## Overview

Orchestrate automated fixing of failing tests using specialized agents when business logic changes cause test failures.

## Usage

`/fix-tests [tests or modules to focus on]`

## Variables

- FOCUS: Specific tests or modules (default: all tests)

## Constraints

- **Focus on fixing tests** - Avoid changing business logic unless absolutely necessary
- **Preserve test intent** - Ensure tests still validate expected behavior
- **Complexity analysis**:
  - 2+ changed files or complex logic: **Orchestrate agents only**
  - Single simple file: Can write tests yourself

## Workflow

### Preparation

1. **Read sadd skill** if available for agent management best practices

2. **Discover test infrastructure**
   - Read README.md and package.json
   - Identify test and coverage commands
   - Understand project structure and conventions

3. **Run all tests** to establish baseline

4. **Identify failing test files**
   - Parse test output
   - Group by file for parallel execution

### Analysis

5. **Verify single test execution**
   - Choose any test file
   - Launch Haiku agent to find command for running single file
   - Iterate until reliable individual test execution

### Test Fixing

6. **Launch developer agents** (parallel)
   - One agent per failing test file
   - Provide each with:
     - **Context**: Why test needs fixing
     - **Target**: Specific file to fix
     - **Guidance**: Read TDD skill for best practices
     - **Resources**: README and documentation
     - **Command**: How to run this specific test
     - **Goal**: Iterate until test passes
     - **Constraint**: Fix test, not business logic

7. **Verify all fixes**
   - Run full test suite
   - Verify all pass

8. **Iterate if needed**
   - If failures remain: Return to step 5
   - Launch agents only for remaining failures
   - Continue until 100% pass rate

## Agent Instructions Template

```
The business logic has changed and test file {FILE_PATH} is now failing.

Your task:
1. Read the test file and understand what it's testing
2. Read TDD skill (if available) for best practices
3. Read README.md for project context
4. Run the test: {TEST_COMMAND}
5. Analyze the failure - is it:
   - Test expectations outdated? → Fix test assertions
   - Test setup broken? → Fix test setup/mocks
   - Business logic bug? → Fix logic (rare case)
6. Fix the test and verify it passes
7. Iterate until test passes
```

## Success Criteria

- All tests pass
- Test coverage maintained
- Test intent preserved
- Business logic unchanged (unless bugs found)
