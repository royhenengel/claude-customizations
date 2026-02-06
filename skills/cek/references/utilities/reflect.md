# Reflect

Self-refinement framework for iterative improvement with complexity triage and verification.

## Overview

Reflect on previous response and output using structured assessment, fact-checking, and iterative improvement.

## Usage

`/reflect [focus area or confidence threshold]`

Examples:
- `/reflect`
- `/reflect security`
- `/reflect deep reflect if less than 90% confidence`

## Task Complexity Triage

### Quick Path (5-second check)

Simple tasks: single file edits, documentation, simple queries
→ Skip to Final Verification

### Standard Path (Full reflection)

Tasks with: multiple files, new features, architecture decisions
→ Follow complete framework, require confidence >70%

### Deep Reflection Path

Critical tasks: core system changes, security code, performance-critical
→ Follow framework, require confidence >90%

## Reflection Protocol

### Step 1: Initial Assessment

**Completeness**:
- [ ] Fully addresses user's request?
- [ ] All explicit requirements covered?
- [ ] Implicit requirements addressed?

**Quality**:
- [ ] Appropriate complexity?
- [ ] Could be simplified?
- [ ] Obvious improvements?

**Correctness**:
- [ ] Logical correctness verified?
- [ ] Edge cases considered?
- [ ] Unintended side effects?

**Fact-Checking Required**:
- [ ] Performance claims? (needs verification)
- [ ] Technical facts? (needs source)
- [ ] Best practices? (needs validation)
- [ ] Security assertions? (needs careful review)

### Step 2: Decision Point

**REFINEMENT NEEDED?** [YES/NO]

If YES → Step 3
If NO → Final Verification

### Step 3: Refinement Planning

1. **Identify Issues**: List specific problems
2. **Propose Solutions**: For each issue
3. **Priority Order**:
   - Critical fixes first
   - Performance second
   - Style/readability last

## Code-Specific Criteria

### Library-First Check

**BEFORE custom code:**

1. Search npm/PyPI/Maven for existing solutions
2. Consider existing services (Auth0, SendGrid, etc.)
3. Decision framework:
   ```
   IF common utility → Use library
   ELSE IF complex domain → Check specialized libraries
   ELSE IF infrastructure → Look for managed services
   ELSE → Consider custom
   ```

4. Custom code justified when:
   - Unique business logic
   - Performance-critical with special requirements
   - External dependencies would be overkill
   - Security-sensitive requiring full control

### Architecture and Design

- [ ] Naming follows domain language?
- [ ] Domain separated from infrastructure?
- [ ] Business logic independent of frameworks?
- [ ] Use cases clearly defined?

**Naming Check**:
- Avoid: `utils`, `helpers`, `common`
- Use: `OrderCalculator`, `UserAuthenticator`

### Code Quality

- [ ] Can complex logic be simplified?
- [ ] Redundant operations?
- [ ] Performance bottlenecks?
- [ ] Algorithmic complexity improvable?
- [ ] All errors properly handled?

### Testing

- [ ] All critical paths tested?
- [ ] Edge cases: boundaries, null, large values, concurrency?
- [ ] Tests independent and isolated?
- [ ] Follow AAA pattern?

## Fact-Checking

### Claims Requiring Verification

**Performance**: "X% faster" → needs benchmarking
**Technical**: "API supports..." → check official docs
**Security**: "Secure against..." → needs analysis
**Best Practices**: "It's best practice..." → cite source

### Red Flags

- Absolute statements ("always", "never")
- Superlatives ("best", "fastest")
- Specific numbers without context
- Claims about third-party tools

## Iterative Refinement

### Chain of Verification (CoV)

1. Generate → 2. Verify → 3. Question → 4. Re-answer

### Tree of Thoughts (ToT)

For complex problems:

**Branch 1**: Current approach
- Pros, Cons

**Branch 2**: Alternative
- Pros, Cons

**Decision based on**: Simplicity, Maintainability, Performance, Extensibility

## Refinement Triggers

Automatically trigger if:

**Complexity**: Cyclomatic >10, Nesting >3, Function >50 lines

**Code Smells**: Duplicate code, Long parameters (>4), Magic numbers, Generic utility folders

**Missing**: Error handling, Input validation, Documentation, Tests, Library search

## Final Verification

### Checklist

- [ ] Considered alternative approach?
- [ ] Verified assumptions?
- [ ] Simplest correct solution?
- [ ] Another developer would understand?
- [ ] Anticipated future requirements?
- [ ] All claims verified?
- [ ] Searched for libraries before custom code?
- [ ] Architecture aligned with Clean Architecture/DDD?
- [ ] Names domain-specific?

### Confidence Assessment

- High (>90%): Robust and well-tested
- Medium (70-90%): Works but could improve
- Low (<70%): Significant improvements needed

If confidence insufficient per triage → iterate again.

## Metrics

Track:
- Iteration count
- Complexity reduction
- Bug prevention
- Performance gain
- Readability improvement

## Notes

- Goal is continuous improvement through structured reflection
- Each iteration brings solution closer to optimal
- Not perfection on first try, but systematic refinement
