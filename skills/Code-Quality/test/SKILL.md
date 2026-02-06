---
name: test
description: Run or create tests with coverage analysis
arguments:
  - name: action
    description: "Action to perform: run, create, coverage, watch (default: run)"
    required: false
---

Run tests, create new tests, or analyze coverage.

## Actions

### run (default)

Run all tests or specific tests:

```bash
# Detect test runner
if [ -f "vitest.config.ts" ] || [ -f "vitest.config.js" ]; then
  npx vitest run
elif [ -f "jest.config.js" ] || [ -f "jest.config.ts" ]; then
  npx jest
elif grep -q "\"test\":" package.json 2>/dev/null; then
  npm test
else
  echo "No test runner detected"
fi
```

**Output:**
```
Running tests...

✅ 42 passed
❌ 2 failed
⏭️ 3 skipped

Failed tests:
1. src/utils/format.test.ts > formatDate > handles invalid input
   Expected: null
   Received: undefined

2. src/hooks/useAuth.test.ts > useAuth > refreshes token on expiry
   Timeout: test exceeded 5000ms

Run /debug to investigate failures
```

### create

Create tests for specified file or function:

```bash
# If target specified
cat [target file]
# Analyze structure and create tests
```

**Test creation principles:**

1. **Test behavior, not implementation**
2. **One assertion per test** (when practical)
3. **Descriptive test names**: "should [do X] when [condition Y]"
4. **AAA pattern**: Arrange, Act, Assert
5. **Cover edge cases**: null, empty, boundary values

**Template:**
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { functionName } from './module';

describe('functionName', () => {
  describe('when given valid input', () => {
    it('should return expected result', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toBe('expected');
    });
  });

  describe('when given invalid input', () => {
    it('should throw an error', () => {
      expect(() => functionName(null)).toThrow('Invalid input');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(functionName('')).toBe('');
    });
  });
});
```

### coverage

Run tests with coverage analysis:

```bash
npx vitest run --coverage 2>/dev/null || npx jest --coverage
```

**Output:**
```
Coverage Report:

File                    | Lines | Branches | Functions
------------------------|-------|----------|----------
src/utils/format.ts     | 95%   | 87%      | 100%
src/hooks/useAuth.ts    | 72%   | 60%      | 80%
src/components/Button   | 100%  | 100%     | 100%
------------------------|-------|----------|----------
Overall                 | 85%   | 78%      | 90%

⚠️ Low coverage files:
- src/hooks/useAuth.ts (72% lines, 60% branches)
  Missing: lines 45-52, 78-85

Suggest: Run /test create src/hooks/useAuth.ts
```

### watch

Start tests in watch mode:

```bash
npx vitest 2>/dev/null || npx jest --watch
```

## Test Patterns

### Unit Tests
- Test single functions/modules in isolation
- Mock external dependencies
- Fast execution

### Integration Tests
- Test multiple modules together
- Minimal mocking
- Test real interactions

### Component Tests
- Test UI components
- Use testing-library patterns
- Test user interactions

## Mocking Guide

```typescript
// Mock module
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));

// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');
mockFn.mockRejectedValue(new Error('fail'));

// Spy on method
const spy = vi.spyOn(object, 'method');
expect(spy).toHaveBeenCalledWith('arg');

// Mock timer
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

## Common Issues

### Async Tests
```typescript
// ❌ Bad - doesn't wait
it('fetches data', () => {
  fetchData();
  expect(result).toBeDefined();
});

// ✅ Good - waits for promise
it('fetches data', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

### Cleanup
```typescript
// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});

// Cleanup subscriptions/timers
afterEach(() => {
  cleanup();
});
```

### Flaky Tests
- Avoid `setTimeout` in tests
- Don't depend on execution order
- Use `waitFor` for async UI updates
- Mock external services

## Output After Action

```
Test Summary:
- Action: [run/create/coverage/watch]
- Result: [pass/fail/report]
- Duration: [time]

[Relevant output]

Next steps:
- [Suggested action based on results]
```
