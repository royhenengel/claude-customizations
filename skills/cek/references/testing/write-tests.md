# Write Tests

Systematically add test coverage for local code changes using specialized review and development agents.

## Overview

Orchestrate automated test creation for local changes using coverage analysis and specialized agents. Covers uncommitted changes or latest commit if everything is committed.

## Usage

`/write-tests [tests or modules to focus on]`

## Variables

- FOCUS: Specific tests or modules (default: all changes in git diff)

## Constraints

- **Focus on critical business logic** - Not every line needs 100% coverage
- **Preserve existing tests** - Only add new tests
- **Complexity analysis**:
  - 2+ changed files or complex logic: **Orchestrate agents only**
  - Single simple file: Can write tests yourself

## Workflow

### Preparation

1. **Read sadd skill** if available for agent management

2. **Discover test infrastructure**
   - Read README.md and package.json
   - Identify test and coverage commands
   - Understand structure and conventions

3. **Run all tests** to establish baseline

### Analysis (Parallel Haiku Agents)

4. **Verify single test execution**
   - Launch Haiku to find command for running single test file
   - Iterate until reliable

5. **Analyze local changes**
   - Run `git status -u` for changed files
   - If no uncommitted changes: `git show --name-status` for latest commit
   - Filter out non-code files
   - Launch Haiku per changed file for complexity analysis
   - Extract files with logic changes

### Test Writing

#### Simple Single File Flow

If single simple file, write tests yourself:

1. Read TDD skill for best practices
2. Read target file and understand logic
3. Review existing test patterns
4. Analyze which test cases needed
5. Create comprehensive tests
6. Run and iterate until passing

Ensure tests are:
- Clear and maintainable
- Follow project conventions
- Test behavior, not implementation
- Cover edge cases and error paths

#### Multiple Files or Complex Flow

6. **Launch coverage-reviewer agents** (parallel, Sonnet/Opus)
   - One per changed file
   - Provide: git diff, target file, documentation
   - Goal: Identify test cases needed
   - Output: Prioritized list (Critical/Important/Nice-to-have)

7. **Launch developer agents** (parallel, Sonnet/Opus)
   - One per file needing tests
   - Provide: coverage report, target file, test cases, TDD skill, test command
   - Goal: Create comprehensive tests

8. **Verify coverage** (iteration)
   - Launch coverage-reviewer again per file
   - Confirm all critical logic covered
   - Output: Pass or list of gaps

9. **Iterate if needed**
   - If gaps remain: Return to step 5
   - Launch developers only for files with gaps
   - Continue until all covered

10. **Final verification**
    - Run full test suite
    - Generate coverage report if available
    - Verify no regressions

## Agent Templates

### Coverage Review (Initial)

```
Analyze file {FILE_PATH} for test coverage needs.

Context: This file was modified:
{GIT_DIFF_OUTPUT}

Your task:
1. Read changed file and understand business logic
2. Identify critical code paths:
   - New functions/methods added
   - Modified business logic
   - Edge cases and error handling
   - Integration points
3. Review existing tests to avoid duplication
4. Create prioritized test case list:
   - CRITICAL: Core logic, data mutations
   - IMPORTANT: Error handling, validations
   - NICE_TO_HAVE: Edge cases, performance

Output format:
- List of test cases with descriptions
- Priority level for each
- Suggested test file location
```

### Developer (Test Creation)

```
Create tests for file {FILE_PATH} based on coverage analysis.

Coverage review identified these test cases:
{TEST_CASES_LIST}

Your task:
1. Read TDD skill for best practices
2. Read README.md for context and conventions
3. Read target file {FILE_PATH}
4. Review existing test files for patterns
5. Create comprehensive tests
6. Run tests: {TEST_COMMAND}
7. Iterate until passing
8. Ensure tests are:
   - Clear and maintainable
   - Follow conventions
   - Test behavior, not implementation
   - Cover edge cases and error paths
```

### Coverage Review (Verification)

```
Verify test coverage for file {FILE_PATH}.

Context: Tests were added to cover local changes.

Your task:
1. Read changed file {FILE_PATH}
2. Read new test file(s)
3. Verify critical logic is covered:
   - All new functions have tests
   - All modified logic has tests
   - Edge cases tested
   - Error handling tested
4. Identify coverage gaps
5. Confirm test quality

Output:
- PASS: All critical logic covered
- GAPS: List specific missing test cases
```

## Success Criteria

- All critical business logic in changed files has coverage
- All tests pass (new and existing)
- Test quality verified by coverage-reviewer agents
